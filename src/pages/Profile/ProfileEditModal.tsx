import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileEditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  editedProfile,
  handleProfileChange,
  handleSaveProfile,
  isUpdateProfileLoading,
  updateProfileError,
}) {
  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={editedProfile.name}
              type="text"
              placeholder="Enter your name"
              onChange={(e) => handleProfileChange("name", e.target.value)}
            />
            {updateProfileError?.response?.data?.errors?.name && (
              <p className="text-sm text-red-500">
                {updateProfileError?.response?.data?.errors?.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-location">Location</Label>
            <Input
              id="edit-location"
              type="text"
              placeholder="Enter your location"
              value={editedProfile.location}
              onChange={(e) => handleProfileChange("location", e.target.value)}
            />
            {updateProfileError?.response?.data?.errors?.location && (
              <p className="text-sm text-red-500">
                {updateProfileError?.response?.data?.errors?.location}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-bio">Bio</Label>
            <Textarea
              id="edit-bio"
              placeholder="Enter your bio"
              value={editedProfile.bio}
              onChange={(e) => handleProfileChange("bio", e.target.value)}
              rows={4}
              className="resize-none"
            />
            {updateProfileError?.response?.data?.errors?.bio && (
              <p className="text-sm text-red-500">
                {updateProfileError?.response?.data?.errors?.bio}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isUpdateProfileLoading} onClick={handleSaveProfile}>
            {isUpdateProfileLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
