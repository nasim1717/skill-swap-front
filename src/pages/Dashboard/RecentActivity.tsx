import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentActivity() {
  return (
    <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest interactions and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          {
            user: "Sarah Chen",
            action: "wants to learn React from you",
            time: "2 hours ago",
            type: "match",
          },
          {
            user: "Mike Johnson",
            action: "sent you a message about Python tutoring",
            time: "5 hours ago",
            type: "message",
          },
          {
            user: "Emma Davis",
            action: "accepted your request to learn Photography",
            time: "1 day ago",
            type: "accepted",
          },
        ].map((activity, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-all duration-smooth"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
