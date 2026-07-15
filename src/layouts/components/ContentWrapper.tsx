import { cn } from '@/utils';

interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContentWrapper({ children, className, ...props }: ContentWrapperProps) {
  return (
    <div 
      className={cn('w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 animate-fade-in', className)} 
      {...props}
    >
      {children}
    </div>
  );
}
