import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ClientSidebar } from './components/ClientSidebar';
import { ClientTopNavbar } from './components/ClientTopNavbar';

export function ClientLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary-500 selection:text-white">
        <ClientSidebar />
        
        <div className="flex flex-col flex-1 min-w-0 relative">
          <ClientTopNavbar />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50 relative">
            <div className="absolute inset-0 pointer-events-none film-grain" aria-hidden="true" />
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
