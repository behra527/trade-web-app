import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from "@/../public/Logo.png"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LoginModal } from '@/features/components/auth/LoginModel';
import { SignupModal } from '@/features/components/auth/SignupModel';
import { ForgotPasswordModal } from '@/features/components/auth/ForgotPasswordModal';

export function Navbar() {
  const menuItems = [
    { label: 'Features', href: '#features' },
    { label: 'Markets', href: '#markets' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(menuItems[0].href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Static section IDs for scroll spy
    const sectionIds = ['features', 'markets', 'pricing', 'about'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let found = false;
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= 80 && rect.bottom > 80) {
                setActiveMenu(`#${section.id}`);
                found = true;
                break;
              }
            }
          }
          if (!found) {
            setActiveMenu('#features');
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('login') === 'true') {
        setIsLoginOpen(true);
      }
    }
  }, []);

  const handleMenuItemClick = (href: string) => {
    setActiveMenu(href);
    setIsMobileMenuOpen(false);
  };

  const handleSignInClick = () => {
    setIsMobileMenuOpen(false);
    setIsLoginOpen(true);
  };

  const handleGetStartedClick = () => {
    setIsMobileMenuOpen(false);
    setIsSignupOpen(true);
  };

  const switchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const switchToLogin = () => {
    setIsSignupOpen(false);
    setIsForgotPasswordOpen(false);
    setIsLoginOpen(true);
  };
  const switchToForgotPassword = () => {
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(true);
  };


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <img src={Logo.src} alt="TradeX Logo" className="w-6 h-6" />
            </div>
            <span className="text-xl text-white">TradeX</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 relative">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleMenuItemClick(item.href)}
                className={`relative text-slate-300 hover:text-white transition-colors px-2 py-1 focus:outline-none ${activeMenu === item.href ? 'font-bold text-white' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {item.label}
                {activeMenu === item.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-slate-800"
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-950 border-slate-800 w-[300px] sm:w-[400px] px-4">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl text-white">TradeX</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Menu Items */}
              <div className="flex flex-col gap-6 mt-8">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => handleMenuItemClick(item.href)}
                    className={`relative text-lg text-slate-300 hover:text-white transition-colors py-2 px-2 focus:outline-none ${activeMenu === item.href ? 'font-bold text-white' : ''}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {item.label}
                    {activeMenu === item.href && (
                      <motion.div
                        layoutId="navbar-underline-mobile"
                        className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    )}
                  </a>
                ))}

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-800">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-slate-800 w-full justify-center"
                    onClick={handleSignInClick}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-center"
                    onClick={handleGetStartedClick}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Login & Signup Modals */}
      <LoginModal 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onSwitchToSignup={switchToSignup}
        onForgotPassword={switchToForgotPassword}
      />
      <SignupModal 
        open={isSignupOpen} 
        onOpenChange={setIsSignupOpen}
        onSwitchToLogin={switchToLogin}
      />
      <ForgotPasswordModal
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
        onBackToLogin={switchToLogin}
      />
    </motion.nav>
  );
}
