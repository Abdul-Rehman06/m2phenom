import { Menu, Bell, Mail, ChevronDown, LogOut } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { Dropdown } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';

export function TopNavbar() {
  const { toggleCollapse, toggleMobile } = useSidebar();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { openConfirmDialog, addToast } = useUIStore();

  return (
    <header className="sticky top-0 z-sticky h-20 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 lg:px-10 flex items-center justify-between transition-all shadow-sm">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile Trigger */}
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2.5 -ml-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 transition-all shadow-sm"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-2.5 -ml-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 transition-all shadow-sm"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right side - Stats & Profile */}
      <div className="flex items-center gap-6">
        
        {/* User Info (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-1.5 text-sm font-bold text-gray-900">
          Hi {user?.firstName || 'User'}, <span className="text-gray-500 font-medium">{user?.email || ''}</span>
        </div>

        {/* General Attacks */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          General Attacks Remaining
          <span className="bg-primary-50 text-primary-600 border border-primary-100 px-2 py-0.5 rounded-md font-extrabold">873</span>
        </div>

        {/* Credits */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          System Text/Email Credits
          <button className="text-blue-600 hover:text-blue-700 font-extrabold transition-colors uppercase tracking-wider text-[10px]">+Add</button>
        </div>

        <div className="h-8 w-px bg-gray-200 mx-2 hidden lg:block" />

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 transition-all shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-white" />
          </button>
          
          <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 transition-all shadow-sm">
            <Mail className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Dropdown Trigger */}
        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-ring rounded-full pl-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
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
                    navigate('/auth/login');
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
