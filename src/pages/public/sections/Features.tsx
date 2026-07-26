import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, Lock, RefreshCw, FileText } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    { icon: Zap, title: "Lightning Fast Attacks", desc: "Generate complex Metro2 compliance dispute letters in seconds, not hours." },
    { icon: Shield, title: "Bulletproof Tracking", desc: "Live synchronization with credit monitoring providers. Watch scores rise." },
    { icon: TrendingUp, title: "Phenomenal Growth", desc: "A system designed to scale. Perfect for individuals or credit repair empires." },
    { icon: Lock, title: "Bank-Level Security", desc: "Your data is encrypted with AES-256 military-grade security." },
    { icon: RefreshCw, title: "Auto-Sync", desc: "Seamlessly pulls reports directly from MyFreeScoreNow, SmartCredit, and IdentityIQ." },
    { icon: FileText, title: "Smart Analytics", desc: "Visualize every deletion, inquiry removal, and score jump in a gorgeous dashboard." }
  ];

  return (
    <section className="py-32 relative bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">The Engine of Change</h2>
          <p className="text-xl text-white/50">Everything you need to demolish bad credit and rebuild your financial future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <FeatureCard key={i} delay={i * 0.1} icon={feat.icon} title={feat.title} desc={feat.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }: { icon: ElementType, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-[50px] group-hover:bg-primary-500/40 transition-colors" />
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 relative z-10">
        <Icon className="w-7 h-7 text-primary-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{title}</h3>
      <p className="text-white/50 leading-relaxed relative z-10">{desc}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  const steps = [
    { num: "01", title: "Connect Profile", desc: "Securely link your credit monitoring provider in seconds." },
    { num: "02", title: "AI Analysis", desc: "Our engine scans 100% of your report for negative items & errors." },
    { num: "03", title: "Generate Attacks", desc: "Aggressive, Metro2 compliant letters are created instantly." },
    { num: "04", title: "Watch It Burn", desc: "Track deletions and score increases live in your dashboard." }
  ];

  return (
    <section className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">4 Steps to Freedom</h2>
          <p className="text-white/50 text-lg">We've automated the entire dispute lifecycle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-8xl font-black text-white/5 absolute -top-10 -left-4 select-none pointer-events-none">{step.num}</div>
              <div className="relative z-10 pt-4">
                <div className="w-12 h-12 bg-brand-gradient rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-white/50">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Metrics() {
  return (
    <section className="py-20 bg-brand-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="py-4">
            <h4 className="text-5xl font-black text-white mb-2">10M+</h4>
            <p className="text-white/80 font-bold uppercase tracking-widest text-sm">Items Deleted</p>
          </div>
          <div className="py-4">
            <h4 className="text-5xl font-black text-white mb-2">99.9%</h4>
            <p className="text-white/80 font-bold uppercase tracking-widest text-sm">System Uptime</p>
          </div>
          <div className="py-4">
            <h4 className="text-5xl font-black text-white mb-2">24/7</h4>
            <p className="text-white/80 font-bold uppercase tracking-widest text-sm">Automated Processing</p>
          </div>
        </div>
      </div>
    </section>
  );
}