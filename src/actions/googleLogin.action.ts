'use server'

import { supabase } from '@/supabaseClient'

export async function googleLogin() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/tade', // or your production URL
      },
    })

    if (error) {
      console.error('Google login error:', error.message)
      throw new Error(error.message)
    }

    // Redirect user to Google login page
    return data
  } catch (err: any) {
    console.error('Google Login Failed:', err.message)
    throw new Error(err.message || 'Google Login Failed')
  }
}
