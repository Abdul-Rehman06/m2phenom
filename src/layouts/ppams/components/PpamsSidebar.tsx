import { NavLink } from 'react-router-dom';
import { Home, Zap, ChevronLeft } from 'lucide-react';
import { ROUTES } from '@/constants';

const NAV_ITEMS = [
  { title: 'Dashboard', icon: Home, path: ROUTES.PPAMS.DASHBOARD },
  { title: 'PPAMS', icon: Zap, path: ROUTES.PPAMS.AREA },
];

export function PpamsSidebar() {
  return (
    <aside className="w-[260px] shrink-0 border-r border-slate-700 bg-slate-900 flex flex-col justify-between h-full z-20 shadow-2xl">
      <div>
        {/* Profile Section */}
        <div className="flex flex-col items-center py-8 border-b border-slate-800">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 shadow-lg overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Ali+Badi&background=1e293b&color=cbd5e1&size=128" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
          <h2 className="mt-3 text-[13px] font-bold text-white tracking-tight">ALI_BADI_ppams</h2>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Administrator</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)] translate-x-1'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                }`
              }
            >
              <item.icon className={`w-5 h-5 ${item.title === 'PPAMS' ? 'fill-current' : ''}`} strokeWidth={2} />
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
            <img src="https://ui-avatars.com/api/?name=Epic+Pro&background=1e293b&color=f97316&size=64" alt="Epic Pro" className="w-6 h-6 rounded-full" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
              Epic Pro Report <span className="w-1.5 h-1.5 inline-block bg-orange-500 rounded-full shadow-[0_0_5px_rgba(249,115,22,0.8)]"></span>
            </p>
            <p className="text-[9px] text-slate-500 font-medium tracking-wide">v2.4.0</p>
          </div>
        </div>
        <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}