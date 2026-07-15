import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTE_NAMES } from '@/constants';
import { cn } from '@/utils';
import React from 'react';

export function Breadcrumb({ className }: { className?: string }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="Breadcrumb" className={cn('hidden md:flex items-center space-x-1 text-sm text-surface-500', className)}>
      <Link
        to="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        
        // Lookup title from ROUTE_NAMES map, fallback to capitalized segment if missing
        const title = ROUTE_NAMES[to] || (value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' '));

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            {isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {title}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-foreground transition-colors"
              >
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
