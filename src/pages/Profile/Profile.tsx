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

  const reviews: Review[] = [
    {
      id: "1",
      reviewerName: "Sarah Chen",
      rating: 5,
      comment:
        "Excellent React teacher! Very patient and explains concepts clearly. Highly recommend!",
      date: "2 weeks ago",
      skill: "React",
    },
    {
      id: "2",
      reviewerName: "Mike Johnson",
      rating: 5,
      comment:
        "Great JavaScript mentor. Helped me understand complex concepts with practical examples.",
      date: "1 month ago",
      skill: "JavaScript",
    },
    {
      id: "3",
      reviewerName: "Emma Davis",
      rating: 4,
      comment: "Very knowledgeable about TypeScript. Clear explanations and good teaching style.",
      date: "2 months ago",
      skill: "TypeScript",
    },
  ];

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

      <ReviewSection reviews={reviews} />
    </div>
  );
};

export default Profile;
