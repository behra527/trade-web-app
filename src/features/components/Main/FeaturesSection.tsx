"use client";
import { motion } from 'framer-motion';
import { LineChart, Shield, Zap, Globe, BarChart3, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Real-time market insights with AI-powered predictions and trend analysis.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute trades in milliseconds with our cutting-edge infrastructure.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your assets are protected with military-grade encryption and 2FA.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Access stocks, crypto, forex, and commodities from around the world.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart3,
    title: "Smart Trading Tools",
    description: "Customizable charts, indicators, and automated trading strategies.",
    color: "from-red-500 to-rose-500"
  },
  {
    icon: Lock,
    title: "Zero Commission",
    description: "Trade without fees and keep more of your profits.",
    color: "from-indigo-500 to-blue-500"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative" id='features'>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Powerful features designed for both beginners and professional traders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group h-full">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
