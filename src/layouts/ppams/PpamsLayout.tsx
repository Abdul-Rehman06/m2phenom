import { NavLink, Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ROUTES } from '@/constants';

export function PpamsLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary-500 selection:text-white">
        <aside className="w-64 shrink-0 border-r border-border bg-surface-50">
          <div className="h-16 flex items-center px-5 border-b border-border font-black tracking-wide">
            ProdigySurge
          </div>
          <nav className="p-3 space-y-1">
            <NavLink
              to={ROUTES.PPAMS.DASHBOARD}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-500 text-white' : 'text-foreground hover:bg-surface-100'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </aside>

        <div className="flex flex-col flex-1 min-w-0">
          <header className="h-16 border-b border-border bg-background flex items-center px-5">
            <div className="font-semibold">PPAMS Portal</div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

