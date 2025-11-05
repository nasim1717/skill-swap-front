import { Input } from "@/components/ui/input";
import { getInitials } from "@/helper/helper";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, MessageSquare, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import moment from "moment";

interface ConversationSidebarProps {
  isMobileConversationOpen: boolean;
  setIsMobileConversationOpen: (open: boolean) => void;
  selectedConversation: any;
  setSelectedConversation: (conv: any) => void;
  conversationsList: any;
  status: string;
  setStatus: (status: string) => void;
}

export default function ConversationSidebar({
  isMobileConversationOpen,
  setIsMobileConversationOpen,
  selectedConversation,
  setSelectedConversation,
  conversationsList,
  status,
  setStatus,
}: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations based on search
  const filteredConversations =
    conversationsList?.data?.filter((conv: any) =>
      conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const getLastMessageText = (conversation: any) => {
    if (conversation.last_message?.message) {
      const isOwn = conversation.last_message.is_own;
      const prefix = isOwn ? "You: " : "";
      return prefix + conversation.last_message.message;
    }
    return conversation.message || "No messages yet";
  };

  return (
    <div
      className={cn(
        "w-full md:w-80 border-r border-border bg-background-subtle",
        isMobileConversationOpen ? "hidden md:block" : "block"
      )}
    >
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>

        <Tabs value={status} onValueChange={setStatus} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-16rem)]">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              {searchQuery
                ? "No conversations found"
                : status === "pending"
                ? "No pending connection requests"
                : status === "active"
                ? "No active conversations yet"
                : "No conversations yet"}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation: any) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation({
                  requestId: conversation.id,
                  user: conversation.user,
                  status: conversation.status,
                  thread_id: conversation.thread_id,
                  is_online: conversation.is_online,
                });
                setIsMobileConversationOpen(true);
              }}
              className={cn(
                "p-4 border-b border-border cursor-pointer transition-all duration-200 hover:bg-card-hover",
                selectedConversation?.requestId === conversation.id &&
                  "bg-card border-r-2 border-r-primary"
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.user.profile_picture ? (
                      <img
                        src={conversation.user.profile_picture}
                        alt={conversation.user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(conversation.user.name)
                    )}
                  </div>
                  {/* Online indicator - now with better visibility */}
                  {conversation.is_online && (
                    <div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
                      title="Online"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{conversation.user.name}</p>
                      {conversation.status === "PENDING" && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      {conversation.status === "ACCEPTED" && (
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      )}
                    </div>
                    {conversation.last_message?.created_at && (
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {moment(conversation.last_message.created_at).fromNow()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {getLastMessageText(conversation)}
                    </p>

                    {conversation.unread_count > 0 && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white font-medium">
                          {conversation.unread_count > 9 ? "9+" : conversation.unread_count}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
