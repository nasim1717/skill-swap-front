import { useState } from "react";
import { Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/lib/interface";
import MatchesHeader from "./MatchesHeader";
import MatchesFilter from "./MatchesFilter";
import ResultCount from "./ResultCount";
import MatchUserCard from "./MatchUserCard";
import { getInitials } from "@/helper/helper";

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

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.offeredSkills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.wantedSkills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  return (
    <div className="p-6 space-y-6">
      <MatchesHeader />
      <MatchesFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResultCount filteredUsers={filteredUsers} />
      <MatchUserCard filteredUsers={filteredUsers} handleConnect={handleConnect} />
      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No matches found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
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
                  Are you sure you want to connect with <strong>{selectedUser.name}</strong>? This
                  will send them a connection request and start a conversation.
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
            <Button onClick={confirmConnection}>Send Connection Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Matches;
