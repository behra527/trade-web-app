'use server'

import { supabase } from '@/supabaseClient'
import { LoginResponse } from '@/lib/type'

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    // Supabase requires email/password for sign-in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Supabase sign-in error:', error.message)
      throw new Error(error.message)
    }

    if (!data || !data.session || !data.user) {
      throw new Error('Invalid login response from Supabase')
    }

    // Construct consistent response type
    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email ?? '',
        username: data.user.user_metadata?.username ?? '', // optional field
      },
    }
  } catch (err: any) {
    console.error('Login failed:', err.message)
    throw new Error(err.message || 'Login failed')
  }
}
