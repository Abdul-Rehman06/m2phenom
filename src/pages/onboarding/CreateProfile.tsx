import { ContentWrapper, PageHeader } from '@/layouts';
import { Card, PageTransition } from '@/components';

export function CreateProfile() {
  return (
    <PageTransition>
      <ContentWrapper className="w-full">
        <PageHeader 
          title="Create Profile" 
          description="Set up your profile to personalize your experience."
        />

        <div className="mt-8 w-full">
          <Card className="p-6 bg-surface border-border shadow-sm rounded-2xl overflow-hidden flex flex-col w-full">
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/LvmG88_4o04?si=p94R4zV5fMv1Fes1" 
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