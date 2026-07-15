import { ExternalLink } from 'lucide-react';
import { ContentWrapper, PageHeader } from '@/layouts';
import { Card, Button, PageTransition } from '@/components';

export function FAQGuide() {
  return (
    <PageTransition>
      <ContentWrapper className="max-w-full">
        <PageHeader 
          title="FAQ & Guide" 
          description="Access the M2 Software Training FAQ and the Step-By-Step Guide directly from your dashboard."
        />

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Box 1: FAQ PDF */}
          <Card className="p-6 bg-surface border-border shadow-sm rounded-2xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-foreground">M2 Software Training FAQ</h3>
              <Button 
                variant="outline" 
                className="bg-white text-xs h-8" 
                onClick={() => window.open('https://www.m2phenom.com/documents/M2-Software-Training-FAQ-CORRECT-2.pdf', '_blank')}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-2" /> Open in New Tab
              </Button>
            </div>
            <div className="relative w-full h-[700px] bg-surface-50 rounded-xl overflow-hidden border border-border">
              <iframe 
                src="https://www.m2phenom.com/documents/M2-Software-Training-FAQ-CORRECT-2.pdf" 
                className="w-full h-full border-0"
                title="FAQ PDF"
              />
            </div>
          </Card>

          {/* Box 2: Step-By-Step Guide PDF */}
          <Card className="p-6 bg-surface border-border shadow-sm rounded-2xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-foreground">Step-By-Step Guide</h3>
              <Button 
                variant="outline" 
                className="bg-white text-xs h-8" 
                onClick={() => window.open('https://assets.cdn.filesafe.space/BIjwHiI2hEcUooSIN7zB/media/6a49805e86d5ca1862b9b565.pdf', '_blank')}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-2" /> Open in New Tab
              </Button>
            </div>
            <div className="relative w-full h-[700px] bg-surface-50 rounded-xl overflow-hidden border border-border">
              <iframe 
                src="https://assets.cdn.filesafe.space/BIjwHiI2hEcUooSIN7zB/media/6a49805e86d5ca1862b9b565.pdf" 
                className="w-full h-full border-0"
                title="Step-By-Step Guide PDF"
              />
            </div>
          </Card>
        </div>
      </ContentWrapper>
    </PageTransition>
  );
}