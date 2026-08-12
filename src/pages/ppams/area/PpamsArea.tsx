import { PageTransition } from '@/components';
import { Search, RefreshCw, Eye, Edit2, Download, FileArchive, ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const DUMMY_DATA = [
  { id: 1, user: 'trapboutique@yahoo.com', client: 'Lee D weir', date: 'August-12-2026', zip: 'letters/39644/Lee.D_weir_Supreme1_35a1190...zip', status: 'PROCESSING', files: 25, statusType: 'processing' },
  { id: 2, med: 'mrsneed217@gmail.com', user: 'Santina KaPree Burt', client: 'Santina KaPree Burt', date: 'August-12-2026', zip: 'letters/32824/Santina.KaPree_Burt_Indemnity...zip', status: 'PRINTED AND MAILED', files: 24, statusType: 'success', statusDate: 'Aug 12, 2026 - 8:21am est' },
  { id: 3, user: 'mrsneed217@gmail.com', client: 'Dante Lamont Sneed', date: 'August-12-2026', zip: 'letters/32825/Dante.Lamont_Sneed_Indemnity...zip', status: 'PRINTED AND MAILED', files: 24, statusType: 'success', statusDate: 'Aug 12, 2026 - 8:13am est' },
  { id: 4, user: 'ali_024@gmail.com', client: 'John Joe Smith Jr', date: 'August-12-2026', zip: 'letters/402/John.Joe_Smith.Jr_Indemnity...zip', status: 'OPEN & NEEDING PROCESSED', files: 15, statusType: 'warning' },
  { id: 5, user: 'ali_024@gmail.com', client: 'John Joe Smith Jr', date: 'August-12-2026', zip: 'letters/402/John.Joe_Smith.Jr_Indemnity...zip', status: 'OPEN & NEEDING PROCESSED', files: 43, statusType: 'warning' },
  { id: 6, user: 'mrsneed217@gmail.com', client: 'Dante Lamont Sneed', date: 'August-12-2026', zip: 'letters/32825/Dante.Lamont_Sneed_Dominate...zip', status: 'Printed Awaiting Payment', files: 3, statusType: 'info', statusDate: 'Aug 12, 2026 - 5:06am est' },
  { id: 7, user: 'Laurenthomas@gmail.com', client: 'Dominic Felton', date: 'August-12-2026', zip: 'letters/20003/Dominic_Felton_Supreme...zip', status: 'PRINTED AND MAILED', files: 3, statusType: 'success', statusDate: 'Aug 12, 2026 - 1:00am est' },
  { id: 8, user: 'blackstoneconsultants2022@gmail.com', client: 'Latricia Denise Amfowasa', date: 'August-11-2026', zip: 'letters/29642/Latricia.Denise_Amfowasa...zip', status: 'PRINTED AND MAILED', files: 12, statusType: 'success', statusDate: 'Aug 11, 2026 - 9:56pm est' },
  { id: 9, user: 'trapboutique@yahoo.com', client: 'Saul Quintero rea', date: 'August-11-2026', zip: 'letters/39644/Saul_Quintero.rea_Supreme1...zip', status: 'PROCESSING CURRENTLY PAUSED', files: 25, statusType: 'error', statusDate: 'Aug 11, 2026 - 7:14pm est' },
  { id: 10, user: 'trapboutique@yahoo.com', client: 'Saul Quintero rea', date: 'August-11-2026', zip: 'letters/39644/Saul_Quintero.rea_Supreme6...zip', status: 'Printed Awaiting Payment', files: 1, statusType: 'info', statusDate: 'Aug 11, 2026 - 9:41am est' },
];

export function PpamsArea() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'processing': return <Clock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />;
      case 'warning': return <AlertCircle className="w-3.5 h-3.5 text-orange-500" />;
      case 'info': return <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />;
      case 'error': return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string, type: string, date?: string) => {
    const baseClasses = "inline-flex flex-col items-start px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase border";
    let colorClasses = "";
    
    switch (type) {
      case 'success': colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-100"; break;
      case 'processing': colorClasses = "bg-blue-50 text-blue-700 border-blue-100"; break;
      case 'warning': colorClasses = "bg-orange-50 text-orange-700 border-orange-100"; break;
      case 'info': colorClasses = "bg-teal-50 text-teal-700 border-teal-100"; break;
      case 'error': colorClasses = "bg-red-50 text-red-700 border-red-100"; break;
    }

    return (
      <div className={`${baseClasses} ${colorClasses}`}>
        <div className="flex items-center gap-1.5">
          {getStatusIcon(type)}
          <span>{status}</span>
        </div>
        {date && <span className="text-[9px] font-medium opacity-80 mt-0.5 ml-5 normal-case tracking-normal">{date}</span>}
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              PPAMS AREA
              <span className="px-2.5 py-1 bg-orange-100 text-orange-600 text-xs rounded-md font-bold uppercase tracking-wider">Live</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage and track all printing and mailing operations.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search letters, clients, emails..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-inner"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-orange-500 hover:bg-orange-50 hover:border-orange-200 transition-all shadow-sm group">
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          
          {/* Top Pagination Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-center gap-1 bg-slate-50/50">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/30">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">3</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">4</button>
            <span className="px-2 text-slate-400 text-xs font-bold">...</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">8367</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">10494</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white text-[10px] uppercase tracking-widest font-black text-slate-400 border-b-2 border-slate-100">
                  <th className="px-6 py-4 w-16">#</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Client #</th>
                  <th className="px-6 py-4">Created/Generation Date</th>
                  <th className="px-6 py-4">Zip File</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center"># of Files</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-50">
                {DUMMY_DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-slate-400 font-bold">{row.id}</td>
                    <td className="px-6 py-4 text-orange-500 hover:text-orange-600 cursor-pointer transition-colors">{row.user}</td>
                    <td className="px-6 py-4 text-slate-700">{row.client}</td>
                    <td className="px-6 py-4 text-slate-500">{row.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 max-w-[250px]">
                        <FileArchive className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="text-orange-500 hover:text-orange-600 cursor-pointer truncate transition-colors" title={row.zip}>
                          {row.zip}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(row.status, row.statusType, row.statusDate)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition-all">
                        {row.files}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 shadow-sm transition-all group/btn" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 shadow-sm transition-all group/btn" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 shadow-sm transition-all group/btn" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Pagination Bar */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-1 bg-slate-50/50">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/30">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">3</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">4</button>
            <span className="px-2 text-slate-400 text-xs font-bold">...</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">8367</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-white hover:shadow-sm transition-all">10494</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}