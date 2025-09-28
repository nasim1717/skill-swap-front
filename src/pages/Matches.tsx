import { useState } from "react";
import { Search, Users, CheckCircle, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  avatar?: string;
  offeredSkills: string[];
  wantedSkills: string[];
  rating: number;
  location: string;
  matchScore: number;
}

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const mockUsers: User[] = [
    {
      id: "1",
      name: "Sarah Chen",
      offeredSkills: ["Python", "Machine Learning", "Data Science"],
      wantedSkills: ["React", "Frontend Development"],
      rating: 4.8,
      location: "San Francisco, CA",
      matchScore: 95,
    },
    {
      id: "2", 
      name: "Mike Johnson",
      offeredSkills: ["Photography", "Photoshop", "Lightroom"],
      wantedSkills: ["Video Editing", "Motion Graphics"],
      rating: 4.6,
      location: "New York, NY",
      matchScore: 78,
    },
    {
      id: "3",
      name: "Emma Davis",
      offeredSkills: ["Node.js", "Backend Development", "MongoDB"],
      wantedSkills: ["DevOps", "AWS"],
      rating: 4.9,
      location: "Austin, TX", 
      matchScore: 85,
    },
    {
      id: "4",
      name: "Alex Kumar",
      offeredSkills: ["UI/UX Design", "Figma", "User Research"],
      wantedSkills: ["Frontend Development", "CSS"],
      rating: 4.7,
      location: "Seattle, WA",
      matchScore: 92,
    },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.offeredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.wantedSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const handleConnect = (user: User) => {
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const confirmConnection = () => {
    if (selectedUser) {
      // Handle connection logic here
      console.log("Connecting with:", selectedUser.name);
      setShowConfirmModal(false);
      setSelectedUser(null);
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary"; 
    if (score >= 70) return "text-amber-600";
    return "text-muted-foreground";
  };

  const getMatchBadgeColor = (score: number) => {
    if (score >= 90) return "bg-success/10 text-success border-success/20";
    if (score >= 80) return "bg-primary/10 text-primary border-primary/20";
    if (score >= 70) return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Find Your Perfect Match</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with learners and teachers who complement your skills
        </p>
      </div>

      {/* Search and Filter Bar */}
      <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, skills, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {filteredUsers.length} potential matches
        </p>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>Sorted by match score</span>
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="shadow-md border-0 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-smooth hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription className="text-sm">{user.location}</CardDescription>
                  </div>
                </div>
                <Badge className={`${getMatchBadgeColor(user.matchScore)} border font-semibold`}>
                  {user.matchScore}% match
                </Badge>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(user.rating)
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {user.rating}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-success mb-2">Can teach:</h4>
                <div className="flex flex-wrap gap-1">
                  {user.offeredSkills.slice(0, 3).map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-success/10 text-success border-success/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {user.offeredSkills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{user.offeredSkills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-primary mb-2">Wants to learn:</h4>
                <div className="flex flex-wrap gap-1">
                  {user.wantedSkills.slice(0, 3).map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary border-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {user.wantedSkills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{user.wantedSkills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                onClick={() => handleConnect(user)}
                className="w-full mt-4"
                size="sm"
              >
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No matches found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span>Confirm Connection</span>
            </DialogTitle>
            <DialogDescription>
              {selectedUser && (
                <>
                  Are you sure you want to connect with <strong>{selectedUser.name}</strong>? 
                  This will send them a connection request and start a conversation.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-3 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(selectedUser.name)}
                </div>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-success">Can teach:</p>
                  <p className="text-muted-foreground">
                    {selectedUser.offeredSkills.slice(0, 2).join(", ")}
                    {selectedUser.offeredSkills.length > 2 && "..."}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-primary">Wants to learn:</p>
                  <p className="text-muted-foreground">
                    {selectedUser.wantedSkills.slice(0, 2).join(", ")}
                    {selectedUser.wantedSkills.length > 2 && "..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmConnection}>
              Send Connection Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Matches;