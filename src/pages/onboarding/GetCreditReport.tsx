import { ContentWrapper, PageHeader } from '@/layouts';
import { Card, PageTransition } from '@/components';

export function GetCreditReport() {
  return (
    <PageTransition>
      <ContentWrapper className="w-full">
        <PageHeader 
          title="Get Credit Report" 
          description="Learn how to obtain your credit report to start the process."
        />

        <div className="mt-8 w-full">
          <Card className="p-6 bg-surface border-border shadow-sm rounded-2xl overflow-hidden flex flex-col w-full">
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/oPlERlIb3gk?si=C9zyQ6mGUGvCB66K" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </Card>
        </div>
      </ContentWrapper>
    </PageTransition>
  );
}