import { APP_CONFIG } from '@/constants';
import { Spinner } from './Spinner';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-modal flex flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        <img src={APP_CONFIG.logoUrl} alt={APP_CONFIG.name} className="h-12 object-contain mb-8 animate-pulse-slow drop-shadow-md" />
        <Spinner size="lg" className="text-primary-500" />
      </div>
    </div>
  );
}
