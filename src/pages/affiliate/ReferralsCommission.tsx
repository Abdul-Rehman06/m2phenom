import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, PageTransition, Input, Select } from '@/components';

export function ReferralsCommission() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2026-06'); // Default to Jun-2026 as per screenshot

  const statusOptions = [
    { label: 'Commission Status', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Paid', value: 'paid' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Failed', value: 'failed' },
    { label: 'Processing', value: 'processing' },
    { label: 'Reversed', value: 'reversed' },
  ];

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
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Referrals Commission</h1>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white border-border shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            
            {/* Search */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
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

            {/* Filters */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select 
                options={statusOptions}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full sm:w-48 h-10 bg-white"
              />
              <Input 
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-40 h-10 bg-white"
              />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">#</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Earned From</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Commission</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Subscription Id</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Account ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Payout ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-sm font-bold text-gray-900 text-left">
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
