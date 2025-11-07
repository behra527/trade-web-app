'use server'

import { supabase } from '@/supabaseClient'

export async function facebookLogin() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: 'http://localhost:3000/trade', // or your live domain
      },
    })

    if (error) {
      console.error('Facebook login error:', error.message)
      throw new Error(error.message)
    }

    // Redirect user to Facebook login page
    return data
  } catch (err: any) {
    console.error('Facebook Login Failed:', err.message)
    throw new Error(err.message || 'Facebook Login Failed')
  }
}
