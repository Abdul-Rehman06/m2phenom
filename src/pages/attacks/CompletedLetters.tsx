import { Download, Eye } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, PageTransition, Badge } from '@/components';
import { APP_CONFIG } from '@/constants';

export function CompletedLetters() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Completed Letters</h1>
              <p className="text-gray-500">View and download letters that have already been generated.</p>
            </div>
          </div>

          {/* Table Card */}
          <Card className="border-border shadow-sm w-full bg-white overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50/50 border-b border-border text-gray-500 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Generated Date</th>
                    <th className="py-4 px-6">Client Name</th>
                    <th className="py-4 px-6">Bureau</th>
                    <th className="py-4 px-6">Accounts Included</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action(s)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Mock Data Row 1 */}
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-medium">July 15, 2026</td>
                    <td className="py-4 px-6 text-gray-900 font-bold">Kerron Lenny Murphy</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Badge variant="primary" className="bg-blue-50 text-blue-700 border-blue-200">TransUnion</Badge>
                        <Badge variant="primary" className="bg-purple-50 text-purple-700 border-purple-200">Experian</Badge>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">4 Items</td>
                    <td className="py-4 px-6">
                      <Badge variant="success" className="bg-green-50 text-green-700 border-green-200 gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"/> Completed
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {/* Mock Data Row 2 */}
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-medium">July 12, 2026</td>
                    <td className="py-4 px-6 text-gray-900 font-bold">John Doe</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Badge variant="primary" className="bg-red-50 text-red-700 border-red-200">Equifax</Badge>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">2 Items</td>
                    <td className="py-4 px-6">
                      <Badge variant="success" className="bg-green-50 text-green-700 border-green-200 gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"/> Completed
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
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