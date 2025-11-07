"use client";

import React, { useState, useEffect } from "react";
import { paymentCategories } from "@/lib/db";
import { PaymentCategory, PaymentMethod } from "@/lib/type";
import { PaymentCard } from "./PaymentCard";
import { Separator } from "@/components/ui/separator";

// Skeleton placeholder for PaymentCard
const SkeletonCard: React.FC = () => (
  <div className="flex items-center gap-3 border border-slate-700 p-3 rounded-xl bg-slate-800 animate-pulse">
    <div className="w-8 h-8 bg-slate-700 rounded-md" />
    <div className="h-4 w-24 bg-slate-700 rounded" />
  </div>
);

const DepositOptions: React.FC = () => {
  const [selected, setSelected] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Use placeholder array while loading
  const displayCategories: PaymentCategory[] = loading
    ? Array.from({ length: 2 }).map((_, i) => ({
        title: `Loading ${i + 1}`,
        icon: () => null,
        methods: [],
      }))
    : paymentCategories;

  return (
    <div className="w-full bg-slate-900 p-4 sm:p-6 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayCategories.map((category, i) => (
          <div key={category.title || i} className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 bg-slate-700 rounded animate-pulse" />
                  <div className="w-32 h-4 bg-slate-700 rounded animate-pulse" />
                </>
              ) : (
                <>
                  {category.icon && (
                    <category.icon className="text-slate-300 w-5 h-5" />
                  )}
                  <h3 className="text-slate-200 font-semibold text-lg sm:text-xl">
                    {category.title}
                  </h3>
                </>
              )}
            </div>

            <Separator className="bg-slate-700" />

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 h-fit sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {loading
                ? Array.from({ length: 4 }).map((_, j) => (
                    <SkeletonCard key={j} />
                  ))
                : category.methods.map((method) => (
                    <PaymentCard
                      key={method.id}
                      method={method}
                      selected={selected?.id === method.id}
                      onSelect={setSelected}
                    />
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositOptions;
