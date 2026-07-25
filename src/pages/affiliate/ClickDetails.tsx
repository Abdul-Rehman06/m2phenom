import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, PageTransition } from '@/components';

const clickSources = [
  { name: 'Youtube', clicks: 0 },
  { name: 'Facebook', clicks: 0 },
  { name: 'Instagram', clicks: 0 },
  { name: 'Facebook Ads', clicks: 0 },
  { name: 'Zoom', clicks: 0 },
  { name: 'Email', clicks: 0 },
  { name: 'Skool', clicks: 0 },
  { name: 'SMS Campaigns', clicks: 0 },
  { name: 'Web', clicks: 0 },
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
            <Card key={source.name} className="p-6 bg-white border-border shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-6">{source.name}</h3>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                  <TrendingUp className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900 leading-none mb-1">{source.clicks}</div>
                  <div className="text-sm font-bold text-success-600">Total Clicks</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ContentWrapper>
    </PageTransition>
  );
}
