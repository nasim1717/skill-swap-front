import { useState } from "react";
import { Send, Search, MessageSquare, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false);

  const conversations: Conversation[] = [
    {
      id: "1",
      userName: "Sarah Chen",
      lastMessage: "Thanks for the React lesson! When can we schedule the next one?",
      timestamp: "2:30 PM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      userName: "Mike Johnson",
      lastMessage: "The Python code you shared really helped me understand decorators.",
      timestamp: "11:45 AM",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      userName: "Emma Davis",
      lastMessage: "Can you help me with the Node.js project this weekend?",
      timestamp: "Yesterday",
      unreadCount: 1,
      isOnline: true,
    },
  ];

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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

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

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations Sidebar */}
      <div className={cn(
        "w-full md:w-80 border-r border-border bg-background-subtle",
        isMobileConversationOpen ? "hidden md:block" : "block"
      )}>
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation(conversation.id);
                setIsMobileConversationOpen(true);
              }}
              className={cn(
                "p-4 border-b border-border cursor-pointer transition-all duration-smooth hover:bg-card-hover",
                selectedConversation === conversation.id && "bg-card border-r-2 border-r-primary"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(conversation.userName)}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium truncate">{conversation.userName}</p>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                
                {conversation.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{conversation.unreadCount}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobileConversationOpen ? "hidden md:flex" : "flex"
      )}>
        {selectedConversationData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-background-subtle flex items-center justify-between">
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.senderId === "me" ? "justify-end" : "justify-start"
                  )}
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
                    <p className={cn(
                      "text-xs mt-1",
                      message.senderId === "me" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground/70"
                    )}>
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
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="icon"
                >
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
    </div>
  );
};

export default Messages;