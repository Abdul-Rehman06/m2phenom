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
          "fixed lg:static inset-y-0 left-0 z-modal flex flex-col h-full bg-sidebar border-r border-white/10 text-sidebar-foreground",
          "shadow-xl lg:shadow-none"
        )}
      >
        {/* Header / Logo */}
        <div className="flex items-center h-16 px-4 shrink-0 border-b border-white/10 relative">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <img src={APP_CONFIG.logoUrl} alt={APP_CONFIG.name} className="w-8 h-8 shrink-0 object-contain" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-lg tracking-tight"
                >
                  {APP_CONFIG.name}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={closeMobile}
            className="absolute right-4 lg:hidden p-1 rounded-md hover:bg-white/10 text-surface-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 group-hover:text-white transition-colors" />
            <input 
              type="text"
              placeholder="Search..."
              className={cn(
                "w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all",
                isCollapsed && "px-0 text-transparent placeholder:text-transparent cursor-pointer"
              )}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
          {SIDEBAR_NAV.map((item, index) => (
            <SidebarItem key={index} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>

        {/* Footer Profile (Optional integration point) */}
        <div className="p-4 border-t border-white/10">
           <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
             <div className="w-8 h-8 rounded-full bg-brand-gradient shrink-0" />
             {!isCollapsed && (
               <div className="flex flex-col min-w-0">
                 <span className="text-sm font-medium truncate">Admin User</span>
                 <span className="text-xs text-surface-400 truncate">admin@m2phenom.com</span>
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
            "flex items-center w-full rounded-lg py-2 text-sm font-medium transition-all group",
            isCollapsed ? "justify-center px-0" : "px-3",
            isActive ? "bg-white/10 text-white" : "text-surface-300 hover:bg-white/5 hover:text-white"
          )}
          style={{ paddingLeft: !isCollapsed && depth > 0 ? `${(depth + 1) * 0.75}rem` : undefined }}
        >
          {Icon && <Icon className={cn("w-5 h-5 shrink-0", !isCollapsed && "mr-3", isActive && "text-primary-500")} />}
          
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.title}</span>
              <ChevronDown 
                className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} 
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
          "flex items-center rounded-lg py-2 text-sm font-medium transition-all group relative",
          isCollapsed ? "justify-center px-0" : "px-3",
          "text-surface-300 hover:bg-white/5 hover:text-white"
        )}
        style={{ paddingLeft: !isCollapsed && depth > 0 ? `${(depth + 1) * 0.75}rem` : undefined }}
      >
        {Icon && <Icon className={cn("w-5 h-5 shrink-0", !isCollapsed && "mr-3")} />}
        {!isCollapsed && <span className="flex-1 truncate">{item.title}</span>}
        {item.badge && (
          <span className={cn(
            "flex items-center justify-center bg-primary-500 text-white font-bold rounded-full",
            isCollapsed ? "absolute top-1 right-1 w-4 h-4 text-[10px]" : "ml-auto px-2 py-0.5 text-xs"
          )}>{item.badge}</span>
        )}
      </a>
    );
  }

  return (
    <NavLink
      to={item.path || '#'}
      className={({ isActive: isLinkActive }) => cn(
        "flex items-center rounded-lg py-2 text-sm font-medium transition-all group relative",
        isCollapsed ? "justify-center px-0" : "px-3",
        isLinkActive || isActive ? "bg-primary-500/10 text-primary-500" : "text-surface-300 hover:bg-white/5 hover:text-white"
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

          {Icon && <Icon className={cn("w-5 h-5 shrink-0", !isCollapsed && "mr-3")} />}
          
          {!isCollapsed && (
            <span className="flex-1 truncate">{item.title}</span>
          )}

          {/* Badge */}
          {item.badge && (
            <span className={cn(
              "flex items-center justify-center bg-primary-500 text-white font-bold rounded-full",
              isCollapsed ? "absolute top-1 right-1 w-4 h-4 text-[10px]" : "ml-auto px-2 py-0.5 text-xs"
            )}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
