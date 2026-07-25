import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, PageTransition, Input } from '@/components';

export function TotalReferrals() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <PageTransition>
      <ContentWrapper>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" strokeWidth={3} />
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Referrals</h1>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white border-border shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Input 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 h-10 bg-white"
            />
            <button className="h-10 w-10 flex items-center justify-center border border-border rounded-lg hover:bg-gray-50 text-gray-500 transition-colors shrink-0">
              <Search className="w-4 h-4" />
            </button>
            <button className="h-10 w-10 flex items-center justify-center border border-border rounded-lg hover:bg-gray-50 text-gray-500 transition-colors shrink-0">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">#</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">First Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">User Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Subscription Purchased</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Commission Earned</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-sm font-bold text-gray-900 text-left">
                    No record Found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </Card>
      </ContentWrapper>
    </PageTransition>
  );
}
