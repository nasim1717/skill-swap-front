import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/helper/helper";
import { Star } from "lucide-react";

export default function MatchUserCard({ filteredUsers, handleConnect }) {
  const getMatchBadgeColor = (score: number) => {
    if (score >= 90) return "bg-success/10 text-success border-success/20";
    if (score >= 80) return "bg-primary/10 text-primary border-primary/20";
    if (score >= 70) return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-muted text-muted-foreground border-border";
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredUsers.map((user) => (
        <Card
          key={user.id}
          className="shadow-md border-0 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-smooth hover:scale-105"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription className="text-sm">{user.location}</CardDescription>
                </div>
              </div>
              <Badge className={`${getMatchBadgeColor(user.matchScore)} border font-semibold`}>
                {user.matchScore}% match
              </Badge>
            </div>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(user.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">{user.rating}</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-success mb-2">Can teach:</h4>
              <div className="flex flex-wrap gap-1">
                {user.offeredSkills.slice(0, 3).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-success/10 text-success border-success/20"
                  >
                    {skill}
                  </Badge>
                ))}
                {user.offeredSkills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{user.offeredSkills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary mb-2">Wants to learn:</h4>
              <div className="flex flex-wrap gap-1">
                {user.wantedSkills.slice(0, 3).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
                {user.wantedSkills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{user.wantedSkills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <Button onClick={() => handleConnect(user)} className="w-full mt-4" size="sm">
              Connect
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
