import React from 'react';
import LeftSidePanel from '@/features/components/trade/LeftSidePenal';
import TradeVisual from '@/features/components/trade/TradeVisual';
import TradingPanel from '@/features/components/trade/TradingPanel';

export default function TradingPage() {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Left Side Panel */}
      <LeftSidePanel />
      
      {/* Main Chart Area */}
      <TradeVisual />
      
      {/* Right Trading Panel */}
      <TradingPanel />
    </div>
  );
}

