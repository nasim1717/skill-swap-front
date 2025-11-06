import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMatches } from "@/services/matchesService";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, MessageSquare, TrendingUp, Users } from "lucide-react";

export default function QuickStates({ offeredSkills, wantedSkills, matches }) {
  const stats = [
    {
      title: "Skills Offered",
      value: offeredSkills ? offeredSkills.split(",").length : 0,
      description: "Active skills you can teach",
      icon: BookOpen,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Skills Learning",
      value: wantedSkills ? wantedSkills.split(",").length : 0,
      description: "Skills you want to learn",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Active Matches",
      value: matches?.length ?? 0,
      description: "Current learning partnerships",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="shadow-md border-0 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-smooth"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={`w-8 h-8 rounded-lg ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center`}
              >
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
