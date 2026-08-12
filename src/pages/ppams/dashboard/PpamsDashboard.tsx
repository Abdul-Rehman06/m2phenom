import { PageTransition } from '@/components';
import { 
  Calendar, Info, X, ShoppingCart, User, FileText, Sparkles, 
  Settings, FolderOpen, DollarSign, Send, Pause, 
  Eye, Download, MoreHorizontal, AlertTriangle, 
  FileBox, Printer, CheckCircle, Plus
} from 'lucide-react';

const SupportRequestsPieChart = () => {
  const data = [
    { label: "Webform", value: 63, color: "#1652F0", chip: "#0B2470", chipText: "#ffffff", dir: "right" },
    { label: "Call",    value: 20, color: "#B7BBBE", chip: "#EDEEEF", chipText: "#101828", dir: "left"  },
    { label: "Email",   value:  8, color: "#DCDEE0", chip: "#F5F6F6", chipText: "#101828", dir: "left"  },
    { label: "Webchat", value:  6, color: "#E9EAEC", chip: "#FFFFFF", chipText: "#101828", dir: "up", nudge: [-6, 6] },
    { label: "Other",   value:  3, color: "#F3F4F5", chip: "#FFFFFF", chipText: "#101828", dir: "up", nudge: [ 8, -8], lineLen: 55 }
  ];

  const cx = 300, cy = 260, R = 150;
  const total = data.reduce((s, d) => s + d.value, 0);

  const pt = (angleDeg: number, r: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
  };

  let start = 0;

  return (
    <div className="w-full flex justify-center -mt-8 mb-4">
      <svg viewBox="0 0 640 480" className="w-full max-w-[400px] h-auto font-sans" role="img" aria-label="Pie chart of support requests">
        <g>
          {data.map((d, i) => {
            const sweep = (d.value / total) * 360;
            const end = start + sweep;
            const mid = start + sweep / 2;

            const p0 = pt(start, R);
            const p1 = pt(end, R);
            const largeArc = sweep > 180 ? 1 : 0;
            const slicePath = `M ${cx} ${cy} L ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${R} ${R} 0 ${largeArc} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Z`;

            const a1 = pt(mid, R + 6);
            const a2 = pt(mid, R + 30);
            let leaderPath = '';
            let tx = 0;
            let ty = 0;
            let anchor: 'start' | 'middle' | 'end' = 'middle';

            if (d.dir === "right") {
              tx = a2.x + 30; ty = a2.y; anchor = "start";
              leaderPath = `M ${a1.x.toFixed(1)} ${a1.y.toFixed(1)} L ${a2.x.toFixed(1)} ${a2.y.toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
              tx += 8;
            } else if (d.dir === "left") {
              tx = a2.x - 30; ty = a2.y; anchor = "end";
              leaderPath = `M ${a1.x.toFixed(1)} ${a1.y.toFixed(1)} L ${a2.x.toFixed(1)} ${a2.y.toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
              tx -= 8;
            } else {
              const len = (d as any).lineLen || 40;
              tx = a1.x; ty = a1.y - len; anchor = "middle";
              leaderPath = `M ${a1.x.toFixed(1)} ${a1.y.toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
              ty -= 8;
            }

            const rFactor = d.value >= 15 ? 0.68 : 0.80;
            const nudge = (d as any).nudge || [0, 0];
            const c = pt(mid, R * rFactor);
            const px = c.x + nudge[0];
            const py = c.y + nudge[1];

            start = end;

            return (
              <g key={i}>
                <path d={slicePath} fill={d.color} stroke="#fff" strokeWidth="2" />
                <path d={leaderPath} stroke="#101828" strokeWidth="1.2" fill="none" />
                <text x={tx} y={d.dir === "up" ? ty : ty + 4} textAnchor={anchor} fontSize="14" fontWeight="700" fill="#101828">{d.label}</text>
                <g>
                  <rect x={px - 22} y={py - 12} width="44" height="24" rx="5" ry="5" fill={d.chip} />
                  <text x={px} y={py + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={d.chipText}>{d.value}%</text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export function PpamsDashboard() {
  return (
    <PageTransition>
      <div className="w-full space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard Overview</h1>
            <p className="text-sm text-slate-500 font-medium">Welcome back, ALI_BADI_ppams. Here's what's happening with your printing operations.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400" />
            August 12, 2026
          </button>
        </div>

        {/* Alert Banner */}
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-bold text-teal-900 text-sm">Incoming Printing Orders</h3>
              <p className="text-teal-700 text-xs font-medium">You have 15 new orders that need to be reviewed or processed.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
              View New Orders
            </button>
            <button className="text-teal-400 hover:text-teal-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top 4 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Orders</p>
              <h2 className="text-2xl font-black text-slate-800 leading-none">1,068</h2>
              <p className="text-xs font-bold text-green-500 mt-1">↑ 12.4% <span className="text-slate-400 font-medium">vs last 30 days</span></p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Clients</p>
              <h2 className="text-2xl font-black text-slate-800 leading-none">842</h2>
              <p className="text-xs font-bold text-green-500 mt-1">↑ 8.7% <span className="text-slate-400 font-medium">vs last 30 days</span></p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Files</p>
              <h2 className="text-2xl font-black text-slate-800 leading-none">26,487</h2>
              <p className="text-xs font-bold text-green-500 mt-1">↑ 15.3% <span className="text-slate-400 font-medium">vs last 30 days</span></p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">New Orders Today</p>
              <h2 className="text-2xl font-black text-slate-800 leading-none">15</h2>
              <p className="text-xs font-bold text-green-500 mt-1">↑ 25.0% <span className="text-slate-400 font-medium">vs yesterday</span></p>
            </div>
          </div>
        </div>

        {/* 5 Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm border-b-4 border-b-blue-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Settings className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-xs font-bold text-slate-600">Processing</p>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-black text-slate-800">256</h3>
              <span className="text-xs font-bold text-slate-400 mb-0.5">24.0%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm border-b-4 border-b-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <FolderOpen className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-xs font-bold text-slate-600">Open / Needs Processing</p>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-black text-slate-800">432</h3>
              <span className="text-xs font-bold text-slate-400 mb-0.5">40.4%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm border-b-4 border-b-teal-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4 text-teal-500" />
              </div>
              <p className="text-xs font-bold text-slate-600">Printed Awaiting Payment</p>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-black text-slate-800">87</h3>
              <span className="text-xs font-bold text-slate-400 mb-0.5">8.1%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm border-b-4 border-b-green-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Send className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-xs font-bold text-slate-600">Printed & Mailed</p>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-black text-slate-800">214</h3>
              <span className="text-xs font-bold text-slate-400 mb-0.5">20.0%</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm border-b-4 border-b-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <Pause className="w-4 h-4 text-purple-500 fill-purple-500" />
              </div>
              <p className="text-xs font-bold text-slate-600">Processing Currently Paused</p>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl font-black text-slate-800">79</h3>
              <span className="text-xs font-bold text-slate-400 mb-0.5">7.4%</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Column (Table) + Right Column (Chart/Activity) */}
        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* LEFT COLUMN */}
          <div className="flex-1 space-y-6 min-w-0">
            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-800">Recent Orders</h3>
                <button className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                  View All Orders
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100">
                      <th className="px-5 py-3">Order ID</th>
                      <th className="px-5 py-3">Client</th>
                      <th className="px-5 py-3">Package / Letter</th>
                      <th className="px-5 py-3">Files</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-50">
                    {[
                      { id: 'ORD-1068', client: 'John Doe Smith Jr', package: 'John Doe - Indemnity', files: 46, status: 'Processing', statusColor: 'bg-blue-50 text-blue-600', date: 'Aug 12, 2026 9:42 AM' },
                      { id: 'ORD-1067', client: 'Santina KaPree Burt', package: 'Santina KaPree - Burt', files: 24, status: 'Printed & Mailed', statusColor: 'bg-green-50 text-green-600', date: 'Aug 12, 2026 8:21 AM' },
                      { id: 'ORD-1066', client: 'Dante Lamont Sneed', package: 'Dante Lamont - Sneed', files: 24, status: 'Printed & M...', statusColor: 'bg-green-50 text-green-600', date: 'Aug 12, 2026 8:13 AM' },
                      { id: 'ORD-1065', client: 'John Joe Smith Jr', package: 'John Joe - Indemnity', files: 15, status: 'Open / Needs Processing', statusColor: 'bg-orange-50 text-orange-600', date: 'Aug 12, 2026 7:58 AM' },
                      { id: 'ORD-1064', client: 'Dante Lamont Sneed', package: 'Dante Lamont - Sneed', files: 3, status: 'Printed Awaiting Payment', statusColor: 'bg-teal-50 text-teal-600', date: 'Aug 12, 2026 5:06 AM' },
                      { id: 'ORD-1063', client: 'Dominic Felton', package: 'Dominic Felton - Supreme', files: 3, status: 'Printed & Mailed', statusColor: 'bg-green-50 text-green-600', date: 'Aug 12, 2026 1:00 AM' },
                      { id: 'ORD-1062', client: 'Saul Quintero Rea', package: 'Saul Quintero - Supreme 1', files: 25, status: 'Processing Currently Paused', statusColor: 'bg-purple-50 text-purple-600', date: 'Aug 11, 2026 7:14 PM' },
                      { id: 'ORD-1061', client: 'Adrian Garland', package: 'Adrian Garland - Phenomenal', files: 3, status: 'Printed & Mailed', statusColor: 'bg-green-50 text-green-600', date: 'Aug 11, 2026 9:41 AM' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 text-slate-500">{row.id}</td>
                        <td className="px-5 py-3 text-slate-800">{row.client}</td>
                        <td className="px-5 py-3 text-slate-600">{row.package}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <FileText className="w-4 h-4" /> {row.files}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-500">{row.date}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 shadow-sm transition-all"><Eye className="w-3.5 h-3.5" /></button>
                            <button className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 shadow-sm transition-all"><Download className="w-3.5 h-3.5" /></button>
                            <button className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 shadow-sm transition-all"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Orders Needing Attention */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-800">Orders Needing Attention</h3>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm hover:bg-slate-50">&lt;</button>
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm hover:bg-slate-50">&gt;</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'ORD-1065', client: 'John Joe Smith Jr', status: 'Open / Needs Processing', files: '15 files', time: 'Since 7:58 AM', color: 'text-orange-500' },
                  { id: 'ORD-1060', client: 'Rashad L. Plumpp', status: 'Printed Awaiting Payment', files: '15 files', time: 'Since Aug 10', color: 'text-teal-500' },
                  { id: 'ORD-1058', client: 'Dominique Ivory', status: 'Processing Currently Paused', files: '29 files', time: 'Since Aug 10', color: 'text-purple-500' },
                  { id: 'ORD-1052', client: 'Angelica Horton', status: 'Processing Currently Paused', files: '51 files', time: 'Since Aug 9', color: 'text-purple-500' },
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm relative overflow-hidden group hover:border-red-200 transition-colors cursor-pointer">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400">{card.files}</p>
                        <p className="text-[10px] text-slate-400">{card.time}</p>
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-slate-500">{card.id}</p>
                    <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">{card.client}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${card.color}`}>{card.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full xl:w-[320px] shrink-0 space-y-6">
            
            {/* Support Requests (New Pie Chart) */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-lg font-black text-slate-800 mb-2">Status Breakdown</h3>
              <SupportRequestsPieChart />
            </div>

            {/* Latest Activity */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-black text-slate-800">Latest Activity</h3>
                <button className="text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { text: 'Order ORD-1067 marked as Printed & Mailed', time: '8:21 AM', color: 'bg-blue-500' },
                  { text: 'Payment received for ORD-1064', time: '5:06 AM', color: 'bg-green-500' },
                  { text: 'New order ORD-1068 created', time: '9:42 AM', color: 'bg-orange-500' },
                  { text: 'Order ORD-1062 processing paused', time: 'Yesterday', color: 'bg-purple-500' },
                  { text: 'Files downloaded for ORD-1061', time: 'Yesterday', color: 'bg-teal-500' },
                  { text: 'Order ORD-1059 completed', time: 'Aug 10', color: 'bg-green-500' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {/* Line connecting dots (except last one) */}
                    {i !== 5 && <div className="absolute left-1 top-4 w-px h-full bg-slate-100 -translate-x-[0.5px]"></div>}
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 relative z-10 ${act.color}`}></div>
                    <div className="flex-1 flex items-start justify-between gap-2">
                      <p className="text-xs text-slate-600 font-medium leading-tight">{act.text}</p>
                      <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap shrink-0">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-lg font-black text-slate-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button className="flex items-center gap-2 p-3 rounded-lg border border-slate-100 hover:border-orange-200 hover:bg-orange-50 text-slate-700 transition-colors group">
                  <FileBox className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">View PPAMS</span>
                </button>
                <button className="flex items-center gap-2 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700 transition-colors group">
                  <Download className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Download Files</span>
                </button>
                <button className="flex items-center gap-2 p-3 rounded-lg border border-slate-100 hover:border-green-200 hover:bg-green-50 text-slate-700 transition-colors group">
                  <Printer className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Print Queue</span>
                </button>
                <button className="flex items-center gap-2 p-3 rounded-lg border border-slate-100 hover:border-purple-200 hover:bg-purple-50 text-slate-700 transition-colors group">
                  <CheckCircle className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Mark as Mailed</span>
                </button>
              </div>
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors font-bold text-sm shadow-sm group">
                <Plus className="w-4 h-4" />
                Create New Order
              </button>
            </div>

          </div>
        </div>

      </div>
    </PageTransition>
  );
}
