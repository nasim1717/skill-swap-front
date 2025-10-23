import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import RatingSection from "./RatingSection";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useParams } from "react-router-dom";

export default function SkillSection({ offeredSkills, wantedSkills, profileData, profileRefetch }) {
  const { user } = useAuthContext();
  const params = useParams();
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Skills Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Offered Skills */}
        <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <User className="w-5 h-5" />
              <span>Skills I Offer</span>
            </CardTitle>
            <CardDescription>Skills I can teach to others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {offeredSkills.map((skill: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 bg-success/10 text-success border border-success/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wanted Skills */}
        <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <User className="w-5 h-5" />
              <span>Skills I Want to Learn</span>
            </CardTitle>
            <CardDescription>Skills I'm looking to learn from others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {wantedSkills.map((skill: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Section */}
      {user?.id !== params.id && (
        <RatingSection profileData={profileData} profileRefetch={profileRefetch} />
      )}
    </div>
  );
}
