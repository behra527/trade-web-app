"use client";
import { motion, useAnimationControls } from 'framer-motion';
import { ImageWithFallback } from '@/features/figma/ImageWithFallback';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const mockTrades = [
  { symbol: "AAPL", price: "174.52", change: "+2.34%", trend: "up" },
  { symbol: "GOOGL", price: "139.28", change: "+1.87%", trend: "up" },
  { symbol: "MSFT", price: "378.91", change: "-0.45%", trend: "down" },
  { symbol: "TSLA", price: "242.84", change: "+5.67%", trend: "up" },
  { symbol: "AMZN", price: "178.35", change: "+3.21%", trend: "up" }
];

export function TradingPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTrades.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden" id='markets'>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Professional Trading
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Interface</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Experience a seamless trading environment with real-time data and intuitive controls
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Trading Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/flagged/photo-1579225818168-858da8667fae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwc3RvY2tzJTIwY2hhcnR8ZW58MXx8fHwxNzYwNjkyNzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Trading platform"
                className="w-full h-auto"
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>

            {/* Floating price card */}
            <motion.div
              className="absolute -top-4 -right-4 bg-slate-800 border border-slate-700 rounded-xl p-4 backdrop-blur-sm shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white">BTC/USD</span>
              </div>
              <div className="text-2xl text-white">$47,823.45</div>
              <div className="text-green-400 text-sm">+4.23%</div>
            </motion.div>
          </motion.div>

          {/* Live Trading Feed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-2xl text-white mb-6">Live Market Feed</h3>
              <div className="space-y-3">
                {mockTrades.map((trade, index) => (
                  <motion.div
                    key={trade.symbol}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: currentIndex === index ? 1 : 0.4,
                      x: 0,
                      scale: currentIndex === index ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      currentIndex === index 
                        ? 'bg-blue-500/10 border border-blue-500/30' 
                        : 'bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        trade.trend === 'up' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <span className="text-white">{trade.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white">${trade.price}</div>
                      <div className={`text-sm flex items-center gap-1 ${
                        trade.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {trade.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {trade.change}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6"
              >
                <div className="text-green-400 text-sm mb-2">Win Rate</div>
                <div className="text-3xl text-white">94.2%</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6"
              >
                <div className="text-blue-400 text-sm mb-2">Avg. Return</div>
                <div className="text-3xl text-white">+12.8%</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
