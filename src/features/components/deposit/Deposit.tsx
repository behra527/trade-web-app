"use client";

import React from "react";
import DepositOptions from "@/features/components/deposit/DepositOptions";

const Deposit: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 h-fit text-white">
      <DepositOptions />
    </div>
  );
};

export default Deposit;
