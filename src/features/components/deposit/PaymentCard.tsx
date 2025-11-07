"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PaymentMethod } from "@/lib/type";

interface PaymentCardProps {
  method?: PaymentMethod; // optional when loading
  onSelect?: (method: PaymentMethod) => void;
  selected?: boolean;
  loading?: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  method,
  onSelect,
  selected = false,
  loading = false,
}) => {
  if (loading) {
    // Skeleton State
    return (
      <div className="flex items-center gap-3 border border-slate-700 p-3 rounded-xl bg-slate-800 animate-pulse">
        <div className="w-8 h-8 bg-slate-700 rounded-md" />
        <div className="h-4 w-24 bg-slate-700 rounded" />
      </div>
    );
  }

  // Normal Card State
  if (!method) return null;

  return (
    <Card
      onClick={() => onSelect?.(method)}
      className={cn(
        "flex items-center gap-3 cursor-pointer border border-slate-700 p-3 rounded-md px-2  bg-white hover:bg-white/80 transition-all",
        selected && "ring-2 ring-indigo-500"
      )}
    >
      <div className="relative w-12 h-12">
        <Image
          src={method.logo}
          alt={method.name}
          fill
          className="object-contain rounded-sm"
        />
      </div>
      <span className="text-black font-medium text-sm truncate">
        {method.name}
      </span>
    </Card>
  );
};
