"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import logo from "@/../public/Logo.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { login } from '@/actions/login.action';
import { CustomToast } from '@/components/ui/CustomToast';
import GoogleIcon from "@/../public/google.png";
import FacebookIcon from "@/../public/facebook.png";
import { supabase } from '@/supabaseClient';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/store/userSlice';



interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

export function LoginModal({  open, onOpenChange, onSwitchToSignup, onForgotPassword }: LoginModalProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  // Toast state
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' | 'loading' } | null>(null);

  const handleSignIn = async () => {
  setToast({ message: 'Signing in...', type: 'loading' });

  try {
    // Supabase login (directly)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data?.session) {
      // ✅ Set Supabase cookies manually (important for middleware)
      Cookies.set('sb-access-token', data.session.access_token, { path: '/' });
      Cookies.set('sb-refresh-token', data.session.refresh_token, { path: '/' });
      // console.log("Access Token:", data.session.access_token);

      // ✅ Store user info (optional)
      const user = data.user;
      // console.log("Logged in user:", user);
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      dispatch(setUser({
        id: user.id,
        email: user.email ?? '',
        username: user.user_metadata?.username ?? '',
      }));

      setToast({ message: 'Login successful!', type: 'success' });

      // ✅ Close modal and navigate to /trade
      onOpenChange(false);
      router.push('/trade');
    } else {
      throw new Error('No session data received');
    }
  } catch (error: any) {
    setToast({
      message: error.message || 'Login failed',
      type: 'error',
    });
    console.error('Login failed:', error);
  }
};

  const [showPassword, setShowPassword] = useState(false);

const handleGoogleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // dynamic redirect
      },
    });

    if (error) {
      console.error('Google Login Error:', error.message);
      setToast({ message: `Google login failed: ${error.message}`, type: 'error' });
      return;
    }

    // ✅ redirect user to Google login page
    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error('Unexpected error during Google login:', err);
    setToast({ message: 'Unexpected error during Google login', type: 'error' });
  }
};


const handleFacebookLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: 'http://localhost:3000/trade', // ✅ same note as above
      },
    })

    if (error) {
      console.error('Facebook Login Error:', error.message)
      alert('Facebook login failed: ' + error.message)
    } else if (data?.url) {
      // Redirect the user to the Facebook sign-in page
      window.location.href = data.url
    }
  } catch (err) {
    console.error('Unexpected error during Facebook login:', err)
    alert('Unexpected error during Facebook login')
  }
}

  return (
    <>
      {toast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-slate-950 border-slate-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex items-center justify-center gap-2 mb-2"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Image src={logo} alt="TradeX Logo" width={28} height={28} className="text-white" />
                </motion.div>
                <span className="text-2xl text-white">TradeX</span>
              </motion.div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm"
              >
                Welcome back! Sign in to your account
              </motion.p>
            </DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 mt-4"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white pl-11 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white pl-11 pr-11 focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-900" />
                Remember me
              </label>
              <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors" onClick={onForgotPassword}>
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
              onClick={handleSignIn}
              >
                Sign In
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-slate-950 px-2 text-slate-500">OR CONTINUE WITH</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline"
                onClick={handleGoogleLogin}
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-900">
                  <Image src={GoogleIcon} alt="Google Logo" width={20} height={20} className="mr-2" />
                  Google
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline"
                  onClick={handleFacebookLogin}
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-900">
                  <Image src={FacebookIcon} alt="Facebook Logo" width={20} height={20} className="mr-2" />
                  Facebook
                </Button>
              </motion.div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up
              </button>
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
