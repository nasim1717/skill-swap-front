import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/helper/helper";
import { Message } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { Check, MessageSquare, MoreVertical, Send, X } from "lucide-react";
import { useState } from "react";

export default function ChatWindow({
  selectedConversation,
  isMobileConversationOpen,
  setIsMobileConversationOpen,
  conversations,
}) {
  const [newMessage, setNewMessage] = useState("");
  const messages: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        senderId: "sarah",
        content: "Hi John! I really enjoyed our React session yesterday.",
        timestamp: "2:25 PM",
        isRead: true,
      },
      {
        id: "2",
        senderId: "me",
        content: "I'm glad you found it helpful! You're making great progress with hooks.",
        timestamp: "2:26 PM",
        isRead: true,
      },
      {
        id: "3",
        senderId: "sarah",
        content: "Thanks for the React lesson! When can we schedule the next one?",
        timestamp: "2:30 PM",
        isRead: false,
      },
    ],
    "2": [
      {
        id: "4",
        senderId: "mike",
        content: "The Python code you shared really helped me understand decorators.",
        timestamp: "11:45 AM",
        isRead: true,
      },
    ],
    "3": [
      {
        id: "5",
        senderId: "emma",
        content: "Can you help me with the Node.js project this weekend?",
        timestamp: "Yesterday",
        isRead: false,
      },
    ],
  };

  const selectedConversationData = conversations.find((c) => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Handle sending message logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div
      className={cn("flex-1 flex flex-col", !isMobileConversationOpen ? "hidden md:flex" : "flex")}
    >
      {selectedConversationData ? (
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
                      {getInitials(selectedConversationData.userName)}
                    </div>
                    {selectedConversationData.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{selectedConversationData.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversationData.isOnline ? "Online" : "Last seen recently"}
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Skills and Status */}
            <div className="flex items-center justify-end">
              {true && (
                <div className="flex gap-2">
                  <Button size="sm" variant="default">
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversationMessages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.senderId === "me" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                    message.senderId === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      message.senderId === "me"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground/70"
                    )}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-background-subtle">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
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
