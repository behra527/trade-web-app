'use client'

import React, { useState, useEffect } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
  Bell,
  User,
  Plus,
  ArrowDown,
  MoreHorizontal,
  X,
  CheckCircle2,
} from 'lucide-react'
import Image from 'next/image'
import MobileLogo from '@/../public/Logo.png'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from '@/components/ui/dialog'
import { supabase } from '@/supabaseClient'
import Cookies from 'js-cookie'
import type { User as SupabaseUser } from '@supabase/supabase-js'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showBalanceDialog, setShowBalanceDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const router = useRouter()

  // ✅ Fetch logged-in user info safely
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error

        const currentUser = data?.session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          // ✅ Store basic info in cookies
          Cookies.set('user_email', currentUser.email ?? '', { expires: 7 })
          Cookies.set('user_id', currentUser.id, { expires: 7 })

          // ✅ Fetch balance from profiles (if exists)
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', currentUser.id)
            .single()

          if (profileError) console.warn('Profile fetch error:', profileError.message)
          if (profile?.balance) setBalance(profile.balance)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching user:', err.message)
        } else {
          console.error('Unknown error fetching user:', err)
        }
      }
    }

    fetchUser()
  }, [])

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      Cookies.remove('user_email')
      Cookies.remove('user_id')
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        console.error('Logout error:', err.message)
      }
    }
  }

  const handleDeposit = () => router.push('/trade/deposit')
  const handleWithdraw = () => router.push('/trade/withdraw')

  return (
    <header className="relative bg-slate-900 border-b border-slate-700/50 shadow-lg">
      {/* Main Header */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger className="text-white hover:bg-slate-800 transition-colors" />

          {/* Logo */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-12 h-12 rounded-md flex items-center justify-center shadow-lg">
              <Image
                src={MobileLogo}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                TRADEX
              </h1>
              <p className="text-xs text-slate-400 -mt-1 hidden lg:block">
                WEB TRADING PLATFORM
              </p>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="sm:hidden">
            <Image
              src={MobileLogo}
              alt="logo"
              width={34}
              height={34}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
          </Button>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(true)}
              className="relative bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                6
              </span>
            </Button>

            {/* Balance Dialog Trigger */}
            <div
              onClick={() => setShowBalanceDialog(true)}
              className="bg-slate-800 rounded-lg px-3 py-2 hover:bg-slate-700 transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <p className="text-orange-400 text-xs font-medium uppercase">
                    Balance
                  </p>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-white" />
                    <span className="text-white text-sm font-medium">
                      ${balance.toLocaleString()}
                    </span>
                    <ArrowDown className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Deposit Button */}
            <Button
              size="sm"
              onClick={handleDeposit}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            >
              <Plus className="w-4 h-4 mr-1" />
              Deposit
            </Button>

            {/* Withdrawal Button */}
            <Button
              variant="ghost"
              onClick={handleWithdraw}
              size="sm"
              className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:scale-105"
            >
              Withdrawal
            </Button>
          </div>
        </div>
      </div>

      {/* Balance Dialog */}
      <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" />
        <DialogContent className="bg-slate-900 border border-slate-700 text-white rounded-xl backdrop-blur-md shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <User className="w-5 h-5 text-emerald-400" />
              Account Balance
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              {user ? `${user.email} • ID: ${user.id}` : 'Loading user...'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="bg-slate-800 rounded-lg p-4 border-2 border-transparent hover:border-slate-600 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-medium text-white">Live Account</h3>
                    <p className="text-2xl font-bold text-white mt-1">
                      ${balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-xs text-slate-400">The daily limit is not set</p>
                  <p className="text-xs text-slate-500 mt-1">Currency: USD CHANGE</p>
                </div>
                <button className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded transition-colors">
                  SET LIMIT
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 pt-4 border-t border-slate-700">
            <button
              onClick={handleDeposit}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Withdrawal
            </button>
          </div>

          <div className="flex justify-between text-xs text-slate-400 mt-4">
            <button className="hover:text-white transition-colors">Transactions</button>
            <button className="hover:text-white transition-colors">Trades</button>
            <button className="hover:text-white transition-colors">Account</button>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" />
        <DialogContent className="bg-slate-900 border border-slate-700 text-white rounded-xl backdrop-blur-md shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Bell className="w-5 h-5 text-emerald-400" />
              Notifications
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              You have 6 new updates.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {[
              'Deposit successful — $200 added to balance.',
              'Trade completed — +$16.80 profit.',
              'Withdrawal processed successfully.',
              'New feature: Sentiment Analysis available!',
              'Weekly report is ready.',
              'Bonus offer: +30% for next deposit.',
            ].map((msg, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-slate-800 rounded-lg px-3 py-2 hover:bg-slate-700 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <p className="text-sm leading-tight">{msg}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header
