// components/notification-button.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";

const NotificationButton: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(true)}
        className="relative bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-3 py-2 transition-all hover:scale-105"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
          6
        </span>
      </Button>

      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        {/* Blurred Overlay */}
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

          {/* Notification List */}
          <div className="space-y-3 mt-4">
            {[
              "Deposit successful — $200 added to balance.",
              "Trade completed — +$16.80 profit.",
              "Withdrawal processed successfully.",
              "New feature: Sentiment Analysis available!",
              "Weekly report is ready.",
              "Bonus offer: +30% for next deposit.",
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
    </>
  );
};

export default NotificationButton;