import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/helper/helper";
import { Review } from "@/lib/interface";
import moment from "moment";

export default function ReviewSection({ reviews }) {
  return (
    <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Reviews & Testimonials</CardTitle>
        <CardDescription>What others say about learning from John</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map((review: Review) => (
          <div key={review.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(String(review?.reviewer?.name))}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{String(review?.reviewer?.name)}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {moment(review.created_at).fromNow()}
                  </span>
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
