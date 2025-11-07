"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/type";

interface ProfileFormProps {
  profile: UserProfile;
  onSave: (data: UserProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState(profile);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSaving(true);
    setTimeout(() => {
      onSave(formData);
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="username" className="text-slate-300">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-slate-900 border-slate-700 text-slate-100"
        />
      </div>

      <div>
        <Label htmlFor="displayName" className="text-slate-300">Display Name</Label>
        <Input
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          className="bg-slate-900 border-slate-700 text-slate-100"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-slate-300">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-900 border-slate-700 text-slate-100"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={saving}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};
