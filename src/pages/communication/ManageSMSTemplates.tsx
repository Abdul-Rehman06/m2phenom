import { Search, RefreshCw, Edit2, Plus } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Input, Button, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';

const MOCK_TEMPLATES = [
  { id: 1, title: 'new template', date: 'January-03-2026' },
  { id: 2, title: 'test message', date: 'November-05-2025' },
  { id: 3, title: 'test 6', date: 'November-01-2025' },
  { id: 4, title: 'test 5', date: 'October-29-2025' },
  { id: 5, title: 'test 3', date: 'October-25-2025' },
  { id: 6, title: 'test2', date: 'October-22-2025' },
  { id: 7, title: 'test', date: 'October-22-2025' },
  { id: 8, title: 'sms template', date: 'October-15-2025' },
];

export function ManageSMSTemplates() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          <div className="mb-6 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Sms Templates</h1>
          </div>

          <Card className="border-border shadow-sm bg-white overflow-hidden flex flex-col w-full">
            {/* Toolbar */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              <div className="flex-1 flex items-center gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search Template" 
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

              <Button className="bg-[#e86a16] hover:bg-[#d45d13] text-white font-bold px-4 h-10 shadow-sm shrink-0">
                <Plus className="w-4 h-4 mr-2" /> Add Template
              </Button>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-6 py-3 font-bold text-gray-900 text-xs w-16">#</th>
                    <th className="px-6 py-3 font-bold text-gray-900 text-xs">Title</th>
                    <th className="px-6 py-3 font-bold text-gray-900 text-xs">Created Date</th>
                    <th className="px-6 py-3 font-bold text-gray-900 text-xs text-right">Action(s)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_TEMPLATES.map((tpl) => (
                    <tr key={tpl.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs text-gray-500">{tpl.id}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">{tpl.title}</td>
                      <td className="px-6 py-4 text-xs text-gray-600">{tpl.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="w-7 h-7 rounded bg-[#e86a16] text-white flex items-center justify-center ml-auto hover:bg-[#d45d13] transition-colors shadow-sm">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
