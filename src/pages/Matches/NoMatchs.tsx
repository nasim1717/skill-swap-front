import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function NoMatchs({ matchesData, setSearchTerm }) {
  return (
    matchesData?.data?.matched_users?.length === 0 && (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No matches found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
        <Button variant="outline" onClick={() => setSearchTerm("")}>
          Clear Search
        </Button>
      </div>
    )
  );
}
