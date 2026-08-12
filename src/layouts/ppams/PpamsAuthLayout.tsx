import { Outlet } from 'react-router-dom';

export function PpamsAuthLayout() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://prodigysurge.com/images/bg05.png?var=1.2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional dark overlay to ensure text/form readability if needed */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Floating Badges */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left - Rodney */}
        <div className="absolute top-12 left-8 md:left-16 xl:left-32 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[3px] border-amber-400 overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.3)] bg-white">
            <img 
              src="https://prodigysurge.com/images/rodney.png" 
              alt="Rodney Eugene Peak" 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Rodney+Peak&background=000&color=fff&size=256"; }}
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-signature text-3xl md:text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Rodney Eugene Peak</h3>
            <p className="text-white font-bold text-sm md:text-base tracking-widest uppercase mt-1 drop-shadow-md">(MR. METRO2)</p>
          </div>
        </div>

        {/* Top Right - Dion */}
        <div className="absolute top-12 right-8 md:right-16 xl:right-32 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[3px] border-amber-400 overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.3)] bg-white">
            <img 
              src="https://prodigysurge.com/images/dion.png" 
              alt="Dion Coopwood" 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Dion+Coopwood&background=000&color=fff&size=256"; }}
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-signature text-3xl md:text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Dion Coopwood</h3>
            <p className="text-white font-bold text-sm md:text-base tracking-widest uppercase mt-1 drop-shadow-md">(MR. PHENOMENAL)</p>
          </div>
        </div>

        {/* Bottom Left - Epic Pro Report */}
        <div className="absolute bottom-24 left-8 md:left-24 xl:left-40 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-[3px] border-amber-400 overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.3)] bg-white flex items-center justify-center p-2">
            <img 
              src="https://prodigysurge.com/images/epic_pro_logo.png" 
              alt="Epic Pro Report" 
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Epic+Pro&background=000&color=fff&size=256"; }}
            />
          </div>
        </div>

        {/* Bottom Right - M2 Phenom */}
        <div className="absolute bottom-24 right-8 md:right-24 xl:right-40 flex flex-col items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-[3px] border-amber-400 overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.3)] bg-white flex items-center justify-center p-2">
            <img 
              src="https://prodigysurge.com/images/m2phenom_logo.png" 
              alt="M2 Phenom" 
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=M2+Phenom&background=000&color=fff&size=256"; }}
            />
          </div>
          <div className="mt-4 text-center max-w-[150px]">
            <p className="text-white font-bold text-[10px] tracking-widest uppercase drop-shadow-md leading-tight">A M2PHENOM AFFILIATED SOFTWARE</p>
          </div>
        </div>
      </div>

      <div className="w-full h-full relative z-10 pointer-events-auto">
        <Outlet />
      </div>
    </div>
  );
}

