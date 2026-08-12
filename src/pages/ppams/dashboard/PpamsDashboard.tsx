import { ContentWrapper, PageHeader } from '@/layouts';
import { PageTransition } from '@/components';

export function PpamsDashboard() {
  return (
    <PageTransition>
      <ContentWrapper>
        <PageHeader title="PPAMS Dashboard" description="Backend portal UI scaffolding. Screens will be built from your screenshots." />
        <div className="card-base p-6">
          <div className="text-sm text-surface-500">
            Next step: send the login / sidebar / dashboard screenshots and I’ll build the exact UI here.
          </div>
        </div>
      </ContentWrapper>
    </PageTransition>
  );
}

