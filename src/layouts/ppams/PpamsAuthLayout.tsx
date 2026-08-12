import { Outlet } from 'react-router-dom';
import { LiquidBackground } from '@/components/LiquidBackground';

export function PpamsAuthLayout() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-50">
      <LiquidBackground />

      {/* Absolute positioning ensures this wrapper covers the whole screen, allowing perfect flex centering */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

