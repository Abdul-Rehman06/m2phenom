import { useNavigate } from 'react-router-dom';
import { Eye, User, Lock } from 'lucide-react';
import { ROUTES } from '@/constants';

export function PpamsLogin() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] mx-auto p-4">
      <div className="w-full max-w-[440px] bg-white/90 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sm:p-10 border border-white backdrop-blur-xl relative overflow-hidden">
        
        {/* Subtle top glare/gradient for that 3D card feel */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none z-0"></div>

        <div className="relative z-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative flex items-center justify-center w-35 h-16 mb-2">
             <img src="/header-logo.jpg" alt="" className="w-full h-full" />
            </div>
            <h1 className="text-3xl font-black text-[#1e293b] tracking-tight flex items-center">
              ProdigySurge<span className="text-orange-500 text-2xl">.com</span>
            </h1>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8 opacity-60">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-xs text-slate-500 font-medium tracking-wide">Secure Access Portal</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate(ROUTES.PPAMS.DASHBOARD); }}>
            
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-orange-500 group-focus-within:text-orange-600 transition-colors" strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-800 font-medium placeholder-slate-400 transition-all outline-none" 
                placeholder="Email Address"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-orange-500 group-focus-within:text-orange-600 transition-colors" strokeWidth={1.5} />
              </div>
              <input 
                type="password" 
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-800 font-medium placeholder-slate-400 transition-all outline-none" 
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
                <Eye className="h-5 w-5" strokeWidth={1.5} />
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold text-sm uppercase tracking-widest shadow-[0_8px_20px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                LOGIN NOW
              </button>
            </div>

          </form>

          {/* Footer Text */}
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
            <span className="text-orange-500">•</span>
            Powered by <span className="text-orange-500 font-bold">EPIC PRO REPORT</span>
            <span className="text-orange-500">•</span>
          </div>
        </div>
      </div>
    </div>
  );
}
