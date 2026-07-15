import { ContentWrapper, PageHeader } from '@/layouts';
import { Card, PageTransition } from '@/components';

export function UploadCreditReport() {
  return (
    <PageTransition>
      <ContentWrapper className="w-full">
        <PageHeader 
          title="Upload Credit Report" 
          description="Watch this video to learn how to properly upload your credit report to the platform."
        />

        <div className="mt-8 w-full">
          <Card className="p-6 bg-surface border-border shadow-sm rounded-2xl overflow-hidden flex flex-col w-full">
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/j1YoRhQQ99o?si=UrUPlJsCLRuiAHL_" 
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