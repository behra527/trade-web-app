"use client";

import { createClient } from "@supabase/supabase-js";

// ✅ Your public Supabase credentials (safe for frontend)
const supabaseUrl = "https://yxvljgyraaabyrtneayw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dmxqZ3lyYWFhYnlydG5lYXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MTk3NTYsImV4cCI6MjA3NjI5NTc1Nn0.R9PfI_43ifzX94JTDwc_Ci4rYHqFHRv8rvJgRmP9JE4";

// ✅ Create Supabase client (for client-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // keep user logged in across refreshes
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
