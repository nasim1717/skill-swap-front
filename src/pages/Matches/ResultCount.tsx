import { Users } from "lucide-react";

export default function ResultCount({ filteredUsers }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Found {filteredUsers.length} potential matches
      </p>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Users className="w-4 h-4" />
        <span>Sorted by match score</span>
      </div>
    </div>
  );
}
