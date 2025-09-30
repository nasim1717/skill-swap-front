import { Card, CardContent } from "@/components/ui/card";
import { Camera, Edit, Star, Mail, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/interface";
import { useState } from "react";
import ProfileEditModal from "./ProfileEditModal";
import { getInitials } from "@/helper/helper";

export default function ProfileHeader({ averageRating, reviews }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    bio: "Passionate full-stack developer with 5+ years of experience. Love teaching React and learning new technologies. Always excited to share knowledge and connect with fellow learners!",
    location: "San Francisco, CA",
    joinDate: "January 2024",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const handleEditProfile = () => {
    setEditedProfile(profile);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditModalOpen(false);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <Button size="icon-sm" className="absolute -bottom-2 -right-2 rounded-full shadow-md">
                <Camera className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleEditProfile}
                  className="flex items-center space-x-2 mt-4 sm:mt-0"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
              </div>

              <p className="text-muted-foreground">{profile.bio}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating)
                          ? "text-yellow-500 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ProfileEditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        editedProfile={editedProfile}
        handleProfileChange={handleProfileChange}
        handleSaveProfile={handleSaveProfile}
      />
    </>
  );
}
