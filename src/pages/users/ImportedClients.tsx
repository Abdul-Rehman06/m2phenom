import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Download } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, PageTransition } from '@/components';
import { APP_CONFIG, ROUTES } from '@/constants';

export function ImportedClients() {
  const navigate = useNavigate();

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Import History</h1>
              <p className="text-gray-500">View past client imports and their details.</p>
            </div>
            <Button 
              onClick={() => navigate(ROUTES.USERS.IMPORT_FILES.IMPORT_CLIENT)}
              className="bg-brand-gradient text-white font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Upload className="w-4 h-4 mr-2" /> IMPORT CLIENT(S)
            </Button>
          </div>

          {/* Table Card */}
          <Card className="border-border shadow-sm w-full bg-white overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-50/50 border-b border-border text-gray-500 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Import Date & Time</th>
                    <th className="py-4 px-6">CSV File</th>
                    <th className="py-4 px-6">Number of Clients</th>
                    <th className="py-4 px-6 text-right">Action(s)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Mock Data Row */}
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-medium">July 15, 2026 10:30 AM</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-primary-600 font-medium">
                        <FileText className="w-4 h-4" /> clients_batch_01.csv
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-bold">42</td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">
                        <Download className="w-4 h-4" />
                      </Button>
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