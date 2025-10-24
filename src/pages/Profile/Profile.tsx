import { useState } from "react";
import { Review, UserProfile } from "@/lib/interface";
import ProfileHeader from "./ProfileHeader";
import SkillSection from "./SkillSection";
import ReviewSection from "./ReviewSection";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/profileService";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: profileRefetch,
  } = useQuery({
    queryKey: ["profile", params.id],
    queryFn: ({ queryKey }) => getProfile(queryKey[1]),
  });

  if (isProfileLoading) {
    return <div>Loading...</div>;
  } else if (isProfileError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <ProfileHeader profileData={profileData} profileRefetch={profileRefetch} />

      <SkillSection
        profileRefetch={profileRefetch}
        profileData={profileData}
        offeredSkills={profileData?.data?.skills_offered?.split(",") || []}
        wantedSkills={profileData?.data?.skills_wanted?.split(",") || []}
      />

      <ReviewSection reviews={profileData?.data?.reviews || []} />
    </div>
  );
};

export default Profile;
