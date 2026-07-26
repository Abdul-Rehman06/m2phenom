import { motion } from 'framer-motion';
import { CheckCircle2, AlertOctagon, Scale, Crosshair } from 'lucide-react';

export const DION_IMAGE = "https://instagram.fkhi22-1.fna.fbcdn.net/v/t51.75761-15/499898319_18507926923009734_8210622438234337472_n.jpg?stp=dst-jpg_e35_p750x750_sh2.08_tt6&_nc_cat=104&ig_cache_key=MzYzODg2NjgxNzQwNzA3MTI5Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=gkmZ95eXNrEQ7kNvwHKcz0D&_nc_oc=AdqMjK6vIiCIW_FusedVcPaUPJmB5dykDTJf-Npf3oNFGGRCh0OytLLTMvY5sjnMOYY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fkhi22-1.fna&_nc_gid=ABOsgTSlZRHoQqfWH7GmXQ&_nc_ss=7a22e&oh=00_AQBHgv7iZ09sviBaC-KTY68B6kWC7s9hPyuLPf6ehpICgA&oe=6A6B24E8";

export function LogoTicker() {
  const tickerItems = [
    "POWERED BY AI", "METRO2 COMPLIANT", "256-BIT ENCRYPTION", "FCRA APPROVED TACTICS", 
    "AUTOMATED DISPUTE ENGINE", "MILITARY GRADE SECURITY", "REAL-TIME SYNC", "ALGORITHMIC PRECISION"
  ];

  return (
    <div className="py-6 border-y border-white/5 bg-white/[0.02] overflow-hidden flex relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-16 items-center"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-white/40 font-bold tracking-widest text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TheProblem() {
  return (
    <section className="py-32 relative bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase mb-8">
              <AlertOctagon className="w-4 h-4" /> The Ugly Truth
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              The System is <br/><span className="text-red-500">Rigged Against You.</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed mb-6 font-light">
              For decades, the credit bureaus have held a monopoly on your financial future. They profit from your mistakes, delay your disputes, and hide behind mountains of bureaucratic red tape.
            </p>
            <p className="text-lg text-white/40 leading-relaxed font-light">
              They don't want you to know the rules, because when you know the rules—<strong className="text-white">you can break their system.</strong>
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 backdrop-blur-sm">
              <h4 className="text-5xl font-black text-white mb-2">79%</h4>
              <p className="text-sm text-red-400 font-bold uppercase tracking-wider">Of Reports Have Errors</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-5xl font-black text-white mb-2">30</h4>
              <p className="text-sm text-white/50 font-bold uppercase tracking-wider">Days to Legally Respond</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm sm:col-span-2">
              <h4 className="text-2xl font-bold text-white mb-2">They rely on your exhaustion.</h4>
              <p className="text-sm text-white/50 leading-relaxed">Most people give up after the first generic rejection letter. That's exactly what the bureaus count on.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function TheSolution() {
  return (
    <section className="py-32 relative bg-[#0a0a0a] overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 mx-auto bg-brand-gradient rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(249,115,22,0.4)] transform rotate-3">
            <Crosshair className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            We Reverse-Engineered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-yellow-500">The Algorithm.</span>
          </h2>
          <p className="text-2xl text-white/70 leading-relaxed font-light mb-12">
            M2 Phenom doesn't send generic templates. We utilize aggressively precise, <strong className="text-white">Metro2 Compliant</strong> factual disputes powered by AI to corner the bureaus legally, forcing deletions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="p-6 bg-black/50 border border-white/10 rounded-2xl" whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.3)' }}>
            <Scale className="w-8 h-8 text-primary-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">FCRA Law Exploitation</h4>
            <p className="text-sm text-white/50">Using federal law to hold bureaus strictly accountable.</p>
          </motion.div>
          <motion.div className="p-6 bg-black/50 border border-white/10 rounded-2xl" whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.3)' }}>
            <AlertOctagon className="w-8 h-8 text-primary-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Aggressive Auditing</h4>
            <p className="text-sm text-white/50">Targeting the exact data fields bureaus fail to verify.</p>
          </motion.div>
          <motion.div className="p-6 bg-black/50 border border-white/10 rounded-2xl" whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.3)' }}>
            <CheckCircle2 className="w-8 h-8 text-primary-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Guaranteed Delivery</h4>
            <p className="text-sm text-white/50">Automated tracking ensures they can't ignore your attack.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function TheArchitect() {
  return (
    <section className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <div className="relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/20 aspect-square max-w-md mx-auto lg:max-w-none"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src={DION_IMAGE} 
                alt="Dion - Mr. Phenomenal Power" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <h3 className="text-3xl font-black text-white mb-1">Dion</h3>
                <p className="text-primary-400 font-bold tracking-widest uppercase text-sm">Mr. Phenomenal Power</p>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-8 -right-8 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl hidden md:block"
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">Visionary</p>
                  <p className="text-sm font-bold text-white">Founder & CEO</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                Meet The <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-600">Architect.</span>
              </h2>
              <div className="w-20 h-2 bg-brand-gradient rounded-full mb-8" />
              
              <p className="text-xl text-white/70 leading-relaxed mb-6 font-light">
                Known as <strong className="text-white">Mr. Phenomenal Power</strong>, Dion didn't just build a software—he built a revolution. M2 Phenom was born from the uncompromising belief that financial freedom is a right, not a privilege.
              </p>
              <p className="text-lg text-white/50 leading-relaxed font-light mb-8">
                By fusing cutting-edge AI automation with relentless aggressive dispute tactics, Dion has engineered a system that strips the power away from the credit bureaus and hands it directly back to you.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-sm">
                  <h4 className="text-4xl font-black text-white mb-2">10x</h4>
                  <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Faster Results</p>
                </div>
                <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-sm">
                  <h4 className="text-4xl font-black text-white mb-2">100%</h4>
                  <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Automated</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}