import { useState } from "react";
import { User } from "@/lib/interface";
import MatchesHeader from "./MatchesHeader";
import MatchesFilter from "./MatchesFilter";
import ResultCount from "./ResultCount";
import MatchUserCard from "./MatchUserCard";
import NoMatchs from "./NoMatchs";
import ConfirmationModal from "./ConfirmationModal";

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const mockUsers: User[] = [
    {
      id: "1",
      name: "Sarah Chen",
      offeredSkills: [
        "Python",
        "Machine Learning",
        "Data Science",
        "Python",
        "Machine Learning",
        "Data Science",
      ],
      wantedSkills: ["React", "Frontend Development"],
      rating: 4.8,
      location: "San Francisco, CA",
      matchScore: 95,
    },
    {
      id: "2",
      name: "Mike Johnson",
      offeredSkills: ["Photography", "Photoshop", "Lightroom"],
      wantedSkills: ["Video Editing", "Motion Graphics", "Video Editing", "Motion Graphics"],
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
      <NoMatchs filteredUsers={filteredUsers} setSearchTerm={setSearchTerm} />
      {/* Confirmation Modal */}
      <ConfirmationModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        confirmConnection={confirmConnection}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Matches;
