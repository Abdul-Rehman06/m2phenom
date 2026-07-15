import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary-500 selection:text-white">
        {/* Sidebar Component handles its own responsive/animation logic */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 relative">
          <TopNavbar />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50 relative">
            {/* Optional Grain Overlay globally for content */}
            <div className="absolute inset-0 pointer-events-none film-grain" aria-hidden="true" />
            
            {/* The page content is injected here */}
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
