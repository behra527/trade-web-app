import { supabase } from '../supabaseClient';

export async function signup(email: string, password: string, fullName?: string) {
  try {
    // Step 1: Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error.message);
      return { error: error.message };
    }

    const user = data.user;
    console.log("User created:", user);

    // Step 2: Insert into profiles table
    if (user) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          full_name: fullName,
        },
      ]);

      if (insertError) {
        console.error("Profile insert failed:", insertError.message);
        return { error: insertError.message };
      }

      console.log("Profile stored successfully in DB!");
    }

    return { success: true, user: data.user };

  } catch (err: any) {
    console.error("Signup crashed:", err);
    return { error: "Internal Server Error" };
  }
}
