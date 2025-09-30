import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

export default function RatingSection() {
  const [userRating, setUserRating] = useState(0);
  const handleStarClick = (rating: number) => {
    setUserRating(rating);
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
                placeholder="Share your experience learning from John..."
                className="resize-none"
                rows={3}
              />
              <Button size="sm" className="w-full">
                Submit Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
