import { useState } from 'react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';

export function SupportTicket() {
  const [selectedIssue, setSelectedIssue] = useState<string>('');

  const issues = [
    'Account Password Reset',
    'Account Info Issue',
    'Uploading My Credit Report',
    'Payment Subscription Assistance',
    'Generate Letters',
    'PPAMs Mailing Service'
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <Card className="border-border shadow-md bg-white p-8 w-full flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 mb-6">What Do You Need Help With Today? *</h1>

            <div className="flex flex-col gap-4 mb-8">
              {issues.map((issue) => (
                <label key={issue} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="issueType"
                      value={issue}
                      checked={selectedIssue === issue}
                      onChange={() => setSelectedIssue(issue)}
                      className="peer w-4 h-4 appearance-none rounded-full border border-gray-300 checked:border-gray-900 checked:border-[4px] transition-all cursor-pointer bg-white"
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{issue}</span>
                </label>
              ))}
            </div>

            <div>
              <Button 
                className="bg-black hover:bg-gray-800 text-white font-bold px-8 h-10 shadow-sm"
                disabled={!selectedIssue}
              >
                OK
              </Button>
            </div>
          </Card>
          
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
