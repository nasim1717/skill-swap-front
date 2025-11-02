import { Input } from "@/components/ui/input";
import { getInitials } from "@/helper/helper";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, MessageSquare, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
export default function ConversationSidebar({
  isMobileConversationOpen,
  setIsMobileConversationOpen,
  selectedConversation,
  setSelectedConversation,
  conversations,
}) {
  const filterTab = "pending";
  return (
    <div
      className={cn(
        "w-full md:w-80 border-r border-border bg-background-subtle",
        isMobileConversationOpen ? "hidden md:block" : "block"
      )}
    >
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>

        <Tabs onValueChange={(v) => ""} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search conversations..." className="pl-10" />
        </div>
      </div>

      <div className="overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              {filterTab === "pending"
                ? "No pending connection requests"
                : filterTab === "active"
                ? "No active conversations yet"
                : "No conversations yet"}
            </p>
          </div>
        ) : (
          conversations.map((conversation) => (
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
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{conversation.userName}</p>
                      {conversation.connectionStatus === "pending" && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      {conversation.connectionStatus === "accepted" && (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                {conversation.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {conversation.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
