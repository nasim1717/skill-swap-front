import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { uploadProfileImage } from "@/services/profileService";
import { getInitials } from "@/helper/helper";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function ProfileAvatar({ profileData }) {
  const { user } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(profileData?.data?.profile_picture || null);

  // Upload API Call with TanStack Query
  const { mutate: handleUpload, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadProfileImage(formData);
      return res.data;
    },
    onSuccess: (data) => {
      setPreview(data.url);
      //   onUploadSuccess?.(data.url);
    },
  });

  // Camera button click → file picker open
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempPreview = URL.createObjectURL(file);
      setPreview(tempPreview);
      handleUpload(file);
    }
  };

  return (
    <div className="relative">
      <Avatar className="w-24 h-24">
        {preview ? (
          <AvatarImage src={preview} alt="Profile" className="object-cover" />
        ) : (
          <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
            {getInitials(profileData?.data?.name)}
          </AvatarFallback>
        )}
      </Avatar>

      {/* Upload Loading Spinner */}
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Camera Button */}
      {user?.id === profileData?.data?.id && (
        <Button
          size="icon-sm"
          className="absolute -bottom-2 -right-2 rounded-full shadow-md"
          onClick={handleCameraClick}
        >
          <Camera className="w-3 h-3" />
        </Button>
      )}
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
