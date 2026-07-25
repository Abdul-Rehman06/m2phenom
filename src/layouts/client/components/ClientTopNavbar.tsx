import { Menu, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { Dropdown } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';

export function ClientTopNavbar() {
  const { toggleCollapse, toggleMobile } = useSidebar();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { openConfirmDialog, addToast } = useUIStore();

  return (
    <header className="sticky top-0 z-sticky h-16 w-full bg-surface border-b border-border px-4 md:px-6 flex items-center justify-between transition-all shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-surface-100 text-surface-500 hover:text-foreground transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-2 -ml-2 rounded-md hover:bg-surface-100 text-surface-500 hover:text-foreground transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-foreground">
          Hi {user?.firstName || 'Client'}, <span className="text-surface-500 font-normal">{user?.email || ''}</span>
        </div>

        <div className="h-6 w-px bg-border mx-1 hidden lg:block" />

        <div className="flex items-center gap-1">
          <button className="relative p-2 rounded-full hover:bg-surface-100 text-surface-400 hover:text-surface-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary-500 rounded-full border-2 border-surface" />
          </button>
        </div>

        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-ring rounded-full pl-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Client&background=0D8ABC&color=fff" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <ChevronDown className="w-4 h-4 text-surface-400 hidden md:block" />
            </button>
          }
          items={[
            {
              id: 'logout',
              label: 'Logout',
              icon: <LogOut className="w-4 h-4" />,
              danger: true,
              onClick: () => {
                openConfirmDialog({
                  title: 'Logout',
                  description: 'Are you sure you want to log out?',
                  confirmText: 'Logout',
                  variant: 'danger',
                  onConfirm: () => {
                    logout();
                    addToast({ title: 'Logged out successfully.', variant: 'success' });
                    navigate('/client/auth/login');
                  },
                });
              },
            },
          ]}
        />
      </div>
    </header>
  );
}
