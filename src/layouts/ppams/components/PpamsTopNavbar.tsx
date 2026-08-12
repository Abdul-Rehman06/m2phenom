import { Menu, Search, Bell, Settings, Zap } from 'lucide-react';

export function PpamsTopNavbar() {
  return (
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
      
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-10 h-10">
            <Settings className="w-9 h-9 text-slate-400 absolute" strokeWidth={1.5} />
            <Zap className="w-4 h-4 text-orange-500 relative z-10 fill-orange-500" strokeWidth={1} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">
              ProdigySurge
            </h1>
            <p className="text-[7px] font-bold text-slate-400 tracking-wider leading-none mt-1">
              ORIGINAL METRO 2 COMPLIANCE METHOD<br/>
              POWERED BY EPIC PRO REPORT
            </p>
          </div>
        </div>
      </div>

      {/* Center Search */}
      <div className="flex-1 max-w-xl px-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search orders, clients, letters..." 
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">⌘K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
            12
          </span>
        </button>
        
        <div className="relative w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer">
          <img src="https://ui-avatars.com/api/?name=Ali+Badi&background=cbd5e1&color=64748b" alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
      </div>

    </header>
  );
}