import { ContentWrapper } from '@/layouts';
import { Card, Button, PageTransition, Textarea } from '@/components';
import { APP_CONFIG } from '@/constants';
import { AlertCircle } from 'lucide-react';

export function ImportClient() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Management</h1>
            <p className="text-gray-500">Upload CSV files and client documents to import new profiles.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full">
            
            {/* Left Column - File Uploads */}
            <div className="xl:col-span-8 flex flex-col gap-8">
              <Card className="p-8 bg-white border-border shadow-sm flex flex-col gap-8">
                
                {/* CSV Upload Section */}
                <div className="flex flex-col">
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1.5 mb-2 w-fit">
                    Click Here to download sample csv
                  </a>
                  <p className="text-sm text-gray-500 mb-4">make sure your csv file should match exactly with sample csv</p>
                  
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">CSV file to import</label>
                  <input 
                    type="file" 
                    accept=".csv"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-100 file:text-gray-700
                      hover:file:bg-gray-200
                      border border-border rounded-lg bg-white cursor-pointer shadow-sm transition-all focus:outline-none"
                  />
                </div>

                <div className="bg-orange-50/80 border border-orange-100 rounded-xl p-4 text-sm text-gray-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-gray-900">Please ensure the name of your file is correctly copied and exact to the name of that file in csv file above.</p>
                    <p className="text-orange-800"><strong>Note:</strong> file names should not include special symbols like (!,@,#,% etc)</p>
                  </div>
                </div>

                <div className="w-full h-px bg-border"></div>

                {/* ZIP Upload Section */}
                <div className="flex flex-col">
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1.5 mb-4 w-fit">
                    Click Here to download sample zip file
                  </a>
                  
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Upload client documents. (.zip file)</label>
                  <input 
                    type="file" 
                    accept=".zip"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-100 file:text-gray-700
                      hover:file:bg-gray-200
                      border border-border rounded-lg bg-white cursor-pointer shadow-sm transition-all focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <Button className="bg-brand-gradient text-white font-bold px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all uppercase tracking-wide">
                    Process Import
                  </Button>
                </div>

              </Card>
            </div>

            {/* Right Column - Notes */}
            <div className="xl:col-span-4 flex flex-col">
              <Card className="p-8 bg-white border-border shadow-sm flex-1 flex flex-col min-h-[400px]">
                <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">Notes</label>
                <Textarea 
                  placeholder="Notes" 
                  className="flex-1 min-h-[300px] bg-gray-50/50 resize-none border-border focus:bg-white transition-colors"
                />
              </Card>
            </div>

          </div>
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}