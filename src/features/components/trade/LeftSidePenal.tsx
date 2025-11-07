"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

function LeftSidePanel() {
  const [upTrades, setUpTrades] = useState(71);
  const [downTrades, setDownTrades] = useState(29);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUpTrades = Math.floor(Math.random() * 40) + 30;
      const newDownTrades = 100 - newUpTrades;
      
      setUpTrades(newUpTrades);
      setDownTrades(newDownTrades);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-10 sm:w-12 max-h-[80vh] flex flex-col items-center py-1 space-y-1">
      {/* Add Button - Same design */}
      <Button 
        size="sm" 
        className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-0 flex items-center justify-center"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      {/* Trade Up/Down Status Bar - Same layout */}
      <div className="flex flex-col h-full items-center space-y-2">
        {/* Up Percentage */}
        <div className="text-sm text-white font-bold">{upTrades}%</div>
        
        {/* Vertical Status Bar - Same colors and orientation */}
        <div className="w-3 h-full rounded-lg p-1 flex flex-col justify-end relative">
          {/* Up Trades (Red) */}
          <div className="w-full bg-red-500 rounded-t-lg transition-all duration-300" style={{ height: `${upTrades}%` }}></div>
          {/* Down Trades (Green) */}
          <div className="w-full bg-green-500 rounded-b-lg transition-all duration-300" style={{ height: `${downTrades}%` }}></div>
        </div>
        
        {/* Down Percentage */}
        <div className="text-sm text-white font-bold">{downTrades}%</div>
      </div>
    </div>
  );
}

export default LeftSidePanel;