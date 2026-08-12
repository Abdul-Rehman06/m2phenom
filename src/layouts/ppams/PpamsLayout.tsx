import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { PpamsSidebar } from './components/PpamsSidebar';
import { PpamsTopNavbar } from './components/PpamsTopNavbar';
import { ROUTES } from '@/constants';

export function PpamsLayout() {
  const location = useLocation();

  // If user is exactly on /ppams, we can redirect them to dashboard
  if (location.pathname === '/ppams' || location.pathname === '/ppams/') {
    return <Navigate to={ROUTES.PPAMS.DASHBOARD} replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden text-slate-800 font-sans bg-slate-50">
        <PpamsSidebar />
        
        <div className="flex flex-col flex-1 min-w-0 relative">
          <PpamsTopNavbar />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto relative p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

