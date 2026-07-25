import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp,
  MonitorPlay,
  Video,
  Mail,
  GraduationCap,
  MessageSquare,
  Globe
} from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, PageTransition } from '@/components';
import { ROUTES } from '@/constants';

// Custom Youtube Icon
const YoutubeIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

// Custom Instagram Icon
const InstagramIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// We map a custom 'Facebook' icon since lucide-react might not export 'Facebook' in older versions
const FacebookIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const clickSources = [
  { name: 'Youtube', slug: 'youtube', clicks: 0, icon: YoutubeIcon, color: 'text-red-600', bg: 'bg-red-50' },
  { name: 'Facebook', slug: 'facebook', clicks: 0, icon: FacebookIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Instagram', slug: 'instagram', clicks: 0, icon: InstagramIcon, color: 'text-pink-600', bg: 'bg-pink-50' },
  { name: 'Facebook Ads', slug: 'facebook-ads', clicks: 0, icon: MonitorPlay, color: 'text-blue-700', bg: 'bg-blue-50' },
  { name: 'Zoom', slug: 'zoom', clicks: 0, icon: Video, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Email', slug: 'email', clicks: 0, icon: Mail, color: 'text-gray-600', bg: 'bg-gray-50' },
  { name: 'Skool', slug: 'skool', clicks: 0, icon: GraduationCap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { name: 'SMS Campaigns', slug: 'sms-campaigns', clicks: 0, icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50' },
  { name: 'Web', slug: 'web', clicks: 0, icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

export function ClickDetails() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <ContentWrapper>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" strokeWidth={3} />
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Click Details</h1>
        </div>

        {/* Grid of Sources */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {clickSources.map((source) => (
            <Card 
              key={source.name} 
              onClick={() => navigate(ROUTES.AFFILIATE_PLATFORM_CLICKS.replace(':platform', source.slug))}
              className="p-6 bg-white border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">{source.name}</h3>
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${source.bg} flex items-center justify-center ${source.color} shrink-0`}>
                  <source.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900 leading-none mb-1">{source.clicks}</div>
                  <div className="text-sm font-bold text-success-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Total Clicks
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ContentWrapper>
    </PageTransition>
  );
}
