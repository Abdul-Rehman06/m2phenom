import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { APP_CONFIG } from '@/constants';

import { LogoTicker, TheProblem, TheSolution, TheArchitect } from './sections/About';
import { FeaturesGrid, HowItWorks, Metrics } from './sections/Features';
import { Testimonials, Pricing, FAQ, Contact, Footer } from './sections/Conversion';

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-primary-500 selection:text-white font-sans">
      
      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src={APP_CONFIG.logoUrl} alt="M2 Phenom" className="h-10 w-10 object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {APP_CONFIG.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/client/auth/login" className="text-sm font-bold text-white/70 hover:text-white transition-colors hidden sm:block">
            Client Login
          </Link>
          <Link to="/auth/login" className="text-sm font-bold text-white/70 hover:text-white transition-colors hidden sm:block">
            Admin Login
          </Link>
          <Link to="/client/auth/register" className="px-5 py-2.5 rounded-full bg-brand-gradient text-white text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all transform hover:scale-105">
            Get Started
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Abstract Background */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/30 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-600/20 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-white/80">The Future of Credit Automation</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-white">REWRITE</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-orange-500 to-yellow-500">YOUR HISTORY.</span>
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-medium leading-relaxed mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              M2 Phenom is the most powerful, automated credit repair engine ever built. 
              Designed for those who refuse to settle for bad credit.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/client/auth/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-gradient text-white text-lg font-bold shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/client/auth/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Client Portal
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* 3. Logo Ticker */}
      <LogoTicker />

      {/* 4. The Problem */}
      <TheProblem />

      {/* 5. The Solution */}
      <TheSolution />

      {/* 6. Meet The Architect */}
      <TheArchitect />

      {/* 7. Features Grid */}
      <FeaturesGrid />

      {/* 8. How It Works */}
      <HowItWorks />

      {/* 9. Metrics */}
      <Metrics />

      {/* 10. Testimonials */}
      <Testimonials />

      {/* 11. Pricing */}
      <Pricing />

      {/* 12. FAQ */}
      <FAQ />

      {/* 13. Huge CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gradient opacity-20" />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            STOP WAITING.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-yellow-500">START WINNING.</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/client/auth/register" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black text-xl font-black uppercase tracking-wider hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Join The Revolution <ChevronRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 14. Contact Form */}
      <Contact />

      {/* 15. Footer */}
      <Footer />

    </div>
  );
}