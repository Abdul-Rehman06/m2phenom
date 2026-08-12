import { useNavigate } from 'react-router-dom';
import { Eye, User } from 'lucide-react';
import { ROUTES } from '@/constants';

export function PpamsLogin() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Central Login Container */}
      <div className="relative flex flex-col items-center w-full max-w-md mt-16 sm:mt-8">
        
        {/* Einstein Logo (Absolute positioned to overlay top) */}
        <div className="absolute -top-32 sm:-top-40 z-20 flex justify-center w-full drop-shadow-2xl">
          <img 
            src="https://prodigysurge.com/images/prodigysurge_logo.png" 
            alt="ProdigySurge" 
            className="w-64 sm:w-80 h-auto object-contain"
            onError={(e) => {
              // Fallback placeholder if actual logo image link isn't available/correct
              e.currentTarget.src = "https://ui-avatars.com/api/?name=Prodigy+Surge&background=ff7a00&color=fff&size=256&rounded=true&bold=true";
            }}
          />
        </div>

        {/* Login Form Card */}
        <div className="w-full pt-32 pb-8 px-6 sm:px-10 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-md bg-black/40 relative z-10 mt-16">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate(ROUTES.PPAMS.DASHBOARD); }}>
            
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="w-full pl-10 pr-3 py-3 rounded-full bg-white/90 border-0 focus:ring-2 focus:ring-orange-500 text-black font-medium placeholder-gray-500 shadow-inner transition-all" 
                placeholder="Username / Email"
                defaultValue="ALI BAHI ppams"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 font-bold tracking-widest pl-1">***</span>
              </div>
              <input 
                type="password" 
                className="w-full pl-12 pr-10 py-3 rounded-full bg-white/90 border-0 focus:ring-2 focus:ring-orange-500 text-black font-medium placeholder-gray-500 shadow-inner transition-all" 
                placeholder="Password"
                defaultValue="password123"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-orange-500 text-gray-600 transition-colors">
                <Eye className="h-5 w-5" />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              LOGIN NOW
            </button>

            {/* Register Button */}
            <button
              type="button"
              className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] opacity-90"
            >
              REGISTER NOW
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <a href="#" className="text-blue-300 hover:text-blue-200 text-xs font-medium underline transition-colors">
                Forgot/Reset Password
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 text-center w-full z-10 space-y-1">
        <p className="text-gray-400 text-xs">© {new Date().getFullYear()} Prodigysurge All Rights Reserved</p>
        <p className="text-orange-500 font-bold text-lg tracking-wide uppercase drop-shadow-md">
          Powered by <span className="text-white">EPIC PRO REPORT</span>
        </p>
      </div>
    </div>
  );
}

