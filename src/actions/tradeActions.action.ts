"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = "https://yxvljgyraaabyrtneayw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dmxqZ3lyYWFhYnlydG5lYXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MTk3NTYsImV4cCI6MjA3NjI5NTc1Nn0.R9PfI_43ifzX94JTDwc_Ci4rYHqFHRv8rvJgRmP9JE4";

export async function submitTrade(tradeData: {
  user_id: string;
  type: "buy" | "sell";
  amount: number;
}) {
  try {
    // ✅ Safely handle both async and sync versions of cookies()
    const cookieStore: any =
      typeof cookies === "function" ? await cookies() : cookies;

    const accessToken = cookieStore?.get?.("sb-access-token")?.value;

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    // ✅ Create Supabase client with token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // ✅ Insert trade
    const { data, error } = await supabase
      .from("trades")
      .insert([
        {
          user_id: tradeData.user_id,
          type: tradeData.type,
          amount: tradeData.amount,
          created_at: new Date().toISOString(),
        },
      ])
      .select("*");

    if (error) throw error;

    console.log("✅ Trade inserted:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Trade submission failed:", error.message);
    return { success: false, error: error.message };
  }
}
