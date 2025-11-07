"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { UserProfile } from "@/lib/type";

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    username: "suleman_khan",
    displayName: "Suleman Khan",
    email: "suleman@example.com",
    profileImage: "/default-avatar.png",
  });

  const handleProfileSave = (updated: UserProfile) => setUser(updated);
  const handleAvatarChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUser((prev) => ({ ...prev, profileImage: imageUrl }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-slate-100">Profile Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Avatar */}
        <div className="col-span-1">
          <ProfileAvatar image={user.profileImage} onChange={handleAvatarChange} />
        </div>

        {/* Right - Forms */}
        <div className="col-span-2 space-y-8">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-lg font-medium mb-4">Personal Information</h2>
            <ProfileForm profile={user} onSave={handleProfileSave} />
          </div>

          <Separator className="bg-slate-700" />

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-lg font-medium mb-4">Change Password</h2>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
