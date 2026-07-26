import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, Send, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '@/constants';

export function Testimonials() {
  const reviews = [
    { name: "Marcus T.", role: "Credit Repair Business Owner", text: "M2 Phenom completely changed my agency. We process 10x the volume with zero extra staff. The Metro2 algorithms are flawless." },
    { name: "Sarah J.", role: "Client", text: "I tried doing it myself for years. M2 Phenom deleted 14 negative items in the first 35 days. My score jumped 90 points." },
    { name: "David L.", role: "Entrepreneur", text: "The automation is terrifyingly good. It literally does not sleep. Best investment I've ever made." }
  ];

  return (
    <section className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Wall of Love</h2>
          <p className="text-white/50 text-lg">Don't just take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-8">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center font-bold text-primary-400">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{rev.name}</h4>
                  <p className="text-sm text-white/40">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="py-32 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Simple, Powerful Pricing</h2>
          <p className="text-white/50 text-lg">Choose the engine that fits your goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
            <p className="text-white/50 mb-6">For individuals fixing their own credit.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-white">$99</span>
              <span className="text-white/50">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-white/80"><ShieldCheck className="w-5 h-5 text-primary-500 shrink-0" /> Full AI Analysis</li>
              <li className="flex gap-3 text-white/80"><ShieldCheck className="w-5 h-5 text-primary-500 shrink-0" /> 1 Round of Attacks/mo</li>
              <li className="flex gap-3 text-white/80"><ShieldCheck className="w-5 h-5 text-primary-500 shrink-0" /> Basic Monitoring Sync</li>
            </ul>
            <Link to="/client/auth/register" className="w-full py-4 text-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors">Select Starter</Link>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-3xl bg-brand-gradient border-2 border-primary-400 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_50px_rgba(249,115,22,0.2)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-black text-primary-400 text-xs font-bold uppercase tracking-widest rounded-full border border-primary-500">Most Popular</div>
            <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
            <p className="text-white/80 mb-6">For power users and small teams.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-white">$199</span>
              <span className="text-white/80">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-white"><ShieldCheck className="w-5 h-5 text-black shrink-0" /> Advanced Metro2 Attacks</li>
              <li className="flex gap-3 text-white"><ShieldCheck className="w-5 h-5 text-black shrink-0" /> Unlimited Disputes</li>
              <li className="flex gap-3 text-white"><ShieldCheck className="w-5 h-5 text-black shrink-0" /> Priority Support</li>
              <li className="flex gap-3 text-white"><ShieldCheck className="w-5 h-5 text-black shrink-0" /> Live Bureau Tracking</li>
            </ul>
            <Link to="/client/auth/register" className="w-full py-4 text-center rounded-xl bg-black hover:bg-gray-900 text-white font-bold transition-colors">Select Professional</Link>
          </div>

          {/* Empire */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">Empire</h3>
            <p className="text-white/50 mb-6">For credit repair agencies.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-white">$499</span>
              <span className="text-white/50">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-white/80"><ShieldCheck className="w-5 h-5 text-primary-500 shrink-0" /> White-label Portal</li>
              <li className="flex gap-3 text-white/80"><ShieldCheck className="w-5 h-5 text-primary-500 shrink-0" /> Unlimited Clients</li>
              <li className="flex gap-3 text-white/80"><ShieldCheck className="w-5 h-5 text-primary-500 shrink-0" /> Dedicated Account Rep</li>
              <li className="flex gap-3 text-white/80"><ShieldCheck className="w-5 h-5 text-primary-500 shrink-0" /> API Access</li>
            </ul>
            <Link to="/client/auth/register" className="w-full py-4 text-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors">Select Empire</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "Is this legal?", a: "100%. M2 Phenom uses the Fair Credit Reporting Act (FCRA) and Metro2 compliance standards to legally force bureaus to verify or delete inaccurate information." },
    { q: "How long does it take to see results?", a: "By law, bureaus have 30 days to respond to disputes. Our users typically see their first deletions within 35-40 days of their first attack." },
    { q: "Do I have to mail the letters myself?", a: "No. M2 Phenom is fully automated. We generate, format, and can electronically or physically dispatch the disputes on your behalf." },
    { q: "Can I use this for my clients?", a: "Yes! Our Professional and Empire plans are specifically designed for credit repair business owners to manage multiple clients efficiently." }
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-lg text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-white/60 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Get in Touch</h2>
            <p className="text-white/50 text-lg mb-8">Have questions about the software or need custom enterprise pricing? Drop us a message.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center"><Send className="w-5 h-5 text-primary-500" /></div>
                <div>
                  <p className="font-bold">Email Us</p>
                  <p className="text-sm text-white/50">support@m2phenom.com</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" />
              <input type="text" placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none" />
            <textarea placeholder="Your Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:outline-none resize-none"></textarea>
            <button type="button" className="w-full py-4 rounded-xl bg-brand-gradient text-white font-bold hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <img src={APP_CONFIG.logoUrl} alt="M2 Phenom" className="h-8 w-8 object-contain" />
            <span className="font-black text-xl tracking-tight text-white">M2 Phenom</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-white/50">
            <Link to="/auth/login" className="hover:text-white transition-colors">Admin Login</Link>
            <Link to="/client/auth/login" className="hover:text-white transition-colors">Client Login</Link>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
        <div className="text-center md:text-left text-white/30 text-sm">
          &copy; {new Date().getFullYear()} M2 Phenom. All rights reserved.
        </div>
      </div>
    </footer>
  );
}