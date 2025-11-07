"use client";
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from "@/../public/Logo.png"

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Image src={Logo} alt="TradeX Logo" className="w-6 h-6" />
              </div>
              <span className="text-xl text-white">TradePro</span>
            </div>
            <p className="text-slate-400 text-sm">
              The most advanced trading platform for modern traders. 
              Trade smarter, not harder.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-slate-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-slate-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Products</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Trading Platform</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Mobile App</Link></li>
              {/* <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">API Access</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Market Data</Link></li> */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 TradeX. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Trading involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
