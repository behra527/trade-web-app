"use client";
import React from 'react'
import { Navbar } from './Navbar'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { TradingPreview } from './TradingPreview'
import { CTASection } from './CTASection'
import { Footer } from './Footer'
import { PricingSection } from './PricingSection';


import { useState } from 'react';
import { SignupModal } from '../auth/SignupModel';

function Main() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const handleOpenSignup = () => setIsSignupOpen(true);
  const handleCloseSignup = () => setIsSignupOpen(false);
  const handleSwitchToLogin = () => setIsSignupOpen(false); // You may want to open login modal here

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden max-w-full">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TradingPreview />
      <PricingSection />
      <CTASection onOpenSignup={handleOpenSignup} />
      <Footer />
      <SignupModal open={isSignupOpen} onOpenChange={setIsSignupOpen} onSwitchToLogin={handleSwitchToLogin} />
    </div>
  );
}

export default Main
