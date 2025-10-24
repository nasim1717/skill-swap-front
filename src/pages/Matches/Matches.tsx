import { useState } from "react";
import { User } from "@/lib/interface";
import MatchesHeader from "./MatchesHeader";
import MatchesFilter from "./MatchesFilter";
import ResultCount from "./ResultCount";
import MatchUserCard from "./MatchUserCard";
import NoMatchs from "./NoMatchs";
import ConfirmationModal from "./ConfirmationModal";
import { useQuery } from "@tanstack/react-query";
import { getMatches } from "@/services/matchesService";

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // matches api call
  const {
    isLoading,
    data: matchesData,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["matches", searchTerm],
    queryFn: () => getMatches(searchTerm),
  });

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
      {
        // Loading State
        isLoading && <p>Loading...</p>
      }
      {
        // Error State
        isError && <p>Something went wrong</p>
      }

      {isSuccess && (
        <>
          <ResultCount matchesData={matchesData} />
          <MatchUserCard matchesData={matchesData} handleConnect={handleConnect} />
        </>
      )}

      {/* Empty State */}
      <NoMatchs matchesData={matchesData} setSearchTerm={setSearchTerm} />
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
