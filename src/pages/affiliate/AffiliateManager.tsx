import { useState, useMemo } from 'react';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { 
  MousePointerClick, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  CheckCircle,
  Info,
  MessageCircle,
  Link as LinkIcon,
  Send,
  Trophy,
  Award,
  Gift,
  Mail,
  Globe,
  Lock,
  User,
  BarChart2,
  LineChart
} from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, Input, PageTransition } from '@/components';
import { useUIStore } from '@/store/useUIStore';

const StatCard = ({ title, value, subtitle, icon: Icon, trend, onClick, clickable }: any) => (
  <Card 
    onClick={onClick}
    className={`p-5 flex flex-col justify-between h-full bg-white border-border shadow-sm ${clickable ? 'cursor-pointer hover:shadow-md transition-all hover:-translate-y-1' : ''}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-success-600 bg-success-50 px-2 py-1 rounded-full">
        ↑ {trend}
      </div>
    </div>
    <div>
      <div className="text-gray-500 text-xs font-medium mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-400 text-xs">{subtitle}</div>
    </div>
  </Card>
);

export function AffiliateManager() {
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  const [chartTab, setChartTab] = useState('Monthly');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const mockData = useMemo(() => {
    switch (chartTab) {
      case 'Daily': return [10, 25, 15, 40, 35, 60, 50];
      case 'Weekly': return [120, 250, 180, 300];
      case 'Monthly': return [10, 15, 12, 25, 20, 35, 30, 45, 40, 55, 50, 65, 60, 75, 70, 85, 80, 95, 90, 100, 85, 75, 65, 55, 45, 35, 25, 15, 20, 30];
      case 'Custom': return [50, 45, 60, 55, 70, 65, 80, 90];
      default: return [];
    }
  }, [chartTab]);

  const maxDataValue = Math.max(...mockData, 100);

  const xAxisLabels = useMemo(() => {
    switch (chartTab) {
      case 'Daily': return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'Weekly': return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case 'Monthly': return ['01 Jun', '05 Jun', '10 Jun', '15 Jun', '20 Jun', '25 Jun', '30 Jun'];
      case 'Custom': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
      default: return [];
    }
  }, [chartTab]);

  const totalEarnings = useMemo(() => mockData.reduce((a, b) => a + b, 0), [mockData]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast({ title: 'Copied to clipboard!', variant: 'success' });
  };

  return (
    <PageTransition>
      <ContentWrapper>
        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Affiliate Program
            </h1>
            <p className="text-sm text-gray-500 mt-1">Track referrals, grow commissions, and share your link. ⚡</p>
          </div>
          <Card className="bg-brand-gradient text-white p-4 flex items-center gap-6 shadow-md border-0 shrink-0">
            <div>
              <div className="text-white/80 text-xs font-medium flex items-center gap-1 mb-1">
                Total Earnings <Info className="w-3 h-3" />
              </div>
              <div className="text-3xl font-bold">$0.00</div>
              <div className="text-white/70 text-xs mt-1">All time earnings from your referrals</div>
            </div>
            {/* Decorative chart graphic */}
            <div className="hidden sm:flex items-end gap-1 h-12 opacity-80">
              <div className="w-2 h-4 bg-white/40 rounded-t-sm" />
              <div className="w-2 h-6 bg-white/60 rounded-t-sm" />
              <div className="w-2 h-8 bg-white/80 rounded-t-sm" />
              <div className="w-2 h-12 bg-white rounded-t-sm" />
              <div className="w-2 h-10 bg-white/90 rounded-t-sm" />
            </div>
          </Card>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard title="Clicks" value="0" subtitle="Total Clicks" icon={MousePointerClick} trend="0%" onClick={() => navigate(ROUTES.AFFILIATE_CLICKS)} clickable />
          <StatCard title="Subscriptions" value="0" subtitle="Total Purchased Subscriptions" icon={ShoppingCart} trend="0%" onClick={() => navigate(ROUTES.AFFILIATE_COMMISSIONS)} clickable />
          <StatCard title="Total Referrals" value="0" subtitle="Total Referrals" icon={Users} trend="0%" onClick={() => navigate(ROUTES.AFFILIATE_REFERRALS)} clickable />
          <StatCard title="Total Commission" value="$0" subtitle="Total Commission" icon={DollarSign} trend="0%" onClick={() => navigate(ROUTES.AFFILIATE_COMMISSIONS)} clickable />
          <StatCard title="Paid Commission" value="$0" subtitle="Paid Commission" icon={CheckCircle} trend="0%" onClick={() => navigate(`${ROUTES.AFFILIATE_COMMISSIONS}?status=paid`)} clickable />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Main Chart & Bottom Cards */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            
            {/* Chart Card */}
            <Card className="p-6 bg-white border-border shadow-sm flex flex-col h-[400px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Total Earnings</h2>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">${totalEarnings.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">Total Earnings {chartTab}</div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Chart Type Toggle */}
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setChartType('line')}
                      className={`p-1.5 rounded-md transition-colors ${chartType === 'line' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      title="Line Chart"
                    >
                      <LineChart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setChartType('bar')}
                      className={`p-1.5 rounded-md transition-colors ${chartType === 'bar' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      title="Bar Chart"
                    >
                      <BarChart2 className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Time Range Tabs */}
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['Daily', 'Weekly', 'Monthly', 'Custom'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setChartTab(tab)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          chartTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Working Chart Area */}
              <div className="flex-1 flex flex-col mt-6">
                <div className="flex-1 flex">
                  {/* Y-axis labels */}
                  <div className="w-12 flex flex-col justify-between text-[10px] text-gray-400 py-0 pr-3 text-right">
                    <span>${maxDataValue}</span>
                    <span>${Math.round(maxDataValue * 0.8)}</span>
                    <span>${Math.round(maxDataValue * 0.6)}</span>
                    <span>${Math.round(maxDataValue * 0.4)}</span>
                    <span>${Math.round(maxDataValue * 0.2)}</span>
                    <span>$0</span>
                  </div>
                  
                  {/* Chart Grid & SVG */}
                  <div className="flex-1 relative border-l border-b border-gray-100">
                    {/* Horizontal grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full border-b border-dashed border-gray-100 h-0" />
                      ))}
                    </div>
                    
                    {/* SVG Line & Area OR Bar Chart */}
                    {chartType === 'line' ? (
                      <>
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <polygon
                            fill="url(#chartGradient)"
                            points={`0,100 ${mockData.map((val, i) => `${(i / (mockData.length - 1)) * 100},${100 - (val / maxDataValue) * 100}`).join(' ')} 100,100`}
                          />
                          <polyline
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                            points={mockData.map((val, i) => `${(i / (mockData.length - 1)) * 100},${100 - (val / maxDataValue) * 100}`).join(' ')}
                          />
                        </svg>

                        {/* Data Points (Dots) */}
                        <div className="absolute inset-0 z-20">
                          {mockData.map((val, i) => (
                            <div 
                              key={i} 
                              className="absolute w-2 h-2 rounded-full bg-primary-500 border border-white -ml-1 -mb-1 shadow-sm transition-transform hover:scale-150 cursor-pointer"
                              style={{
                                left: `${(i / (mockData.length - 1)) * 100}%`,
                                bottom: `${(val / maxDataValue) * 100}%`
                              }}
                              title={`$${val}`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-end justify-between px-2 z-20">
                        {mockData.map((val, i) => (
                          <div
                            key={i}
                            className="w-full mx-[2px] bg-primary-500 hover:bg-primary-600 transition-all rounded-t-sm cursor-pointer"
                            style={{ height: `${(val / maxDataValue) * 100}%` }}
                            title={`$${val}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="pl-12 flex justify-between text-[10px] text-gray-400 pt-3">
                  {xAxisLabels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Bottom Row inside Left Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Next Payout Milestone */}
              <Card className="p-6 bg-white border-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                    <Trophy className="w-4 h-4 text-orange-500" /> Next Payout Milestone
                  </div>
                  <div className="text-xs text-gray-500 mb-4">Reach $100 to unlock your next payout.</div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-extrabold text-gray-900">$0</span>
                    <span className="text-sm text-gray-400 mb-1">/ $100</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                    <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="text-[10px] text-primary-600 font-bold bg-primary-50 inline-block px-1.5 py-0.5 rounded">0%</div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full text-xs font-semibold">
                    View Payout History
                  </Button>
                </div>
              </Card>

              {/* Recent Referrals */}
              <Card className="p-6 bg-white border-border shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Users className="w-4 h-4 text-primary-500" /> Recent Referrals
                  </div>
                  <Button variant="outline" className="text-xs py-1 h-auto">View All</Button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="text-sm font-bold text-gray-900">No referrals yet</div>
                  <div className="text-xs text-gray-500 mt-1">Share your link and start earning!</div>
                </div>
              </Card>

            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Cards */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            
            {/* Account Information */}
            <Card className="p-6 bg-white border-border shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Account Information</h3>
              <p className="text-xs text-gray-500 mb-6">Add or update your bank details for smooth withdrawals.</p>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-[100px_1fr] items-center text-xs">
                  <div className="flex items-center gap-2 text-gray-500">
                    <User className="w-3.5 h-3.5" /> Account Name:
                  </div>
                  <div className="font-medium text-gray-900">Ali</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center text-xs">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail className="w-3.5 h-3.5" /> Email:
                  </div>
                  <div className="font-medium text-gray-900">ali_024@gmail.com</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center text-xs">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Globe className="w-3.5 h-3.5" /> Routing #:
                  </div>
                  <div className="font-medium text-gray-900">099999999</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center text-xs">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Lock className="w-3.5 h-3.5" /> Account #:
                  </div>
                  <div className="font-medium text-gray-900">123456789012</div>
                </div>
              </div>

              <Button className="w-full bg-brand-gradient text-white font-bold border-0">
                Manage Payout Details
              </Button>
            </Card>

            {/* Invite & Earn */}
            <Card className="p-6 bg-white border-border shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                <Gift className="w-4 h-4 text-primary-500" /> Invite & Earn
              </div>
              <p className="text-xs text-gray-500 mb-5">Share your code and link to invite your friends!</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Referral Code</label>
                  <div className="flex gap-2">
                    <Input readOnly value="g5200Qa" className="bg-gray-50 text-gray-600 font-mono text-xs" />
                    <Button onClick={() => copyToClipboard('g5200Qa')} className="bg-primary-600 hover:bg-primary-700 text-white px-3 shrink-0">
                      Copy Code
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Referral Link</label>
                  <div className="flex gap-2">
                    <Input readOnly value="https://m2phenom.com/?ref=g5200Qa" className="bg-gray-50 text-gray-600 font-mono text-[10px] truncate" />
                    <Button onClick={() => copyToClipboard('https://m2phenom.com/?ref=g5200Qa')} className="bg-primary-600 hover:bg-primary-700 text-white px-3 shrink-0">
                      Copy Link
                    </Button>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Send Invite</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter Email" className="text-xs" />
                    <Button onClick={() => addToast({ title: 'Invite sent!', variant: 'success'})} className="bg-primary-600 hover:bg-primary-700 text-white px-3 shrink-0">
                      <Send className="w-3.5 h-3.5 mr-1.5" /> Send Invite
                    </Button>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 mb-2">Share on social media</label>
                  <div className="flex gap-2">
                    <button onClick={() => addToast({ title: 'Facebook share opened'})} className="w-8 h-8 rounded bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold">
                      f
                    </button>
                    <button onClick={() => addToast({ title: 'Twitter share opened'})} className="w-8 h-8 rounded bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold">
                      𝕏
                    </button>
                    <button onClick={() => addToast({ title: 'LinkedIn share opened'})} className="w-8 h-8 rounded bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold">
                      in
                    </button>
                    <button onClick={() => addToast({ title: 'WhatsApp share opened'})} className="w-8 h-8 rounded bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => copyToClipboard('https://m2phenom.com/?ref=g5200Qa')} className="w-8 h-8 rounded bg-gray-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </Card>

            {/* Promo Card */}
            <Card className="p-5 bg-orange-50 border-orange-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-orange-900 mb-1">The more you refer, the more you earn!</h4>
                <p className="text-xs text-orange-700 mb-3">Earn higher commissions as you help more people.</p>
                <Button variant="outline" className="text-xs py-1 h-auto border-orange-300 text-orange-700 hover:bg-orange-100">
                  View Commission Plan
                </Button>
              </div>
            </Card>

          </div>
        </div>

      </ContentWrapper>
    </PageTransition>
  );
}
