import { Outlet } from 'react-router-dom';
import { LiquidBackground } from '@/components/LiquidBackground';

export function PpamsAuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50">
      <LiquidBackground />

      <div className="w-full h-full relative z-10 pointer-events-auto flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

