import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { reviewUser } from "@/services/profileService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RatingSection({ profileData, profileRefetch }) {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    mutate: handleReviewSubmit,
    isPending,
    error: reviewError,
  } = useMutation<any, AxiosError<any>, any>({
    mutationFn: reviewUser,
    onSuccess: () => {
      toast.success("Review submitted successfully");
      profileRefetch();
      setComment("");
      setUserRating(0);
    },
  });

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleReviewSubmitClick = () => {
    handleReviewSubmit({ rating: userRating, comment, reviewed_user_id: profileData?.data?.id });
  };
  return (
    <div>
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>Rate this User</span>
          </CardTitle>
          <CardDescription>Share your experience learning from John</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="transition-all duration-smooth hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= userRating
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {userRating > 0 && (
            <div className="space-y-3">
              <Textarea
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience learning from John..."
                className="resize-none"
                rows={3}
              />
              {reviewError?.response?.data?.errors?.comment && (
                <p className="text-sm text-red-500">
                  {reviewError?.response?.data?.errors?.comment}
                </p>
              )}
              <Button
                disabled={isPending}
                onClick={handleReviewSubmitClick}
                size="sm"
                className="w-full"
              >
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
