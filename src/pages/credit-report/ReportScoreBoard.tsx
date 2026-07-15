import { useState, useEffect } from 'react';
import { Info, Users, XSquare, AlertTriangle, MinusCircle, Search, FileText } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, PageTransition, Select } from '@/components';
import { APP_CONFIG } from '@/constants';

// ---------- geometry helpers ---------- 
const polar = (cx: number, cy: number, r: number, angleDeg: number) => { 
  const rad = ((angleDeg - 90) * Math.PI) / 180; 
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }; 
}; 

const arcPath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => { 
  const start = polar(cx, cy, r, startAngle); 
  const end = polar(cx, cy, r, endAngle); 
  const largeArc = endAngle - startAngle > 180 ? 1 : 0; 
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`; 
}; 

// ---------- band config ---------- 
const SEGMENTS = [ 
  { label: 'VERY POOR', color: '#ef4444' }, 
  { label: 'POOR',      color: '#f97316' }, 
  { label: 'FAIR',      color: '#f59e0b' }, 
  { label: 'GOOD',      color: '#facc15' }, 
  { label: 'VERY GOOD', color: '#84cc16' }, 
  { label: 'EXCELLENT', color: '#16a34a' }, 
]; 

const MAX_SCORE = 850; 
const GAP_DEG = 2.4;          // white gap on each side of a segment 
const SEG_SWEEP = 180 / SEGMENTS.length; 

export const ScoreGauge = ({ score, previousScore = null, logoUrl, altText }: { score: number, previousScore?: number | null, logoUrl: string, altText: string }) => { 
  // Animate needle from 0 on mount 
  const [displayScore, setDisplayScore] = useState(0); 
  useEffect(() => { 
    const t = requestAnimationFrame(() => setDisplayScore(score)); 
    return () => cancelAnimationFrame(t); 
  }, [score]); 

  const percent = Math.min(Math.max(displayScore, 0), MAX_SCORE) / MAX_SCORE; 
  const rotation = -90 + percent * 180; 

  const clamped = Math.min(Math.max(score, 0), MAX_SCORE); 
  const bandIndex = Math.min(Math.floor((clamped / MAX_SCORE) * SEGMENTS.length), SEGMENTS.length - 1); 
  const band = SEGMENTS[bandIndex]; 

  // viewBox geometry 
  const CX = 150, CY = 150; 
  const R_BAND = 106;         // centerline of the colored band 
  const BAND_W = 34; 
  const R_HALO = 133;         // faded outer ring 
  const HALO_W = 14; 

  const uid = altText ? altText.replace(/\s+/g, '-').toLowerCase() : 'gauge'; 
  const [logoFailed, setLogoFailed] = useState(false); 

  return ( 
    <div className="flex flex-col items-center justify-center p-6 w-full h-full min-h-[280px]"> 
      {/* Bureau logo (falls back to text if the image can't load) */} 
      <div className="h-10 mb-4 flex items-center justify-center"> 
        {logoUrl && !logoFailed ? ( 
          <img 
            src={logoUrl} 
            alt={altText} 
            className="h-full object-contain max-w-[140px]" 
            onError={() => setLogoFailed(true)} 
          /> 
        ) : ( 
          <span className="text-lg font-bold tracking-wide text-gray-800">{altText}</span> 
        )} 
      </div> 

      <div className="relative w-full max-w-[300px]"> 
        <svg viewBox="0 0 300 168" className="w-full overflow-visible"> 
          {SEGMENTS.map((seg, i) => { 
            const start = -90 + i * SEG_SWEEP + GAP_DEG / 2; 
            const end = -90 + (i + 1) * SEG_SWEEP - GAP_DEG / 2; 
            const labelPathId = `${uid}-label-${i}`; 
            return ( 
              <g key={seg.label}> 
                {/* faded outer halo segment */} 
                <path 
                  d={arcPath(CX, CY, R_HALO, start, end)} 
                  stroke={seg.color} 
                  strokeOpacity="0.18" 
                  strokeWidth={HALO_W} 
                  fill="none" 
                /> 
                {/* main colored band segment */} 
                <path 
                  d={arcPath(CX, CY, R_BAND, start, end)} 
                  stroke={seg.color} 
                  strokeWidth={BAND_W} 
                  fill="none" 
                /> 
                {/* invisible centerline path the label rides on */} 
                <path id={labelPathId} d={arcPath(CX, CY, R_BAND, start, end)} fill="none" /> 
                <text 
                  fill="#ffffff" 
                  fontSize="10.5" 
                  fontWeight="700" 
                  letterSpacing="1.2" 
                  dy="3.6" 
                  style={{ fontFamily: 'inherit' }} 
                > 
                  <textPath href={`#${labelPathId}`} startOffset="50%" textAnchor="middle"> 
                    {seg.label} 
                  </textPath> 
                </text> 
              </g> 
            ); 
          })} 

          {/* Needle — rotates around (150,150) */} 
          <g 
            style={{ 
              transform: `rotate(${rotation}deg)`, 
              transformOrigin: '150px 150px', 
              transformBox: 'view-box', 
              transition: 'transform 1.2s cubic-bezier(0.34, 1.2, 0.4, 1)', 
            }} 
          > 
            <path d="M 146.5 150 L 150 66 L 153.5 150 Z" fill="#1e3a4a" /> 
          </g> 

          {/* Ring pivot */} 
          <circle cx={CX} cy={CY} r="11" fill="#1e3a4a" /> 
          <circle cx={CX} cy={CY} r="5" fill="#ffffff" /> 

          {/* Min / max labels */} 
          <text x="14" y="164" fontSize="11" fontWeight="600" fill="#6b7280">0</text> 
          <text x="286" y="164" fontSize="11" fontWeight="600" fill="#6b7280" textAnchor="end">{MAX_SCORE}</text> 
        </svg> 
      </div> 

      {/* Score readout */} 
      <div className="flex flex-col items-center mt-3"> 
        <div className="flex items-center gap-2"> 
          <span className="text-[34px] leading-none font-bold text-gray-900 tracking-tight">{score}</span> 
          <span 
            className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-full text-white" 
            style={{ backgroundColor: band.color }} 
          > 
            {band.label} 
          </span> 
        </div> 
        <span className="text-[11px] text-gray-500 font-medium mt-1.5"> 
          Previous Score: <span className="font-mono">{previousScore ?? '---'}</span> 
        </span> 
      </div> 
    </div> 
  ); 
};

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
    <Card className="bg-white border-border shadow-sm flex flex-col h-full rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor} ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      
      <div className="px-5 pb-5 flex flex-col flex-1">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-2 mb-4 text-xs font-bold text-center">
          <div className="col-span-1"></div>
          <div className="col-span-1 text-blue-500">TU</div>
          <div className="col-span-1 text-purple-600">EX</div>
          <div className="col-span-1 text-red-500">EQ</div>
        </div>

        {/* Current Row */}
        <div className="grid grid-cols-4 gap-2 mb-4 text-xs items-center text-center">
          <div className="col-span-1 text-left font-semibold text-gray-700">Current</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-4"></div>

        {/* Previous Row */}
        <div className="grid grid-cols-4 gap-2 mb-4 text-xs items-center text-center">
          <div className="col-span-1 text-left font-semibold text-gray-700">Previous</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
          <div className="col-span-1 text-gray-500 font-mono">--</div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-4 mt-auto"></div>

        {/* Difference Row */}
        <div className="grid grid-cols-4 gap-2 text-xs items-center text-center">
          <div className="col-span-1 text-left font-bold text-gray-900">Difference</div>
          <div className="col-span-1 text-gray-500 font-mono font-bold">--</div>
          <div className="col-span-1 text-gray-500 font-mono font-bold">--</div>
          <div className="col-span-1 text-gray-500 font-mono font-bold">--</div>
        </div>
      </div>
    </Card>
  );
};

export function ReportScoreBoard() {
  const [selectedClient, setSelectedClient] = useState('Kerron Lennon Murphy');
  const [selectedReport, setSelectedReport] = useState('No Report');

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          {/* Page Title */}
          <div className="mb-6 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Score Board</h1>
          </div>

          {/* Header Alert Banner */}
          <div className="w-full bg-orange-50/80 backdrop-blur-sm rounded-xl p-4 mb-8 border border-orange-100 flex items-start gap-3 text-sm text-gray-700">
            <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p>
              If any score or your report is not available, it will be set to 0. If date of your report is not available, it will be set to current system date-time.
            </p>
          </div>

          {/* Filters Section */}
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mb-8">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Select Client</label>
              <Select 
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                options={[
                  { label: 'Kerron Lennon Murphy', value: 'Kerron Lennon Murphy' },
                  { label: 'John Doe', value: 'John Doe' }
                ]}
                className="bg-white shadow-sm border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Select Report</label>
              <Select 
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                options={[
                  { label: 'No Report', value: 'No Report' },
                  { label: 'Latest Report', value: 'Latest Report' }
                ]}
                className="bg-white shadow-sm border-gray-200 rounded-lg"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-8">
            
            {/* Score Gauges Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <Card className="bg-white border-border shadow-sm flex items-center justify-center rounded-2xl">
                <ScoreGauge 
                  score={520} 
                  logoUrl="https://www.m2phenom.com/images/trans_logo.svg" 
                  altText="TransUnion" 
                />
              </Card>
              <Card className="bg-white border-border shadow-sm flex items-center justify-center rounded-2xl">
                <ScoreGauge 
                  score={680} 
                  logoUrl="https://www.m2phenom.com/images/logo-experian.svg" 
                  altText="Experian" 
                />
              </Card>
              <Card className="bg-white border-border shadow-sm flex items-center justify-center rounded-2xl">
                <ScoreGauge 
                  score={750} 
                  logoUrl="https://www.m2phenom.com/images/equ_logo.png" 
                  altText="Equifax" 
                />
              </Card>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
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
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}