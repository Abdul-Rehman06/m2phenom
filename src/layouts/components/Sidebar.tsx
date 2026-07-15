import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { SIDEBAR_NAV, type NavItem } from '@/constants/navigation';
import { APP_CONFIG } from '@/constants';
import { cn } from '@/utils';

export function Sidebar() {
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 z-modal-backdrop bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (window.innerWidth < 1024 ? -300 : 0)
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-modal flex flex-col h-full bg-white border-r border-gray-200 text-gray-900",
          "shadow-[4px_0_24px_rgba(0,0,0,0.02)] lg:shadow-none"
        )}
      >
        {/* Header / Logo */}
        <div className="flex items-center h-20 px-6 shrink-0 border-b border-gray-100 relative">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <img src={APP_CONFIG.logoUrl} alt={APP_CONFIG.name} className="w-6 h-6 object-contain brightness-0 invert" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                >
                  {APP_CONFIG.name}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={closeMobile}
            className="absolute right-4 lg:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search..."
              className={cn(
                "w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 font-medium",
                "focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white transition-all shadow-sm",
                isCollapsed && "px-0 text-transparent placeholder:text-transparent cursor-pointer"
              )}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-1.5 custom-scrollbar">
          {SIDEBAR_NAV.map((item, index) => (
            <SidebarItem key={index} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>

        {/* Footer Profile */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
           <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
             <div className="w-10 h-10 rounded-full bg-brand-gradient shrink-0 border-2 border-white shadow-sm" />
             {!isCollapsed && (
               <div className="flex flex-col min-w-0">
                 <span className="text-sm font-bold text-gray-900 truncate">Admin User</span>
                 <span className="text-xs font-medium text-gray-500 truncate">admin@m2phenom.com</span>
               </div>
             )}
           </div>
        </div>
      </motion.aside>
    </>
  );
}

function SidebarItem({ item, isCollapsed, depth = 0 }: { item: NavItem; isCollapsed: boolean; depth?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const Icon = item.icon;

  const isActive = item.path 
    ? location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
    : item.children?.some(child => location.pathname === child.path);

  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center w-full rounded-xl py-2.5 text-sm font-bold transition-all group",
            isCollapsed ? "justify-center px-0" : "px-3",
            isActive 
              ? "bg-primary-50 text-primary-600 shadow-sm border border-primary-100/50" 
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
          )}
          style={{ paddingLeft: !isCollapsed && depth > 0 ? `${(depth + 1) * 0.75}rem` : undefined }}
        >
          {Icon && <Icon className={cn("w-5 h-5 shrink-0 transition-colors", !isCollapsed && "mr-3", isActive ? "text-primary-500" : "text-gray-400 group-hover:text-gray-600")} />}
          
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.title}</span>
              <ChevronDown 
                className={cn("w-4 h-4 transition-transform duration-200 text-gray-400 group-hover:text-gray-600", isOpen && "rotate-180", isActive && "text-primary-500")} 
              />
            </>
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-1 pb-1 space-y-1">
                {item.children!.map((child, idx) => (
                  <SidebarItem key={idx} item={child} isCollapsed={isCollapsed} depth={depth + 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (item.isExternal && item.path) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center rounded-xl py-2.5 text-sm font-bold transition-all group relative",
          isCollapsed ? "justify-center px-0" : "px-3",
          "text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
        )}
        style={{ paddingLeft: !isCollapsed && depth > 0 ? `${(depth + 1) * 0.75}rem` : undefined }}
      >
        {Icon && <Icon className={cn("w-5 h-5 shrink-0 transition-colors text-gray-400 group-hover:text-gray-600", !isCollapsed && "mr-3")} />}
        {!isCollapsed && <span className="flex-1 truncate">{item.title}</span>}
        {item.badge && (
          <span className={cn(
            "flex items-center justify-center bg-primary-500 text-white font-bold rounded-full shadow-sm",
            isCollapsed ? "absolute top-1 right-1 w-4 h-4 text-[10px]" : "ml-auto px-2 py-0.5 text-[10px] uppercase tracking-wide"
          )}>{item.badge}</span>
        )}
      </a>
    );
  }

  return (
    <NavLink
      to={item.path || '#'}
      className={({ isActive: isLinkActive }) => cn(
        "flex items-center rounded-xl py-2.5 text-sm font-bold transition-all group relative",
        isCollapsed ? "justify-center px-0" : "px-3",
        isLinkActive || isActive 
          ? "bg-primary-50 text-primary-600 shadow-sm border border-primary-100/50" 
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
      )}
      style={{ paddingLeft: !isCollapsed && depth > 0 ? `${(depth + 1) * 0.75}rem` : undefined }}
    >
      {({ isActive: isLinkActive }) => (
        <>
          {/* Active Indicator Line */}
          {(isLinkActive || isActive) && isCollapsed && (
            <motion.div 
              layoutId="activeIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full"
            />
          )}

          {Icon && <Icon className={cn("w-5 h-5 shrink-0 transition-colors", !isCollapsed && "mr-3", isLinkActive || isActive ? "text-primary-500" : "text-gray-400 group-hover:text-gray-600")} />}
          
          {!isCollapsed && (
            <span className="flex-1 truncate">{item.title}</span>
          )}

          {/* Badge */}
          {item.badge && (
            <span className={cn(
              "flex items-center justify-center bg-primary-500 text-white font-bold rounded-full shadow-sm",
              isCollapsed ? "absolute top-1 right-1 w-4 h-4 text-[10px]" : "ml-auto px-2 py-0.5 text-[10px] uppercase tracking-wide"
            )}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
