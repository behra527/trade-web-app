"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  image: string;
  onChange: (file: File) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ image, onChange }) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <div className="relative w-28 h-28 mx-auto">
      <Image
        src={image || "/default-avatar.png"}
        alt="Profile Avatar"
        fill
        className="object-cover rounded-full border-4 border-slate-700"
      />
      <Button
        size="icon"
        variant="secondary"
        className="absolute bottom-1 right-1 rounded-full bg-indigo-600 hover:bg-indigo-700"
        onClick={() => fileInput.current?.click()}
      >
        <Camera className="w-4 h-4 text-white" />
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
