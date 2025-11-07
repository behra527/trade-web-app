"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/features/store";
import { setUser } from "@/features/store/userSlice";
import { submitTrade } from "@/actions/tradeActions.action";

function TradingPanel() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(true);

  const [time, setTime] = useState("00:02:00"); // Fixed round duration 2 min
  const [investment, setInvestment] = useState(5);
  const [payout] = useState(9.0);

  const [roundNumber, setRoundNumber] = useState(1);
  const [roundEnd, setRoundEnd] = useState<Date | null>(null);
  const [roundTimer, setRoundTimer] = useState("02:00");
  const [trades, setTrades] = useState<any[]>([]);

  const tickSound = useRef<HTMLAudioElement | null>(null);

 // ✅ Initialize sound safely
useEffect(() => {
  const audio = new Audio("@/");
  audio.load();
  audio.oncanplaythrough = () => {
    tickSound.current = audio;
  };
  audio.onerror = (err) => {
    console.error("Failed to load sound:", err);
  };
}, []);


  // ✅ Fetch logged-in user and balance
  useEffect(() => {
    const fetchUserAndBalance = async () => {
      try {
        setBalanceLoading(true);
        const { data: sessionData } = await supabase.auth.getSession();
        const sessionUser = sessionData?.session?.user;

        if (!sessionUser) {
          toast.error("Please log in first");
          setBalance(0);
          setBalanceLoading(false);
          return;
        }

        dispatch(
          setUser({
            id: sessionUser.id,
            email: sessionUser.email ?? "",
            username: sessionUser.user_metadata?.username ?? "",
          })
        );

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("balance")
          .eq("id", sessionUser.id)
          .single();

        if (error) throw error;
        setBalance(profile?.balance ?? 0);
      } catch (err) {
        console.error("Error fetching balance:", err);
        setBalance(0);
      } finally {
        setBalanceLoading(false);
      }
    };

    fetchUserAndBalance();
  }, [dispatch]);

  // ✅ Start 2-minute rounds
  useEffect(() => {
    const startRound = () => {
      const end = new Date(Date.now() + 2 * 60 * 1000);
      setRoundEnd(end);
      setRoundNumber(1);
    };
    startRound();
  }, []);

  // ✅ Round logic + countdown + sound
  useEffect(() => {
    if (!roundEnd) return;

    const interval = setInterval(() => {
      const diff = roundEnd.getTime() - Date.now();

      if (diff <= 0) {
        // ✅ Play sound when round ends
        tickSound.current?.play();

        // ✅ Round summary
        if (trades.length > 0) {
          const buyers = trades.filter((t) => t.type === "buy");
          const sellers = trades.filter((t) => t.type === "sell");
          const totalBuy = buyers.reduce((sum, t) => sum + t.amount, 0);
          const totalSell = sellers.reduce((sum, t) => sum + t.amount, 0);

          console.log(`\n⏱️ ROUND ${roundNumber} ENDED`);
          console.log("Total Trades:", trades.length);
          console.log("Buyers:", buyers.length, "| Sellers:", sellers.length);
          console.log("Buy Total:", totalBuy, "| Sell Total:", totalSell);

          if (totalBuy > totalSell) {
            console.log(`📈 BUYERS dominate by $${(totalBuy - totalSell).toFixed(2)}`);
          } else if (totalSell > totalBuy) {
            console.log(`📉 SELLERS dominate by $${(totalSell - totalBuy).toFixed(2)}`);
          } else {
            console.log("⚖️ Equal trade amounts!");
          }
        } else {
          console.log(`ROUND ${roundNumber}: No trades placed.`);
        }

        // ✅ Reset for next round
        setTrades([]);
        setRoundNumber((prev) => prev + 1);
        const next = new Date(Date.now() + 2 * 60 * 1000);
        setRoundEnd(next);
      } else {
        const mins = Math.floor(diff / 1000 / 60);
        const secs = Math.floor((diff / 1000) % 60);
        setRoundTimer(
          `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [roundEnd, trades, roundNumber]);

  // ✅ Time Change
  const handleTimeChange = (direction: "increase" | "decrease") => {
    const [h, m, s] = time.split(":").map(Number);
    let total = h * 3600 + m * 60 + s + (direction === "increase" ? 60 : -60);
    total = Math.max(60, total);
    const newH = Math.floor(total / 3600);
    const newM = Math.floor((total % 3600) / 60);
    const newS = total % 60;
    setTime(
      `${newH.toString().padStart(2, "0")}:${newM
        .toString()
        .padStart(2, "0")}:${newS.toString().padStart(2, "0")}`
    );
  };

  // ✅ Investment Change
  const handleInvestmentChange = (direction: "increase" | "decrease") => {
    setInvestment((prev) =>
      Math.max(1, Math.min(balance ?? 1000, prev + (direction === "increase" ? 1 : -1)))
    );
  };

  // ✅ Handle Trade
  const handleTrade = async (direction: "buy" | "sell") => {
    if (!user?.id) {
      toast.error("Please log in first");
      return;
    }
    if ((balance ?? 0) < investment) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setLoading(true);

      const tradeData = {
        user_id: user.id,
        type: direction,
        amount: investment,
        roundNumber,
        roundEnd: roundEnd?.toISOString() || "",
        created_at: new Date().toISOString(),
      };

      console.log("🟢 Trade placed:", JSON.stringify(tradeData));
      setTrades((prev) => [...prev, tradeData]);

      const res = await submitTrade(tradeData);

      if (res.success) {
        toast.success(`Trade placed: ${direction.toUpperCase()} $${investment}`);
        const newBalance = (balance ?? 0) - investment;
        setBalance(newBalance);
        await supabase.from("profiles").update({ balance: newBalance }).eq("id", user.id);
      } else {
        toast.error(res.error || "Trade failed");
      }
    } catch (error) {
      toast.error("Something went wrong while placing trade.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-50 bg-slate-800 h-fit py-4 ml-2 rounded-md px-2 flex flex-col space-y-6 border-l border-r border-slate-600">

      {/* User Info */}
      <div className="text-center text-xs text-slate-400 mb-2">
    
        
        <div className="mt-1 text-yellow-400 font-semibold">
          ⏱️ Round {roundNumber} — Time left: {roundTimer}
        </div>
      </div>


      {/* Investment Selector */}
      <div className="bg-slate-800 px-2 relative">
        <div className="flex items-center justify-center mb-1">
          <div className="flex-1 h-px bg-slate-600"></div>
          <span className="text-slate-400 text-sm font-medium px-4 bg-slate-800">Investment</span>
          <div className="flex-1 h-px bg-slate-600"></div>
        </div>

        <div className="flex items-center justify-between rounded-lg px-2 mb-1">
          <Button
            size="sm"
            variant="ghost"
            disabled={balance === 0 || balance === null}
            className={`w-8 h-8 p-0 text-white hover:bg-slate-600 rounded-full bg-slate-600 ${
              balance === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleInvestmentChange("decrease")}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-white font-mono text-sm font-bold">{investment} $</span>
          <Button
            size="sm"
            variant="ghost"
            disabled={balance === 0 || balance === null}
            className={`w-8 h-8 p-0 text-white hover:bg-slate-600 rounded-full bg-slate-600 ${
              balance === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleInvestmentChange("increase")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-slate-600"></div>
          <a
            href="#"
            className="text-blue-400 text-xs font-bold hover:underline uppercase px-4 bg-slate-800"
          >
            SWITCH
          </a>
          <div className="flex-1 h-px bg-slate-600"></div>
        </div>
      </div>

      {/* Trade Buttons */}
      <div className="space-y-1">
        <Button
          disabled={loading || balance === 0}
          onClick={() => handleTrade("buy")}
          className="w-full h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-md flex items-center justify-between px-6"
        >
          <span>Up</span>
          <ArrowUp className="w-6 h-6" />
        </Button>

        <div className="text-center py-1">
          <div className="text-slate-400 text-xs">Your payout:</div>
          <div className="text-white text-sm font-bold">${investment}</div>
        </div>

        <Button
          disabled={loading || balance === 0}
          onClick={() => handleTrade("sell")}
          className="w-full h-10 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-md flex items-center justify-between px-6"
        >
          <span>Down</span>
          <ArrowDown className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}

export default TradingPanel;
