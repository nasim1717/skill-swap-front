import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { getInitials } from "@/helper/helper";
export default function ReviewSection({ reviews }) {
  return (
    <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Reviews & Testimonials</CardTitle>
        <CardDescription>What others say about learning from John</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(review.reviewerName)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{review.reviewerName}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {review.skill}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
