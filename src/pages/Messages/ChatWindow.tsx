import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/helper/helper";
import { cn } from "@/lib/utils";
import { acceptRequest, declineRequest, getConversationMessages } from "@/services/conversation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, MessageSquare, MoreVertical, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Socket } from "socket.io-client";
import { format } from "date-fns";
import { useAuthContext } from "@/hooks/useAuthContext";

interface ChatWindowProps {
  selectedConversation: any;
  isMobileConversationOpen: boolean;
  setIsMobileConversationOpen: (open: boolean) => void;
  setSelectedConversation: (conv: any) => void;
  socket: Socket | null;
  isConnected: boolean;
}

export default function ChatWindow({
  selectedConversation,
  isMobileConversationOpen,
  setIsMobileConversationOpen,
  setSelectedConversation,
  socket,
  isConnected,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const processedMessageIds = useRef(new Set<string>()); // Track processed messages

  // Fetch messages for selected thread
  const {
    data: messagesData,
    isPending: isLoadingMessages,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages", selectedConversation?.thread_id],
    queryFn: ({ queryKey }) => getConversationMessages(queryKey[1]),
    enabled: !!selectedConversation?.thread_id,
    refetchOnWindowFocus: false,
  });

  // Accept request mutation
  const { mutate: handleAcceptRequest, isPending: isAcceptingRequest } = useMutation({
    mutationFn: acceptRequest,
    onSuccess(data) {
      toast.success("Request accepted");

      // Update local state
      setSelectedConversation((prev: any) => ({
        ...prev,
        status: "ACCEPTED",
        thread_id: data.data.thread.id.toString(),
      }));

      // Invalidate conversations list to refresh
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError(error: any) {
      toast.error(error.message || "Failed to accept request");
    },
  });

  // Decline request mutation
  const { mutate: handleDeclineRequest, isPending: isDecliningRequest } = useMutation({
    mutationFn: declineRequest,
    onSuccess() {
      toast.success("Request declined");
      setSelectedConversation(null);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError(error: any) {
      toast.error(error.message || "Failed to decline request");
    },
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData?.data]);

  // Reset processed IDs when conversation changes
  useEffect(() => {
    processedMessageIds.current.clear();
  }, [selectedConversation?.thread_id]);

  // Mark messages as seen when viewing
  useEffect(() => {
    if (!socket || !isConnected || !messagesData?.data || !selectedConversation?.thread_id) return;

    const unseenMessages = messagesData.data.filter(
      (msg: any) => !msg.seen && msg.receiver_id?.toString() === user?.id?.toString()
    );

    if (unseenMessages.length === 0) return;

    console.log(
      `Marking ${unseenMessages.length} messages as seen in thread ${selectedConversation.thread_id}`
    );

    // Use batch operation for better performance
    socket.emit("mark_messages_seen", { threadId: selectedConversation.thread_id });

    // Immediately update local cache to reflect seen status
    queryClient.setQueryData(["messages", selectedConversation.thread_id], (old: any) => {
      if (!old) return old;
      return {
        ...old,
        data: old.data.map((msg: any) => {
          if (unseenMessages.some((unseen: any) => unseen.id === msg.id)) {
            return { ...msg, seen: true };
          }
          return msg;
        }),
      };
    });

    // Immediately reset unread count in conversations list
    queryClient.setQueriesData({ queryKey: ["conversations"] }, (old: any) => {
      if (!old?.data) return old;
      return {
        ...old,
        data: old.data.map((conv: any) => {
          if (conv.thread_id === selectedConversation.thread_id) {
            console.log(`Resetting unread count for thread ${selectedConversation.thread_id} to 0`);
            return { ...conv, unread_count: 0 };
          }
          return conv;
        }),
      };
    });
  }, [
    messagesData?.data,
    socket,
    isConnected,
    user?.id,
    selectedConversation?.thread_id,
    queryClient,
  ]);

  // Handle typing indicator
  const handleTypingStart = () => {
    if (!socket || !isConnected || !selectedConversation?.thread_id) return;

    socket.emit("typing", {
      threadId: selectedConversation.thread_id,
      isTyping: true,
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        threadId: selectedConversation.thread_id,
        isTyping: false,
      });
    }, 3000);
  };

  // Helper function to add message without duplicates
  const addMessageToCache = (message: any, threadId: string) => {
    const messageId = message.id?.toString() || `temp_${Date.now()}`;

    // Skip if already processed
    if (processedMessageIds.current.has(messageId)) {
      console.log("Skipping duplicate message:", messageId);
      return;
    }

    processedMessageIds.current.add(messageId);

    queryClient.setQueryData(["messages", threadId], (old: any) => {
      if (!old) return old;

      // Check if message already exists in cache
      const exists = old.data?.some((m: any) => {
        const existingId = m.id?.toString();
        return (
          existingId === messageId ||
          (m.message === message.message &&
            m.sender_id?.toString() === message.sender_id?.toString() &&
            Math.abs(new Date(m.created_at).getTime() - new Date(message.created_at).getTime()) <
              1000)
        );
      });

      if (exists) {
        console.log("Message already exists in cache");
        return old;
      }

      return {
        ...old,
        data: [...(old.data || []), message],
      };
    });
  };

  // Send message with optimistic update
  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket || !isConnected) return;
    if (!selectedConversation?.thread_id) {
      toast.error("No active thread");
      return;
    }

    const tempMessage = {
      id: `temp_${Date.now()}`,
      message: newMessage.trim(),
      sender_id: user?.id,
      receiver_id: selectedConversation.user.id,
      thread_id: parseInt(selectedConversation.thread_id),
      created_at: new Date().toISOString(),
      seen: false,
      isOptimistic: true, // Mark as optimistic
    };

    // Optimistically add to cache
    queryClient.setQueryData(["messages", selectedConversation.thread_id], (old: any) => {
      if (!old) return old;
      return {
        ...old,
        data: [...(old.data || []), tempMessage],
      };
    });

    // Emit to server
    socket.emit("send_message", {
      threadId: selectedConversation.thread_id,
      message: newMessage.trim(),
    });

    // Clear typing indicator
    socket.emit("typing", {
      threadId: selectedConversation.thread_id,
      isTyping: false,
    });

    setNewMessage("");

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // Listen to socket events
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Handle message event (from server broadcast)
    const handleMessage = (message: any) => {
      console.log("Received message event:", message);

      // Only process if it's for current thread
      if (message.thread_id?.toString() === selectedConversation?.thread_id) {
        // Remove optimistic message and add real one
        queryClient.setQueryData(["messages", selectedConversation.thread_id], (old: any) => {
          if (!old) return old;

          // Remove optimistic version
          const filtered = old.data.filter((m: any) => !m.isOptimistic);

          // Check if real message already exists
          const exists = filtered.some((m: any) => m.id?.toString() === message.id?.toString());

          if (exists) return old;

          return {
            ...old,
            data: [...filtered, message],
          };
        });

        // Mark as processed
        if (message.id) {
          processedMessageIds.current.add(message.id.toString());
        }
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, isConnected, selectedConversation?.thread_id, queryClient]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return format(date, "h:mm a");
    } else if (diffInHours < 48) {
      return "Yesterday " + format(date, "h:mm a");
    } else {
      return format(date, "MMM d, h:mm a");
    }
  };

  const groupMessagesByDate = (messages: any[]) => {
    const grouped: { [key: string]: any[] } = {};

    messages?.forEach((msg) => {
      const date = format(new Date(msg.created_at), "yyyy-MM-dd");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(msg);
    });

    return grouped;
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")) {
      return "Today";
    } else if (format(date, "yyyy-MM-dd") === format(yesterday, "yyyy-MM-dd")) {
      return "Yesterday";
    } else {
      return format(date, "MMMM d, yyyy");
    }
  };

  const groupedMessages = groupMessagesByDate(messagesData?.data || []);

  return (
    <div
      className={cn("flex-1 flex flex-col", !isMobileConversationOpen ? "hidden md:flex" : "flex")}
    >
      {selectedConversation?.user ? (
        <>
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-background-subtle">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileConversationOpen(false)}
                  className="md:hidden"
                >
                  ←
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedConversation.user.profile_picture ? (
                        <img
                          src={selectedConversation.user.profile_picture}
                          alt={selectedConversation.user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(selectedConversation.user.name)
                      )}
                    </div>
                    {/* Online indicator */}
                    {selectedConversation.is_online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{selectedConversation.user.name}</p>
                    {isTyping ? (
                      <p className="text-xs text-muted-foreground">typing...</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.is_online ? "Online" : "Offline"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Accept/Decline buttons for pending requests */}
            {selectedConversation.status === "PENDING" && (
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => handleAcceptRequest(selectedConversation.requestId)}
                  size="sm"
                  variant="default"
                  disabled={isAcceptingRequest}
                >
                  <Check className="w-4 h-4 mr-1" />
                  {isAcceptingRequest ? "Accepting..." : "Accept"}
                </Button>
                {/* <Button
                  onClick={() => handleDeclineRequest(selectedConversation.requestId)}
                  size="sm"
                  variant="outline"
                  disabled={isDecliningRequest}
                >
                  <X className="w-4 h-4 mr-1" />
                  {isDecliningRequest ? "Declining..." : "Decline"}
                </Button> */}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoadingMessages && selectedConversation?.status !== "PENDING" ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">Loading messages...</p>
                </div>
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Failed to load messages</p>
              </div>
            ) : messagesData?.data?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                </div>
              </div>
            ) : (
              <>
                {Object.entries(groupedMessages).map(([date, messages]) => (
                  <div key={date}>
                    {/* Date divider */}
                    <div className="flex items-center justify-center my-4">
                      <div className="bg-muted px-3 py-1 rounded-full">
                        <span className="text-xs text-muted-foreground">{getDateLabel(date)}</span>
                      </div>
                    </div>

                    {/* Messages for this date */}
                    {messages.map((message: any, idx: number) => {
                      const isOwnMessage = message.sender_id?.toString() === user?.id?.toString();

                      return (
                        <div
                          key={message.id || `msg_${idx}`}
                          className={cn(
                            "flex mb-4",
                            isOwnMessage ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                              isOwnMessage
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground",
                              message.isOptimistic && "opacity-60" // Show optimistic messages as faded
                            )}
                          >
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {message.message}
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                              <p
                                className={cn(
                                  "text-xs",
                                  isOwnMessage
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                )}
                              >
                                {formatMessageTime(message.created_at)}
                              </p>
                              {isOwnMessage && (
                                <span className="text-xs">
                                  {message.isOptimistic ? "⏱️" : message.seen ? "✓✓" : "✓"}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-background-subtle">
            {selectedConversation.status === "ACCEPTED" ? (
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTypingStart();
                  }}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={!isConnected}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !isConnected}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground py-2">
                {selectedConversation.status === "PENDING"
                  ? "Accept the request to start messaging"
                  : "This conversation is not active"}
              </div>
            )}
            {!isConnected && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Disconnected. Trying to reconnect...
              </p>
            )}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
            <p className="text-muted-foreground">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
