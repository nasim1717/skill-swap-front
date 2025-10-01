import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/helper/helper";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
export default function ConversationSidebar({
  isMobileConversationOpen,
  setIsMobileConversationOpen,
  selectedConversation,
  setSelectedConversation,
  conversations,
}) {
  return (
    <div
      className={cn(
        "w-full md:w-80 border-r border-border bg-background-subtle",
        isMobileConversationOpen ? "hidden md:block" : "block"
      )}
    >
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search conversations..." className="pl-10" />
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
  );
}
