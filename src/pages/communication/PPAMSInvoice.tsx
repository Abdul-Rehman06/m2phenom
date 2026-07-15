import { Search, RefreshCw, FileText } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Input, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';
import { cn } from '@/utils';

const MOCK_INVOICES = [
  { id: 1, client: 'Caron Elizabeth Sample', date: 'December-06-2025', hasInvoice: true, files: 24, status: 'PROCESSING CURRENTLY PAUSED', statusDate: 'Dec 06, 2025 - 12:40pm est', items: 94 },
  { id: 2, client: 'Caron Elizabeth Sample', date: 'January-03-2026', hasInvoice: true, files: 73, status: 'PRINTED and MAILED', statusDate: 'Jan 05, 2026 - 5:40am est', items: 94 },
  { id: 3, client: 'Caron Elizabeth Sample', date: 'November-05-2025', hasInvoice: true, files: 3, status: 'PROCESSING CURRENTLY PAUSED', statusDate: 'Nov 05, 2025 - 9:02am est', items: 94 },
  { id: 4, client: 'Caron Elizabeth Sample', date: 'December-12-2025', hasInvoice: false, files: 9, status: 'Waiting for Processing', statusDate: '', items: 54 },
  { id: 5, client: 'Caron Elizabeth Sample', date: 'March-10-2026', hasInvoice: false, files: 15, status: 'Waiting for Processing', statusDate: '', items: 94 },
  { id: 6, client: 'Caron Elizabeth Sample', date: 'December-13-2025', hasInvoice: false, files: 3, status: 'PRINTED and MAILED', statusDate: 'Dec 13, 2025 - 12:30pm est', items: 94 },
  { id: 7, client: 'Caron Elizabeth Sample', date: 'November-21-2025', hasInvoice: false, files: 3, status: 'Waiting for Processing', statusDate: '', items: 94 },
  { id: 8, client: 'Caron Elizabeth Sample', date: 'November-10-2025', hasInvoice: false, files: 3, status: 'PROCESSING CURRENTLY PAUSED', statusDate: 'Nov 10, 2025 - 4:00am est', items: 94 },
];

export function PPAMSInvoice() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          <div className="mb-6 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">PPAMS Invoices</h1>
          </div>

          <Card className="border-border shadow-sm bg-white overflow-hidden flex flex-col w-full">
            {/* Toolbar */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 w-full">
              <div className="flex-1 flex items-center gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search A Client" 
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

              {/* Pagination Mock */}
              <div className="flex items-center gap-1 mx-auto sm:mx-0">
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400">&lt;</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-900 bg-gray-900 text-white rounded font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-700 rounded font-bold">2</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-700">&gt;</button>
              </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs w-10">#</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Client(s)</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Created Date</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Invoice</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Number of Files</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">PPAMS Status</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs">Items Attacked</th>
                    <th className="px-4 py-3 font-bold text-gray-900 text-xs text-right">Action(s)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_INVOICES.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 text-xs text-gray-500">{inv.id}</td>
                      <td className="px-4 py-4 text-xs font-medium text-gray-900">{inv.client}</td>
                      <td className="px-4 py-4 text-xs text-gray-600">{inv.date}</td>
                      <td className="px-4 py-4 text-xs">
                        {inv.hasInvoice ? (
                          <button className="font-bold text-gray-900 hover:underline">Download PPAMS Invoice</button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600">{inv.files}</td>
                      <td className="px-4 py-4 text-xs">
                        <div className="flex flex-col">
                          <span className={cn("font-medium", inv.status === 'Waiting for Processing' ? 'text-gray-500' : 'text-gray-900')}>{inv.status}</span>
                          {inv.statusDate && <span className="text-[10px] text-gray-400">({inv.statusDate})</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600">{inv.items}</td>
                      <td className="px-4 py-4 text-right">
                        <button className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center ml-auto hover:bg-orange-200 transition-colors">
                          <FileText className="w-3 h-3" />
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
