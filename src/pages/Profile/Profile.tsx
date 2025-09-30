import { useState } from "react";
import { Review, UserProfile } from "@/lib/interface";
import ProfileHeader from "./ProfileHeader";
import SkillSection from "./SkillSection";
import ReviewSection from "./ReviewSection";

const Profile = () => {
  const offeredSkills = ["React", "JavaScript", "Node.js", "TypeScript", "Python"];
  const wantedSkills = ["Machine Learning", "DevOps", "AWS", "Docker"];

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

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="p-6 space-y-6">
      <ProfileHeader averageRating={averageRating} reviews={reviews} />

      <SkillSection offeredSkills={offeredSkills} wantedSkills={wantedSkills} />

      <ReviewSection reviews={reviews} />
    </div>
  );
};

export default Profile;
