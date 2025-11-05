// components/Messages.tsx
import { useState, useEffect } from "react";
import ConversationSidebar from "./ConversationSidebar";
import ChatWindow from "./ChatWindow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllConversationsList } from "@/services/conversation";

import { toast } from "sonner";
import { useSocket } from "@/hooks/useChatSocket";

interface SelectedConversation {
  requestId: string;
  user: {
    id: string;
    name: string;
    profile_picture?: string;
  };
  status: string;
  thread_id: string | null;
  is_online?: boolean;
}

const Messages = () => {
  const [status, setStatus] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(
    null
  );
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false);

  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  // Fetch conversations list
  const {
    data: conversationsList,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["conversations", status],
    queryFn: ({ queryKey }) => getAllConversationsList(queryKey[1]),
    refetchInterval: 30000, // Refetch every 30s as backup
  });

  // Socket event listeners
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Handle incoming messages (only for notifications and conversation list updates)
    const handleIncomingMessage = (data: any) => {
      const { threadId, message } = data;

      // Update conversations list with new last message
      queryClient.setQueryData(["conversations", status], (old: any) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.map((conv: any) => {
            if (conv.thread_id === threadId?.toString()) {
              // Only increment unread if not currently viewing this thread
              const shouldIncrementUnread =
                selectedConversation?.thread_id !== threadId?.toString();

              return {
                ...conv,
                last_message: {
                  id: message.id.toString(),
                  message: message.message,
                  sender_id: message.sender_id.toString(),
                  created_at: message.created_at,
                  seen: false,
                  is_own: false,
                },
                unread_count: shouldIncrementUnread
                  ? (conv.unread_count || 0) + 1
                  : conv.unread_count,
              };
            }
            return conv;
          }),
        };
      });

      // Show notification if not on current thread
      if (selectedConversation?.thread_id !== threadId?.toString()) {
        toast.info("New message received");
      }
    };

    // Handle message seen status
    const handleMessageSeen = (data: { messageId: number; threadId?: number }) => {
      const { messageId, threadId } = data;

      // Update messages to mark as seen
      queryClient.setQueriesData({ queryKey: ["messages"] }, (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((msg: any) => (msg.id === messageId ? { ...msg, seen: true } : msg)),
        };
      });

      // Update unread count in conversations list
      ["all", "active", "pending"].forEach((statusType) => {
        queryClient.setQueryData(["conversations", statusType], (old: any) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.map((conv: any) => {
              // Match by thread_id
              if (threadId && conv.thread_id === threadId.toString()) {
                const newUnreadCount = Math.max(0, (conv.unread_count || 0) - 1);
                console.log(
                  `Decreasing unread count for thread ${threadId}: ${conv.unread_count} -> ${newUnreadCount}`
                );
                return { ...conv, unread_count: newUnreadCount };
              }
              return conv;
            }),
          };
        });
      });
    };

    // Handle batch messages seen (all messages in a thread)
    const handleMessagesSeen = (data: { threadId: number; count: number }) => {
      const { threadId } = data;

      console.log(`All messages seen in thread ${threadId}`);

      // Update all messages in that thread to seen
      queryClient.setQueryData(["messages", threadId.toString()], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((msg: any) => ({ ...msg, seen: true })),
        };
      });
    };

    // Handle user online/offline status
    const handleUserStatusChange = (data: { userId: string | number; online: boolean }) => {
      console.log("User status changed:", data);

      // Update selected conversation if it's the same user
      setSelectedConversation((prev: SelectedConversation | null) => {
        if (!prev) return prev;

        const userIdMatch =
          prev.user.id === data.userId.toString() ||
          prev.user.id === String(data.userId) ||
          String(prev.user.id) === String(data.userId);

        if (userIdMatch) {
          return { ...prev, is_online: data.online };
        }
        return prev;
      });

      // Update all status variations to catch the conversation
      ["all", "active", "pending"].forEach((statusType) => {
        queryClient.setQueryData(["conversations", statusType], (old: any) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.map((conv: any) => {
              const userIdMatch =
                conv.user.id === data.userId.toString() ||
                conv.user.id === String(data.userId) ||
                String(conv.user.id) === String(data.userId);

              if (userIdMatch) {
                console.log(`Updating online status for user ${conv.user.id} to ${data.online}`);
                return { ...conv, is_online: data.online };
              }
              return conv;
            }),
          };
        });
      });
    };

    // Handle typing indicator
    const handleTyping = (data: { threadId: number; userId: number; isTyping: boolean }) => {
      // You can implement typing indicator UI based on this
      console.log("Typing status:", data);
    };

    socket.on("incoming_message", handleIncomingMessage);
    socket.on("message_seen", handleMessageSeen);
    socket.on("messages_seen", handleMessagesSeen);
    socket.on("user_status_change", handleUserStatusChange);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("incoming_message", handleIncomingMessage);
      socket.off("message_seen", handleMessageSeen);
      socket.off("messages_seen", handleMessagesSeen);
      socket.off("user_status_change", handleUserStatusChange);
      socket.off("typing", handleTyping);
    };
  }, [
    socket,
    isConnected,
    queryClient,
    status,
    selectedConversation?.thread_id,
    setSelectedConversation,
  ]);

  // Join thread when conversation is selected
  useEffect(() => {
    if (socket && isConnected && selectedConversation?.thread_id) {
      socket.emit("join_thread", { threadId: selectedConversation.thread_id });
    }
  }, [socket, isConnected, selectedConversation?.thread_id]);

  if (isPending) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading conversations</p>
          <p className="text-sm mt-2">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <ConversationSidebar
        isMobileConversationOpen={isMobileConversationOpen}
        setIsMobileConversationOpen={setIsMobileConversationOpen}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        conversationsList={conversationsList}
        status={status}
        setStatus={setStatus}
      />

      <ChatWindow
        setSelectedConversation={setSelectedConversation}
        selectedConversation={selectedConversation}
        isMobileConversationOpen={isMobileConversationOpen}
        setIsMobileConversationOpen={setIsMobileConversationOpen}
        socket={socket}
        isConnected={isConnected}
      />
    </div>
  );
};

export default Messages;
