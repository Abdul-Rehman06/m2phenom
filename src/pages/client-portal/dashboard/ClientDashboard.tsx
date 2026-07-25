import { PageHeader, ContentWrapper } from '@/layouts';
import { FileText, TrendingUp, ShieldCheck, Clock, Download, Users, XSquare, AlertTriangle, MinusCircle, Search } from 'lucide-react';
import { Card } from '@/components';
import { ScoreGauge } from '@/pages/credit-report/ReportScoreBoard';

export function ClientDashboard() {
  return (
    <ContentWrapper>
      <PageHeader 
        title="Reports Dashboard" 
        description="Welcome back. Here's a summary of your credit repair progress."
      />

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Current Score" 
            value="712" 
            trend="+15 points" 
            icon={<TrendingUp className="w-5 h-5 text-emerald-500" />} 
          />
          <StatCard 
            title="Active Disputes" 
            value="4" 
            trend="Processing" 
            trendColor="text-blue-500"
            icon={<FileText className="w-5 h-5 text-blue-500" />} 
          />
          <StatCard 
            title="Resolved Accounts" 
            value="12" 
            trend="Success rate 85%" 
            trendColor="text-emerald-500"
            icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />} 
          />
          <StatCard 
            title="Next Update" 
            value="Oct 15" 
            trend="In 5 days" 
            trendColor="text-orange-500"
            icon={<Clock className="w-5 h-5 text-orange-500" />} 
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Chart & Gauges */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-sm border border-surface-200 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-surface-900">Current Scores</h3>
                <select className="bg-surface-50 border border-surface-200 text-surface-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                  <option>Latest Report</option>
                  <option>Previous Report</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center">
                  <ScoreGauge 
                    score={520} 
                    logoUrl="https://www.m2phenom.com/images/trans_logo.svg" 
                    altText="TransUnion" 
                  />
                </div>
                <div className="flex items-center justify-center">
                  <ScoreGauge 
                    score={680} 
                    logoUrl="https://www.m2phenom.com/images/logo-experian.svg" 
                    altText="Experian" 
                  />
                </div>
                <div className="flex items-center justify-center">
                  <ScoreGauge 
                    score={750} 
                    logoUrl="https://www.m2phenom.com/images/equ_logo.png" 
                    altText="Equifax" 
                  />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
              <MetricCard 
                title="Total Accounts" 
                icon={Users} 
                iconColor="text-blue-500" 
                iconBgColor="bg-blue-50" 
              />
              <MetricCard 
                title="Closed Accounts" 
                icon={XSquare} 
                iconColor="text-green-500" 
                iconBgColor="bg-green-50" 
              />
              <MetricCard 
                title="Delinquent" 
                icon={AlertTriangle} 
                iconColor="text-orange-500" 
                iconBgColor="bg-orange-50" 
              />
              <MetricCard 
                title="Derogatory" 
                icon={MinusCircle} 
                iconColor="text-red-500" 
                iconBgColor="bg-red-50" 
              />
              <MetricCard 
                title="Inquiries" 
                icon={Search} 
                iconColor="text-purple-500" 
                iconBgColor="bg-purple-50" 
              />
              <MetricCard 
                title="Public Records" 
                icon={FileText} 
                iconColor="text-teal-500" 
                iconBgColor="bg-teal-50" 
              />
            </div>
          </div>

          {/* Recent Reports List */}
          <Card className="p-6 shadow-sm border border-surface-200 bg-white">
            <h3 className="text-lg font-bold text-surface-900 mb-6">Recent Reports</h3>
            <div className="space-y-4">
              {[
                { date: 'Sep 2026', status: 'Available', color: 'text-emerald-600 bg-emerald-50' },
                { date: 'Aug 2026', status: 'Available', color: 'text-emerald-600 bg-emerald-50' },
                { date: 'Jul 2026', status: 'Available', color: 'text-emerald-600 bg-emerald-50' },
                { date: 'Jun 2026', status: 'Archived', color: 'text-surface-600 bg-surface-100' },
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-surface-100 hover:border-surface-200 hover:bg-surface-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-surface-900">{report.date} Report</p>
                      <span className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold ${report.color}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-bold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
              View All Reports
            </button>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
}

// Reusable Metric Card component for the bottom grid
const MetricCard = ({ 
  title, 
  icon: Icon, 
  iconColor, 
  iconBgColor 
}: { 
  title: string, 
  icon: React.ElementType, 
  iconColor: string, 
  iconBgColor: string 
}) => {
  return (
    <Card className="bg-white border border-surface-200 shadow-sm flex flex-col h-full rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor} ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      
      <div className="px-4 pb-4 flex flex-col flex-1">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-2 mb-3 text-xs font-bold text-center">
          <div className="col-span-1"></div>
          <div className="col-span-1 text-blue-500">TU</div>
          <div className="col-span-1 text-purple-600">EX</div>
          <div className="col-span-1 text-red-500">EQ</div>
        </div>

        {/* Current Row */}
        <div className="grid grid-cols-4 gap-2 mb-3 text-[11px] items-center text-center">
          <div className="col-span-1 text-left font-semibold text-gray-700">Current</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-3"></div>

        {/* Previous Row */}
        <div className="grid grid-cols-4 gap-2 mb-3 text-[11px] items-center text-center">
          <div className="col-span-1 text-left font-semibold text-gray-700">Previous</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-3 mt-auto"></div>

        {/* Difference Row */}
        <div className="grid grid-cols-4 gap-2 text-[11px] items-center text-center">
          <div className="col-span-1 text-left font-bold text-gray-900">Difference</div>
          <div className="col-span-1 text-gray-500 font-mono font-bold">--</div>
          <div className="col-span-1 text-gray-500 font-mono font-bold">--</div>
          <div className="col-span-1 text-gray-500 font-mono font-bold">--</div>
        </div>
      </div>
    </Card>
  );
};
function StatCard({ title, value, trend, icon, trendColor = "text-emerald-500" }: { title: string, value: string, trend: string, icon: React.ReactNode, trendColor?: string }) {
  return (
    <Card className="p-5 shadow-sm border border-surface-200 bg-white hover:border-primary-200 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-surface-500 mb-1">{title}</p>
          <h4 className="text-2xl font-black text-surface-900">{value}</h4>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-xs font-bold ${trendColor}`}>{trend}</span>
      </div>
    </Card>
  );
}
