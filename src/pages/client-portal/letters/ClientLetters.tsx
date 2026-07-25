import { PageHeader, ContentWrapper } from '@/layouts';
import { Card } from '@/components';
import { Mail, Search, Filter, Download, ExternalLink, Calendar } from 'lucide-react';

export function ClientLetters() {
  return (
    <ContentWrapper>
      <PageHeader 
        title="Retrieve Your Letters" 
        description="View and download all communications sent on your behalf."
      />

      <Card className="p-6 shadow-sm border border-surface-200 bg-white">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input 
              type="text" 
              placeholder="Search letters by bureau or subject..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <select className="w-full pl-9 pr-4 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                <option value="">All Dates</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="180">Last 6 Months</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-100 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Letters List */}
        <div className="space-y-4">
          {[
            { id: 'LTR-1001', bureau: 'Experian', type: 'Dispute Letter', date: 'Oct 10, 2026', status: 'Sent' },
            { id: 'LTR-1002', bureau: 'Equifax', type: 'Validation Request', date: 'Oct 10, 2026', status: 'Sent' },
            { id: 'LTR-1003', bureau: 'TransUnion', type: 'Dispute Letter', date: 'Oct 09, 2026', status: 'Delivered' },
            { id: 'LTR-0994', bureau: 'Experian', type: 'Follow-up', date: 'Sep 15, 2026', status: 'Responded' },
            { id: 'LTR-0985', bureau: 'Creditor', type: 'Goodwill Letter', date: 'Sep 02, 2026', status: 'Delivered' },
          ].map((letter, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-surface-200 hover:border-primary-200 hover:shadow-md transition-all bg-white group">
              <div className="flex items-start gap-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-surface-900">{letter.type}</h4>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface-100 text-surface-600">
                      {letter.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-surface-500">
                    <span className="font-medium text-surface-700">To: {letter.bureau}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {letter.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-t-0 border-surface-100 pt-4 sm:pt-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    letter.status === 'Sent' ? 'bg-blue-500' : 
                    letter.status === 'Delivered' ? 'bg-emerald-500' : 
                    'bg-purple-500'
                  }`} />
                  <span className="text-sm font-medium text-surface-700">{letter.status}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors tooltip-trigger" title="View Details">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-50 border border-surface-200 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-100 hover:text-surface-900 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-100">
          <p className="text-sm text-surface-500">Showing 1 to 5 of 24 letters</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-surface-200 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50 disabled:opacity-50" disabled>Previous</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-600 text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-200 text-surface-600 hover:bg-surface-50 text-sm font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-200 text-surface-600 hover:bg-surface-50 text-sm font-medium">3</button>
            <span className="text-surface-400">...</span>
            <button className="px-3 py-1 border border-surface-200 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50">Next</button>
          </div>
        </div>
      </Card>
    </ContentWrapper>
  );
}