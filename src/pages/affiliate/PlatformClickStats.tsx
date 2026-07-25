import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, BarChart2, LineChart } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, PageTransition, Input } from '@/components';

export function PlatformClickStats() {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [chartTab, setChartTab] = useState('Monthly');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  
  // Format current month for default date picker (YYYY-MM)
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedDate, setSelectedDate] = useState(currentMonth);

  // Format the platform name to Title Case
  const platformName = platform 
    ? platform.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') 
    : 'Platform';

  // Reused mock chart logic
  const mockData = useMemo(() => {
    switch (chartTab) {
      case 'Daily': return [10, 25, 15, 40, 35, 60, 50];
      case 'Weekly': return [120, 250, 180, 300];
      case 'Monthly': return [10, 15, 12, 25, 20, 35, 30, 45, 40, 55, 50, 65, 60, 75, 70, 85, 80, 95, 90, 100, 85, 75, 65, 55, 45, 35, 25, 15, 20, 30];
      case 'Custom': return [50, 45, 60, 55, 70, 65, 80, 90];
      default: return [];
    }
  }, [chartTab]);

  const maxDataValue = Math.max(...mockData, 10); // Prevent division by zero if all 0

  const xAxisLabels = useMemo(() => {
    switch (chartTab) {
      case 'Daily': return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'Weekly': return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case 'Monthly': return ['01 Jun', '05 Jun', '10 Jun', '15 Jun', '20 Jun', '25 Jun', '30 Jun'];
      case 'Custom': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
      default: return [];
    }
  }, [chartTab]);

  const totalClicks = useMemo(() => mockData.reduce((a, b) => a + b, 0), [mockData]);

  return (
    <PageTransition>
      <ContentWrapper>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" strokeWidth={3} />
          </button>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Click Statistics -- {platformName}</h1>
        </div>

        {/* Main Chart Card */}
        <Card className="p-6 bg-white border-border shadow-sm flex flex-col h-[500px] w-full">
          
          {/* Top Controls Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 w-full">
            {/* Left side: Date Picker & Refresh */}
            <div className="flex items-center gap-2">
              <Input 
                type="month" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="w-48 bg-white h-10 text-sm font-medium"
              />
              <button className="h-10 w-10 flex items-center justify-center border border-border rounded-lg hover:bg-gray-50 text-gray-500 transition-colors shrink-0">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            {/* Right side: Chart type toggles & Time tabs */}
            <div className="flex flex-wrap items-center gap-3">
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

          {/* Stats Display */}
          <div className="mb-6">
            <div className="text-3xl font-extrabold text-gray-900 leading-none mb-1">{totalClicks.toLocaleString()}</div>
            <div className="text-xs font-medium text-gray-500">Total Clicks {chartTab}</div>
          </div>

          {/* Working Chart Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex">
              {/* Y-axis labels */}
              <div className="w-12 flex flex-col justify-between text-[10px] text-gray-400 py-0 pr-3 text-right">
                <span>{maxDataValue}</span>
                <span>{Math.round(maxDataValue * 0.8)}</span>
                <span>{Math.round(maxDataValue * 0.6)}</span>
                <span>{Math.round(maxDataValue * 0.4)}</span>
                <span>{Math.round(maxDataValue * 0.2)}</span>
                <span>0</span>
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
                          title={`${val} clicks`}
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
                        title={`${val} clicks`}
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
      </ContentWrapper>
    </PageTransition>
  );
}
