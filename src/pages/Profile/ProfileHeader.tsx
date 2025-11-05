import { Card, CardContent } from "@/components/ui/card";
import { Camera, Edit, Star, Mail, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/interface";
import { useState } from "react";
import ProfileEditModal from "./ProfileEditModal";
import { getInitials } from "@/helper/helper";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/profileService";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuthContext } from "@/hooks/useAuthContext";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileHeader({
  profileData,
  profileRefetch,
}: {
  profileData: Record<string, any>;
  profileRefetch: () => void;
}) {
  const { user } = useAuthContext();
  const params = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  const {
    mutate: handleUpdateProfile,
    isPending: isUpdateProfileLoading,
    isSuccess: isUpdateProfileSuccess,
    error: updateProfileError,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      profileRefetch();
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEditProfile = () => {
    setEditedProfile(profileData?.data);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = () => {
    handleUpdateProfile(editedProfile);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <ProfileAvatar profileData={profileData} />

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profileData?.data?.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{profileData?.data?.email}</span>
                    </div>
                    {profileData?.data?.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profileData?.data?.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profileData?.data?.created_at}</span>
                    </div>
                  </div>
                </div>
                {params.id === user.id && (
                  <Button
                    onClick={handleEditProfile}
                    className="flex items-center space-x-2 mt-4 sm:mt-0"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Button>
                )}
              </div>

              <p className="text-muted-foreground">{profileData?.data?.bio}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(profileData?.data?.average_rating)
                          ? "text-yellow-500 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {profileData?.data?.average_rating.toFixed(1)} (
                    {profileData?.data?.total_reviews} reviews)
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
        isUpdateProfileLoading={isUpdateProfileLoading}
        updateProfileError={updateProfileError}
      />
    </>
  );
}
