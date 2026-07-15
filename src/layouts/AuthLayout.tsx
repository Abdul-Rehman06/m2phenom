import { Outlet } from 'react-router-dom';
import { Shield, Headphones } from 'lucide-react';
import { APP_CONFIG } from '@/constants';

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* LEFT SIDE (Light) */}
      <div className="w-full lg:w-1/2 relative flex flex-col p-8 lg:p-12 overflow-hidden bg-white border-r border-border">
        {/* Faint Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <img src={APP_CONFIG.logoUrl} alt="watermark" className="w-[800px] h-[800px] object-contain grayscale" />
        </div>
        
        {/* Header Logo */}
        <div className="relative z-10 flex items-center mb-auto">
          <img src={APP_CONFIG.logoUrl} alt="M2 Phenom" className="h-8 object-contain" />
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto py-12">
          <img src={APP_CONFIG.logoUrl} alt="Gorilla Logo" className="w-64 h-64 object-contain mb-8 drop-shadow-2xl" />
          <h1 className="text-3xl font-black text-[#111827] uppercase tracking-wide leading-tight">
            Original Metro 2<br />
            <span className="text-primary-500">Compliance Method</span>
          </h1>
          <div className="w-12 h-1 bg-primary-500 my-6 rounded-full mx-auto" />
          <p className="text-[#4b5563] text-sm font-medium">
            The industry's easiest, most efficient compliance-based<br/>credit enhancement software system.
          </p>
        </div>

        {/* Footer Links */}
        <div className="relative z-10 flex flex-wrap gap-4 text-xs font-medium text-[#6b7280] mt-auto justify-center lg:justify-start">
          <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary-500 transition-colors">Blog</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary-500 transition-colors">Terms & Conditions</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary-500 transition-colors">Get Copy Of Credit Report</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-primary-500 transition-colors">Pricing</a>
        </div>
      </div>

      {/* RIGHT SIDE (Dark) */}
      <div className="w-full lg:w-1/2 flex flex-col bg-[#0b0f19] text-white relative items-center justify-center">
        {/* Top Header Icons */}
        <div className="flex justify-end gap-6 p-6 lg:p-8 text-xs font-medium text-gray-400">
          <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            <Shield className="w-4 h-4 text-primary-500" />
            Secure & Encrypted
          </div>
          <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            <Headphones className="w-4 h-4" />
            Support
          </div>
        </div>

        {/* Main Auth Content (Login Form) */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
          <div className="w-full flex justify-center mt-[-10vh]">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 lg:p-8 text-right text-xs text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} <span className="text-primary-500">M2 Phenom</span>. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
