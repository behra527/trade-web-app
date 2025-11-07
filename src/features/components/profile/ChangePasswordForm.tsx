"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export const ChangePasswordForm: React.FC = () => {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    if (form.newPass !== form.confirm) return alert("Passwords do not match");
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-4">
      {/* Current Password */}
      <div className="relative">
        <Label htmlFor="current" className="text-slate-300 mb-2 block">
          Current Password
        </Label>
        <Input
          id="current"
          name="current"
          type={show.current ? "text" : "password"}
          value={form.current}
          onChange={handleChange}
          className="bg-slate-900 border-slate-700 text-slate-100 pr-10"
        />
        <button
          type="button"
          onClick={() => toggleVisibility("current")}
          className="absolute right-3 top-9 text-slate-400 hover:text-slate-200"
        >
          {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <Label htmlFor="newPass" className="text-slate-300 mb-2 block">
          New Password
        </Label>
        <Input
          id="newPass"
          name="newPass"
          type={show.newPass ? "text" : "password"}
          value={form.newPass}
          onChange={handleChange}
          className="bg-slate-900 border-slate-700 text-slate-100 pr-10"
        />
        <button
          type="button"
          onClick={() => toggleVisibility("newPass")}
          className="absolute right-3 top-9 text-slate-400 hover:text-slate-200"
        >
          {show.newPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Label htmlFor="confirm" className="text-slate-300 mb-2 block">
          Confirm New Password
        </Label>
        <Input
          id="confirm"
          name="confirm"
          type={show.confirm ? "text" : "password"}
          value={form.confirm}
          onChange={handleChange}
          className="bg-slate-900 border-slate-700 text-slate-100 pr-10"
        />
        <button
          type="button"
          onClick={() => toggleVisibility("confirm")}
          className="absolute right-3 top-9 text-slate-400 hover:text-slate-200"
        >
          {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {loading ? "Changing..." : "Change Password"}
      </Button>
    </div>
  );
};
