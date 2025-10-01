import { useState } from "react";
import { Conversation, Message } from "@/lib/interface";
import ConversationSidebar from "./ConversationSidebar";
import ChatWindow from "./ChatWindow";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
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

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations Sidebar */}
      <ConversationSidebar
        isMobileConversationOpen={isMobileConversationOpen}
        setIsMobileConversationOpen={setIsMobileConversationOpen}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        conversations={conversations}
      />
      {/* Chat Window */}
      <ChatWindow
        conversations={conversations}
        selectedConversation={selectedConversation}
        isMobileConversationOpen={isMobileConversationOpen}
        setIsMobileConversationOpen={setIsMobileConversationOpen}
      />
    </div>
  );
};

export default Messages;
