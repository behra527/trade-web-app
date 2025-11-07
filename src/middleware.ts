import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yxvljgyraaabyrtneayw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dmxqZ3lyYWFhYnlydG5lYXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MTk3NTYsImV4cCI6MjA3NjI5NTc1Nn0.R9PfI_43ifzX94JTDwc_Ci4rYHqFHRv8rvJgRmP9JE4"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/trade')) {
    const accessToken = request.cookies.get('sb-access-token')?.value

    if (!accessToken) {
      return NextResponse.redirect(new URL('/?login=true', request.url))
    }

    const { data, error } = await supabase.auth.getUser(accessToken)
    if (error || !data?.user) {
      return NextResponse.redirect(new URL('/?login=true', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/trade/:path*'],
}
