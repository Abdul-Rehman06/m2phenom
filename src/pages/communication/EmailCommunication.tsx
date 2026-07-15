import { Search, RefreshCw } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Input, Checkbox, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';

export function EmailCommunication() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          <div className="mb-6 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Email Communication History</h1>
          </div>

          <Card className="border-border shadow-sm bg-white overflow-hidden flex flex-col w-full">
            {/* Toolbar */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 w-full">
              <div className="flex-1 flex items-center gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search Clients" 
                    className="bg-white pl-3 pr-10 text-sm h-10 w-full"
                  />
                  <div className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center border-l border-border bg-gray-50 rounded-r-lg">
                    <Search className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 shrink-0">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs w-10">
                      <Checkbox />
                    </th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Full Name <span className="text-[10px]">▼</span></th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Email</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Content</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Date Added <span className="text-[10px]">▼</span></th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs text-right">Action(s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                      No Record Found!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
