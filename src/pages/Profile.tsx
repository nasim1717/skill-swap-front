import { useState } from "react";
import { Camera, Edit, Star, User, Mail, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  profilePicture?: string;
}

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  skill: string;
}

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    bio: "Passionate full-stack developer with 5+ years of experience. Love teaching React and learning new technologies. Always excited to share knowledge and connect with fellow learners!",
    location: "San Francisco, CA",
    joinDate: "January 2024",
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [userRating, setUserRating] = useState(0);

  const offeredSkills = ["React", "JavaScript", "Node.js", "TypeScript", "Python"];
  const wantedSkills = ["Machine Learning", "DevOps", "AWS", "Docker"];

  const reviews: Review[] = [
    {
      id: "1",
      reviewerName: "Sarah Chen",
      rating: 5,
      comment: "Excellent React teacher! Very patient and explains concepts clearly. Highly recommend!",
      date: "2 weeks ago",
      skill: "React",
    },
    {
      id: "2", 
      reviewerName: "Mike Johnson",
      rating: 5,
      comment: "Great JavaScript mentor. Helped me understand complex concepts with practical examples.",
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

  const handleEditProfile = () => {
    setEditedProfile(profile);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditModalOpen(false);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon-sm"
                className="absolute -bottom-2 -right-2 rounded-full shadow-md"
              >
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
                <Button onClick={handleEditProfile} className="flex items-center space-x-2 mt-4 sm:mt-0">
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
              <CardDescription>
                Skills I can teach to others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {offeredSkills.map((skill, index) => (
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
              <CardDescription>
                Skills I'm looking to learn from others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {wantedSkills.map((skill, index) => (
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
        <div>
          <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Rate this User</span>
              </CardTitle>
              <CardDescription>
                Share your experience learning from John
              </CardDescription>
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
      </div>

      {/* Reviews Section */}
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Reviews & Testimonials</CardTitle>
          <CardDescription>
            What others say about learning from John
          </CardDescription>
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
                                i < review.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
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

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editedProfile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={editedProfile.location}
                onChange={(e) => handleProfileChange("location", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={editedProfile.bio}
                onChange={(e) => handleProfileChange("bio", e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;