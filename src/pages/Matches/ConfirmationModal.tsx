import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getInitials } from "@/helper/helper";
export default function ConfirmationModal({
  showConfirmModal,
  setShowConfirmModal,
  selectedUser,
  confirmConnection,
}) {
  return (
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
  );
}
