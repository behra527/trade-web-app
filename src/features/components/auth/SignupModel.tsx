"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './style.css'
import logo from '@/../public/Logo.png'
import { useRouter } from 'next/navigation';
import { signup } from '@/actions/signup.action';
import { CustomToast } from '@/components/ui/CustomToast';
import { supabase } from '@/supabaseClient';
import googleLogo from '@/../public/google.png';
import facebookLogo from '@/../public/facebook.png';

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export function SignupModal({ open, onOpenChange, onSwitchToLogin }: SignupModalProps) {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
  ];

  // Toast state
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' | 'loading' } | null>(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const handleCreateAccount = async () => {
    setToast({ message: 'Creating account...', type: 'loading' });
    try {
      const result = await signup(email, password, name);
      setIsVerificationSent(true);
      setToast({ message: 'Account created! Please check your email to verify.', type: 'success' });
      setTimeout(() => {
        setToast(null);
        onSwitchToLogin(); // Switch to login modal after successful signup
      }, 3000);
    } catch (error: any) {
      if (error?.type === 'validation' && Array.isArray(error.messages)) {
        setToast({ message: error.messages.join('\n'), type: 'error' });
      } else if (error?.messages) {
        setToast({ message: error.messages[0], type: 'error' });
      } else {
        setToast({ message: error.message || 'Signup failed', type: 'error' });
      }
      console.error('Signup failed:', error);
    }
  };

const handleGoogleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/', // ✅ replace with your hosted domain in production
      },
    })

    if (error) {
      console.error('Google Login Error:', error.message)
      alert('Google login failed: ' + error.message)
    } else if (data?.url) {
      // Redirect the user to the Google sign-in page
      window.location.href = data.url
    }
  } catch (err) {
    console.error('Unexpected error during Google login:', err)
    alert('Unexpected error during Google login')
  }
}

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
        <DialogContent className="bg-slate-950 border-slate-800 max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            {isVerificationSent && (
              <div className="text-green-400 text-sm text-center mb-4">
                Please check your email to verify your account! {email}
              </div>
            )}
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
                  <img src={logo.src} alt="TradeX Logo" className="w-7 h-7 text-white" />
                </motion.div>
                <span className="text-2xl text-white">TradeX</span>
              </motion.div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm"
              >
                Create your account and start trading
              </motion.p>
            </DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-5 mt-4"
          >
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white pl-11 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white pl-11 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
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

              {/* Password Requirements */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 pt-2"
                >
                  {passwordRequirements.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-xs"
                    >
                      <CheckCircle2 
                        className={`w-4 h-4 transition-colors ${
                          req.met ? 'text-green-400' : 'text-slate-600'
                        }`}
                      />
                      <span className={req.met ? 'text-green-400' : 'text-slate-500'}>
                        {req.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-700 bg-slate-900 mt-0.5" />
              <span>
                I agree to the{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
              </span>
            </label>

            {/* Sign Up Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
              onClick={handleCreateAccount}
              >
                Create Account
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

            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-900"
                onClick={handleGoogleLogin}
                >
                  <img src={googleLogo.src} alt="Google Logo" className="w-5 h-5 mr-2" />
                  Google
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-900" 
                onClick={handleFacebookLogin}
                >
                  <img src={facebookLogo.src} alt="Facebook Logo" className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
              </motion.div>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-400">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </button>
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
