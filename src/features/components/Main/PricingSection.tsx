import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Starter',
    price: '0',
    period: 'Forever Free',
    description: 'Perfect for beginners exploring trading',
    icon: Sparkles,
    iconColor: 'from-blue-500 to-cyan-500',
    popular: false,
    features: [
      'Virtual $10,000 trading account',
      'Real-time market data (15 min delay)',
      'Basic charting tools',
      '5 active trades at once',
      'Educational resources',
      'Email support',
      'Mobile app access',
    ],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '49',
    period: 'per month',
    description: 'For serious traders who want more',
    icon: Zap,
    iconColor: 'from-purple-500 to-pink-500',
    popular: true,
    features: [
      'Everything in Starter',
      'Real-time market data (no delay)',
      'Advanced charting & indicators',
      'Unlimited active trades',
      'AI-powered insights',
      'Priority support 24/7',
      'API access for automation',
      'Custom alerts & notifications',
      'Portfolio analytics',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '299',
    period: 'per month',
    description: 'For professional teams and institutions',
    icon: Crown,
    iconColor: 'from-yellow-500 to-orange-500',
    popular: false,
    features: [
      'Everything in Professional',
      'Multi-user accounts (up to 10)',
      'Dedicated account manager',
      'Custom integrations',
      'White-label solutions',
      'Advanced risk management',
      'Institutional-grade security',
      'Custom data feeds',
      'On-premise deployment option',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" id='pricing'>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Flexible Pricing</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Trading Plan</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include a 14-day money-back guarantee.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`relative ${plan.highlight ? 'lg:-mt-8' : ''}`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <Card 
                  className={`p-8 h-full flex flex-col ${
                    plan.highlight 
                      ? 'bg-gradient-to-b from-slate-800/80 to-slate-900/80 border-blue-500/50 shadow-xl shadow-blue-500/10' 
                      : 'bg-slate-900/50 border-slate-800'
                  } backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300`}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.iconColor} flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Plan Name */}
                  <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl text-white">${plan.price}</span>
                      <span className="text-slate-400">/{plan.period}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mb-8"
                  >
                    <Button 
                      className={`w-full py-6 ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>

                  {/* Features */}
                  <div className="flex-grow">
                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5">
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          </div>
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 text-sm mb-4">
            All plans include bank-level security, encrypted data, and compliance with financial regulations.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>14-day money back</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
