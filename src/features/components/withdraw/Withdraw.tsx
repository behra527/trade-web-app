"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Info, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Withdraw: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = () => {
    if (!amount) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simulated delay
  };

  return (
    <div className="p-4 sm:p-8 bg-slate-900 min-h-screen text-white">
      {/* Account Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Balance", value: "$2,450.00" },
          { label: "Pending Withdrawals", value: "$150.00" },
          { label: "Available to Withdraw", value: "$2,300.00" },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-slate-800 border border-slate-700 rounded-2xl"
          >
            <CardContent className="p-4 flex flex-col items-start justify-center">
              <p className="text-slate-400 text-sm">{item.label}</p>
              <h3 className="text-xl sm:text-2xl font-semibold mt-1 text-indigo-400">
                {item.value}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Warning / Info Section */}
      <Alert className="bg-slate-800 border border-slate-700 mb-6">
        <Info className="h-5 w-5 text-indigo-400" />
        <AlertTitle className="text-slate-200">Notice</AlertTitle>
        <AlertDescription className="text-slate-400 text-sm">
          Withdrawals are processed within 24 hours. Please make sure your
          payment details are up to date before submitting a request.
        </AlertDescription>
      </Alert>

      {/* Withdraw Form */}
      <Card className="bg-slate-800 border border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-slate-100 text-xl">
            Withdraw Funds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm mb-2 block">
              Enter Amount
            </label>
            <div className="flex items-center gap-3">
              <DollarSign className="text-slate-400" />
              <Input
                type="number"
                placeholder="Enter amount to withdraw"
                className="bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleWithdraw}
            disabled={!amount || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            {loading ? "Processing..." : "Submit Withdrawal"}
          </Button>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="mt-8 bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-4">
        <h2 className="text-slate-100 text-lg font-semibold">
          Frequently Asked Questions
        </h2>
        <Separator className="bg-slate-700" />
        <div className="space-y-3 text-slate-400 text-sm">
          <p>
            <strong className="text-slate-300">Q:</strong> How long do
            withdrawals take?
            <br />
            <strong className="text-slate-300">A:</strong> Usually within 24–48
            hours depending on the method.
          </p>
          <p>
            <strong className="text-slate-300">Q:</strong> What is the minimum
            withdrawal amount?
            <br />
            <strong className="text-slate-300">A:</strong> The minimum amount is
            $10.
          </p>
        </div>
      </div>

      {/* Footer / Info Section */}
      <p className="text-center text-slate-500 text-xs mt-6">
        Please ensure your payment details are accurate before requesting a
        withdrawal. All transactions are secured and verified.
      </p>
    </div>
  );
};

export default Withdraw;
