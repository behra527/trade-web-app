"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface BalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BalanceDialog: React.FC<BalanceDialogProps> = ({ open, onOpenChange }) => {
  const router = useRouter();

  // Disable page scroll when dialog is open (optional polish)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleNavigate = (path: string) => {
    onOpenChange(false); // close dialog first
    setTimeout(() => {
      router.push(path); // navigate after close
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* ✅ BACKGROUND BLUR */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          open ? "backdrop-blur-sm bg-black/50" : "bg-transparent"
        }`}
      />

      <DialogContent
        className="bg-slate-900 border border-slate-700 text-white max-w-sm mx-auto p-6 rounded-2xl shadow-xl z-50"
        onPointerDownOutside={(e) => e.preventDefault()} // prevent accidental close
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-white">
            Account Balance
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 text-center space-y-2">
          <p className="text-slate-400 text-sm">Your Current Balance</p>
          <h2 className="text-4xl font-bold text-emerald-400">$1,200.00</h2>
          <p className="text-xs text-slate-500">Updated just now</p>
        </div>

        <div className="mt-6 space-y-2">
          <Button
            onClick={() => handleNavigate("/transection")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all"
          >
            View Transactions
          </Button>
          <Button
            onClick={() => handleNavigate("/trades")}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all"
          >
            View Trades
          </Button>
          <Button
            onClick={() => handleNavigate("/account")}
            className="w-full bg-slate-700 hover:bg-slate-600 transition-all"
          >
            Account Settings
          </Button>
          <Button
            onClick={() => handleNavigate("/logout")}
            variant="destructive"
            className="w-full transition-all"
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BalanceDialog;
