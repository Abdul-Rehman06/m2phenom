import { useEffect, useMemo, useState } from 'react';
import { 
  User, FileText, Building2, Mail, 
  ChevronLeft, ChevronRight, Bold, Italic, Underline, 
  List, AlignLeft, UploadCloud, Eye, 
  Save, CheckCircle2, Trash2, Image as ImageIcon,
  RefreshCw, Plus
} from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, PageTransition, Select, Switch, Badge, Checkbox, Input, Textarea, LettersGeneratedModal } from '@/components';
import { APP_CONFIG } from '@/constants';
import { useUIStore } from '@/store';
import { cn } from '@/utils';

// --- MOCK DATA ---
const ACCOUNT_CATEGORIES = [
  { id: 'PI', name: 'PERSONAL INFORMATION', desc: 'Name, SSN, Date of Birth, Address, Employment information, etc.' },
  { id: 'PUB/PR', name: 'PUBLIC RECORDS', desc: 'Bankruptcies, Tax Liens, Judgments, Civil Suits, Public Filings.' },
  { id: 'INQ/IQ', name: 'ALL INQUIRIES', desc: 'Hard Inquiries, Soft Inquiries, All types from all sources.' },
  { id: 'SLCC', name: 'STUDENT LOAN CHARGE-OFFS', desc: 'Defaulted student loans, charged-off accounts, collections.' },
  { id: 'MCC', name: 'MEDICAL CHARGE-OFFS', desc: 'Medical debt sent to collections or charged-off.' },
  { id: 'AOCC', name: 'ALL OTHER CHARGE-OFFS', desc: 'Credit cards, personal loans, retail cards, auto loans, utilities, etc.' },
  { id: 'SLDL 3+', name: 'STUDENT LOAN LATES (3+)', desc: '3 or more late payments on student loans.' },
  { id: 'MDL 3+', name: 'MEDICAL LATES (3+)', desc: '3 or more late payments on medical accounts.' },
  { id: 'AODL 3+', name: 'ALL OTHER LATES (3+)', desc: '3 or more late payments on non-student, non-medical accounts.' },
  { id: 'SLDL 1-2', name: 'STUDENT LOAN LATES (1-2)', desc: '1 to 2 late payments on student loans.' },
  { id: 'MDL 1-2', name: 'MEDICAL LATES (1-2)', desc: '1 to 2 late payments on medical accounts.' },
  { id: 'AODL 1-2', name: 'ALL OTHER LATES (1-2)', desc: '1 to 2 late payments on non-student, non-medical accounts.' }
];

const ROUND_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  label: `Round ${i + 1}`,
  value: `round_${i + 1}`,
}));

const MAILING_OPTIONS = [
  { label: 'Print & Mail Myself', value: 'self' },
  { label: 'PPPAMS Provider (Ali badi)', value: 'pppams' },
];

const PRINT_IMAGE_OPTIONS = [
  { key: 'print1Sided', label: 'Print 1 Sided' },
  { key: 'print2Sided', label: 'Print 2 Sided' },
  { key: 'printColored', label: 'Print Colored' },
  { key: 'printBW', label: 'Print B&W' },
  { key: 'includeAllImages', label: 'Include ALL images' },
  { key: 'excludeImagesPI', label: 'Exclude Images on PI' },
  { key: 'excludeImagesPR', label: 'Exclude Images on PR' },
  { key: 'excludeImagesInquiries', label: 'Exclude Images on Inquiries' },
  { key: 'excludeImagesAccounts', label: 'Exclude Images on Accounts' },
];

const DUMMY_ACCOUNTS = [
  // PI (PERSONAL INFORMATION)
  { id: '1', category: 'PI', name: 'KERRON L MURPHY (NAME)', accountNo: 'N/A', status: 'Negative', iconType: 'user' },
  { id: '2', category: 'PI', name: '1500 PEACHTREE ST NW (ADDR)', accountNo: 'N/A', status: 'Positive', iconType: 'user' },
  { id: '3', category: 'PI', name: 'ABC CORP (EMPLOYER)', accountNo: 'N/A', status: 'Negative', iconType: 'user' },

  // PUB/PR (PUBLIC RECORDS)
  { id: '4', category: 'PUB/PR', name: 'FULTON COUNTY COURT', accountNo: '12-CV-3456', status: 'Negative', iconType: 'building' },
  { id: '5', category: 'PUB/PR', name: 'GA DEPT OF REVENUE', accountNo: 'TX-998877', status: 'Positive', iconType: 'building' },
  { id: '6', category: 'PUB/PR', name: 'US BANKRUPTCY COURT', accountNo: 'BK-100200', status: 'Negative', iconType: 'building' },

  // INQ/IQ (ALL INQUIRIES)
  { id: '7', category: 'INQ/IQ', name: 'WELLS FARGO AUTO', accountNo: 'N/A', status: 'Negative', iconType: 'file' },
  { id: '8', category: 'INQ/IQ', name: 'AMEX', accountNo: 'N/A', status: 'Positive', iconType: 'card' },
  { id: '9', category: 'INQ/IQ', name: 'VERIZON WIRELESS', accountNo: 'N/A', status: 'Negative', iconType: 'file' },

  // SLCC (STUDENT LOAN CHARGE-OFFS)
  { id: '10', category: 'SLCC', name: 'NAVIENT SOLUTIONS', accountNo: '445566778', status: 'Negative', iconType: 'bank' },
  { id: '11', category: 'SLCC', name: 'NELNET', accountNo: 'SL-887766', status: 'Positive', iconType: 'bank' },
  { id: '12', category: 'SLCC', name: 'GREAT LAKES EDU', accountNo: 'GL-554433', status: 'Negative', iconType: 'bank' },

  // MCC (MEDICAL CHARGE-OFFS)
  { id: '13', category: 'MCC', name: 'NORTHSIDE HOSPITAL', accountNo: 'MED-998877', status: 'Positive', iconType: 'building' },
  { id: '14', category: 'MCC', name: 'EMORY HEALTHCARE', accountNo: 'EM-112233', status: 'Negative', iconType: 'building' },
  { id: '15', category: 'MCC', name: 'ATLANTA DENTAL GROUP', accountNo: 'AD-445566', status: 'Negative', iconType: 'building' },

  // AOCC (ALL OTHER CHARGE-OFFS)
  { id: '16', category: 'AOCC', name: 'CAPITAL ONE BANK USA', accountNo: '987654321', status: 'Positive', iconType: 'bank' },
  { id: '17', category: 'AOCC', name: 'EXPRESS HANDYMAN, INC.', accountNo: '123456789', status: 'Negative', iconType: 'card' },
  { id: '18', category: 'AOCC', name: 'MACY\'S CREDIT', accountNo: 'MC-112233', status: 'Positive', iconType: 'card' },

  // SLDL 3+ (STUDENT LOAN LATES 3+)
  { id: '19', category: 'SLDL 3+', name: 'FEDLOAN SERVICING', accountNo: '556677889', status: 'Positive', iconType: 'bank' },
  { id: '20', category: 'SLDL 3+', name: 'MOHELA', accountNo: 'MH-998877', status: 'Negative', iconType: 'bank' },
  { id: '21', category: 'SLDL 3+', name: 'OSLA', accountNo: 'OS-112233', status: 'Positive', iconType: 'bank' },

  // MDL 3+ (MEDICAL LATES 3+)
  { id: '22', category: 'MDL 3+', name: 'PIEDMONT HOSPITAL', accountNo: 'PM-445566', status: 'Negative', iconType: 'building' },
  { id: '23', category: 'MDL 3+', name: 'RADIOLOGY ASSOC', accountNo: 'RA-778899', status: 'Positive', iconType: 'building' },
  { id: '24', category: 'MDL 3+', name: 'PEACHTREE ORTHO', accountNo: 'PO-112233', status: 'Negative', iconType: 'building' },

  // AODL 3+ (ALL OTHER LATES 3+)
  { id: '25', category: 'AODL 3+', name: 'DISCOVER FINANCIAL', accountNo: '6011223344', status: 'Negative', iconType: 'card' },
  { id: '26', category: 'AODL 3+', name: 'CITIBANK NA', accountNo: 'CB-998877', status: 'Positive', iconType: 'bank' },
  { id: '27', category: 'AODL 3+', name: 'BANK OF AMERICA', accountNo: 'BA-554433', status: 'Negative', iconType: 'bank' },

  // SLDL 1-2 (STUDENT LOAN LATES 1-2)
  { id: '28', category: 'SLDL 1-2', name: 'SALLIE MAE', accountNo: '778899001', status: 'Positive', iconType: 'bank' },
  { id: '29', category: 'SLDL 1-2', name: 'EDFINANCIAL', accountNo: 'ED-112233', status: 'Negative', iconType: 'bank' },
  { id: '30', category: 'SLDL 1-2', name: 'CORNERSTONE EDU', accountNo: 'CE-445566', status: 'Positive', iconType: 'bank' },

  // MDL 1-2 (MEDICAL LATES 1-2)
  { id: '31', category: 'MDL 1-2', name: 'WELLSTAR HEALTH', accountNo: 'WS-778899', status: 'Negative', iconType: 'building' },
  { id: '32', category: 'MDL 1-2', name: 'ATLANTA CARDIOLOGY', accountNo: 'AC-112233', status: 'Positive', iconType: 'building' },
  { id: '33', category: 'MDL 1-2', name: 'GEORGIA UROLOGY', accountNo: 'GU-445566', status: 'Negative', iconType: 'building' },

  // AODL 1-2 (ALL OTHER LATES 1-2)
  { id: '34', category: 'AODL 1-2', name: 'CHASE BANK', accountNo: '4147203040', status: 'Negative', iconType: 'bank' },
  { id: '35', category: 'AODL 1-2', name: 'TARGET CREDIT', accountNo: 'TG-998877', status: 'Positive', iconType: 'card' },
  { id: '36', category: 'AODL 1-2', name: 'SYNCHRONY BANK', accountNo: 'SY-112233', status: 'Negative', iconType: 'bank' }
];

const DESTINATIONS_LIST = [
  { id: 'show', label: 'Show', defaultChecked: true },
  { id: 'exp_9701', label: 'EXPERIAN PO BOX 9701, ALLEN, TX 75013', defaultChecked: false },
  { id: 'exp_4500', label: 'EXPERIAN PO BOX 4500, ALLEN, TX 75013', defaultChecked: true },
  { id: 'exp_legal', label: 'EXPERIAN SPV-LEGAL DEPT 701 EXPERIAN PKWY-POB 1240 ALLEN, TX 75013-3713', defaultChecked: false },
  { id: 'eq_740256', label: 'EQUIFAX PO Box740256, ATLANTA,GA 30374-0256', defaultChecked: true },
  { id: 'eq_740241', label: 'EQUIFAX PO Box740241, ATLANTA,GA 30374-0241', defaultChecked: false },
  { id: 'eq_legal', label: 'EQUIFAX-Legal Dept. 1550 PEACHTREE ST-NE ATLANTA, GA 30309', defaultChecked: false },
  { id: 'tu_2000', label: 'Trans Union PO Box 2000', defaultChecked: true },
  { id: 'tu_1000', label: 'Trans Union PO Box 1000', defaultChecked: false },
  { id: 'tu_2000_2', label: 'Trans Union PO Box 2000', defaultChecked: false },
  { id: 'tu_legal', label: 'TransUnion- Legal Dept. 555 West Adams Chicago, IL 60661', defaultChecked: false },
  { id: 'innovis_1', label: 'INNOVIS', defaultChecked: false },
  { id: 'innovis_2', label: 'INNOVIS', defaultChecked: false },
  { id: 'innovis_3', label: 'INNOVIS 875 Greentree Road', defaultChecked: false },
  { id: 'lexis_1', label: 'LexisNexis', defaultChecked: false },
  { id: 'lexis_2', label: 'LexisNexis RDM, POB 105615', defaultChecked: false },
  { id: 'sage_1', label: 'SAGE STREAM, LLC, Consumer Office', defaultChecked: false },
  { id: 'sage_2', label: 'SAGE STREAM LLC', defaultChecked: false },
  { id: 'chex', label: 'Chex Systems ATTN', defaultChecked: false },
  { id: 'mib_us', label: '(US RESIDENTS) MIB Inc', defaultChecked: false },
  { id: 'mib_can', label: '(CANADIAN RESIDENTS) MIB Inc', defaultChecked: false },
  { id: 'factor_1', label: 'FactorTrust', defaultChecked: false },
  { id: 'factor_2', label: 'FactorTrust P.O. Box 390', defaultChecked: false },
  { id: 'nctue', label: 'NCTUE', defaultChecked: false },
  { id: 'lexis_privacy', label: 'Lexis Nexis Privacy Information Manager', defaultChecked: false },
  { id: 'corelogic_1', label: 'Corelogic Credco', defaultChecked: false },
  { id: 'corelogic_2', label: 'CoreLogic Safe Rent', defaultChecked: false },
  { id: 'tenant', label: 'Tenant Data Services', defaultChecked: false },
  { id: 'advanced_res', label: 'Advanced Resolution Services', defaultChecked: false },
  { id: 'lci', label: 'LCI Consumer Center', defaultChecked: false },
  { id: 'clarity', label: 'Clarity Services, Inc., CSD', defaultChecked: false },
  { id: 'audit', label: 'Audit Analysis', defaultChecked: false },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'user': return <User className="w-4 h-4" />;
    case 'building': return <Building2 className="w-4 h-4" />;
    case 'file': return <FileText className="w-4 h-4" />;
    case 'bank': return <BankIcon />;
    case 'card': return <CreditCardIcon />;
    default: return <FileText className="w-4 h-4" />;
  }
};

// --- CONTENT BOX COMPONENT ---
function ContentBoxItem({ account, index, total, isActive, onRemove, onDuplicate, onScrollTop }: any) {
  const [include3, setInclude3] = useState(false);
  const [includeReporting, setIncludeReporting] = useState(true);
  const [toggles, setToggles] = useState({ row1: 'OFF', row2: 'ON' });

  const categoryInfo = ACCOUNT_CATEGORIES.find(c => c.id === account.category);

  return (
    <div id={`account-box-${account.id}`} className={cn("w-full scroll-mt-6 transition-all duration-300", isActive ? "ring-4 ring-[#f97316] ring-offset-2 rounded-xl" : "")}>
      <Card className="bg-white border-gray-200 shadow-sm p-4 xl:p-6 rounded-xl flex flex-col gap-6 relative w-full min-w-0 overflow-hidden">
        
        {/* Remove button at top right */}
        <button onClick={() => onRemove(account.id)} className="absolute top-4 right-4 text-[10px] font-bold text-red-400 hover:text-red-600 uppercase">Remove</button>

        <div className="flex items-center justify-between pb-4 border-b border-gray-100 w-full min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">{index + 1}</div>
            <div className="min-w-0 flex flex-col">
              <h2 className="text-lg font-bold text-gray-900 truncate">Edit: {account.name}</h2>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate" title={categoryInfo?.name}>{account.category} - {categoryInfo?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pr-12 shrink-0">
            <span className="text-sm text-gray-500 font-medium">Item {index + 1} of {total}</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Form Top Section: Image + Dropdowns */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full min-w-0">
          {/* Image Upload */}
          <div className="xl:col-span-1 flex flex-col gap-2 min-w-0 w-full">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">Add Image</label>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors h-full min-h-[160px] w-full min-w-0">
              <UploadCloud className="w-6 h-6 text-gray-400 mb-2 shrink-0" />
              <div className="bg-white border border-gray-200 text-xs font-semibold px-3 py-1.5 rounded shadow-sm mb-3">Choose File</div>
              <span className="text-[10px] text-green-600 font-bold bg-green-50 border border-green-100 px-2 py-1 rounded truncate max-w-full">Bank Account Profile</span>
            </div>
          </div>

          {/* Dropdowns */}
          <div className="xl:col-span-2 flex flex-col gap-3 min-w-0 w-full">
            <div className="flex flex-col gap-1 w-full min-w-0">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">Discrepancy</label>
              <Select options={[{label: `Use Opulence (WP) C/Letter for ${account.category} items`, value: '1'}]} className="w-full text-sm bg-white" />
            </div>
            <div className="flex flex-col gap-1 w-full min-w-0">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">Type of Project/Issues</label>
              <Select options={[{label: categoryInfo?.desc || 'Select Issue', value: '1'}]} className="w-full text-sm bg-white" />
            </div>
            <div className="flex flex-col gap-1 w-full min-w-0">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">Template Letter For This Item</label>
              <Select options={[{label: 'For Bureaus: use Opulence (WP) C General Template Letter', value: '1'}]} className="w-full text-sm bg-white" />
            </div>
            <div className="flex flex-col gap-1 w-full min-w-0">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">Template Letter For Data Furnisher/Creditor</label>
              <Select options={[{label: 'Please select template', value: '1'}]} className="w-full text-sm bg-white" />
            </div>
          </div>
        </div>

        {/* Content / Data View */}
        <div className="w-full min-w-0 border border-gray-200 rounded-xl overflow-hidden shadow-sm mt-2">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[650px] flex flex-col">
              
              {/* Toolbar */}
              <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase px-2 whitespace-nowrap">Go To Report →</span>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><ImageIcon className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Bold className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Italic className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Underline className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><List className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><AlignLeft className="w-4 h-4" /></button>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-600 uppercase">
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#f97316]">
                    <Checkbox checked={include3} onChange={(e) => setInclude3(e.target.checked)} className="w-3.5 h-3.5 shrink-0 checked:border-[#f97316] checked:bg-[#f97316]" /> 
                    <span className="whitespace-nowrap">Include all 3 bureaus</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[#f97316]">
                    <Checkbox checked={includeReporting} onChange={(e) => setIncludeReporting(e.target.checked)} className="w-3.5 h-3.5 shrink-0 checked:border-[#f97316] checked:bg-[#f97316]" /> 
                    <span className="whitespace-nowrap">Include currently reporting</span>
                  </label>
                  <span className="text-gray-300">|</span>
                  <button className="hover:text-gray-900 tracking-wider">Generate</button>
                  <span className="text-gray-300">|</span>
                  <button onClick={onScrollTop} className="hover:text-gray-900 tracking-wider">Top ↑</button>
                </div>
              </div>

              {/* Data Display Area */}
              <div className="p-5 bg-white flex flex-col gap-6 w-full">
                {/* Data Row 1 */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 w-full">
                    <span className="text-sm font-bold text-gray-800">{categoryInfo?.name} Details</span>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => setToggles(prev => ({...prev, row1: 'OFF'}))} className={cn("px-4 py-1 text-xs font-bold rounded-full shadow-sm transition-colors", toggles.row1 === 'OFF' ? "bg-gray-200 text-gray-600" : "bg-teal-500 text-white hover:bg-teal-600")}>OFF</button>
                      <button onClick={() => setToggles(prev => ({...prev, row1: 'ON'}))} className={cn("px-4 py-1 text-xs font-bold rounded-full shadow-sm transition-colors", toggles.row1 === 'ON' ? "bg-gray-200 text-gray-600" : "bg-teal-500 text-white hover:bg-teal-600")}>ON</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 items-center pl-2 w-full">
                    <div className="text-[11px] font-bold text-red-500 leading-tight">*INDICATES Consumer's Primary Name:</div>
                    <div className="bg-yellow-200/60 border border-yellow-400 text-yellow-900 text-xs font-bold p-2.5 rounded text-center shadow-sm truncate" title={account.name}>{account.name}</div>
                    <div className="bg-yellow-200/60 border border-yellow-400 text-yellow-900 text-xs font-bold p-2.5 rounded text-center shadow-sm truncate" title={account.name}>{account.name}</div>
                    <div className="bg-yellow-200/60 border border-yellow-400 text-yellow-900 text-xs font-bold p-2.5 rounded text-center shadow-sm truncate" title={account.name}>{account.name}</div>
                  </div>
                </div>

                {/* Data Row 2 */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 w-full">
                    <span className="text-sm font-bold text-gray-800">Account Discrepancies</span>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => setToggles(prev => ({...prev, row2: 'OFF'}))} className={cn("px-4 py-1 text-xs font-bold rounded-full shadow-sm transition-colors", toggles.row2 === 'OFF' ? "bg-gray-200 text-gray-600" : "bg-teal-500 text-white hover:bg-teal-600")}>OFF</button>
                      <button onClick={() => setToggles(prev => ({...prev, row2: 'ON'}))} className={cn("px-4 py-1 text-xs font-bold rounded-full shadow-sm transition-colors", toggles.row2 === 'ON' ? "bg-gray-200 text-gray-600" : "bg-teal-500 text-white hover:bg-teal-600")}>ON</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 items-center pl-2 w-full">
                    <div className="text-[11px] font-bold text-red-500 leading-tight">*INDICATES Account Status:</div>
                    <div className="bg-[#a3e635]/40 border border-[#84cc16] text-green-900 text-[10px] font-bold p-2 rounded text-center shadow-sm leading-tight">{account.status}</div>
                    <div className="bg-[#a3e635]/40 border border-[#84cc16] text-green-900 text-[10px] font-bold p-2 rounded text-center shadow-sm leading-tight">{account.status}</div>
                    <div className="text-center font-bold text-gray-400 text-xl">-</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 w-full min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => onDuplicate(account.id)} className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold shadow-sm whitespace-nowrap">
              + Add Another Content
            </Button>
            <Button onClick={() => onRemove(account.id)} variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold bg-red-50/50 whitespace-nowrap">
              - Remove this Content Box
            </Button>
          </div>
          <Button className="bg-gray-900 hover:bg-black text-white font-bold shadow-sm whitespace-nowrap">
            <Save className="w-4 h-4 mr-2" /> Save Item
          </Button>
        </div>

      </Card>
    </div>
  );
}


export function PowerUserGenerator() {
  const { openConfirmDialog, openModal } = useUIStore();
  const [accounts, setAccounts] = useState(DUMMY_ACCOUNTS);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(DUMMY_ACCOUNTS[0]?.id || null);
  const [activeTab, setActiveTab] = useState<'general' | 'client'>('general');
  const [roundOfAttack, setRoundOfAttack] = useState<string>(ROUND_OPTIONS[0]?.value || 'round_1');
  const [mailingOption, setMailingOption] = useState<'self' | 'pppams'>('self');

  const [pppamsInfo, setPppamsInfo] = useState({
    prodigyUsername: 'Dion',
    name: 'Dion',
    facebookUsername: '',
    email: 'dion@gmail.com',
    phone: '+15111111111',
    notes: '',
  });

  const [printImageOpts, setPrintImageOpts] = useState<Record<string, boolean>>({
    print1Sided: true,
    print2Sided: false,
    printColored: false,
    printBW: true,
    includeAllImages: true,
    excludeImagesPI: false,
    excludeImagesPR: false,
    excludeImagesInquiries: false,
    excludeImagesAccounts: false,
  });
  const [documentOptionPick, setDocumentOptionPick] = useState<string>('');

  const [generatedZipUrl, setGeneratedZipUrl] = useState<string | null>(null);

  const [globalOpts, setGlobalOpts] = useState({
    include3: false,
    includeReporting: true,
    includeAll: false,
    hidePositive: false
  });

  const [dests, setDests] = useState(() => {
    const initialDests: Record<string, boolean> = {};
    DESTINATIONS_LIST.forEach(d => {
      initialDests[d.id] = d.defaultChecked;
    });
    return initialDests;
  });

  const filteredAccounts = useMemo(() => {
    if (!globalOpts.hidePositive) return accounts;
    return accounts.filter(a => a.status !== 'Positive' && a.status !== 'Postive' && a.status !== 'Ready');
  }, [accounts, globalOpts.hidePositive]);

  const selectedDocumentOptionsCount = useMemo(() => {
    return PRINT_IMAGE_OPTIONS.filter((o) => !!printImageOpts[o.key]).length;
  }, [printImageOpts]);

  useEffect(() => {
    return () => {
      if (generatedZipUrl) URL.revokeObjectURL(generatedZipUrl);
    };
  }, [generatedZipUrl]);

  const scrollToAccount = (id: string) => {
    setActiveAccountId(id);
    const el = document.getElementById(`account-box-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const removeAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  const duplicateAccount = (id: string) => {
    setAccounts(prev => {
      const idx = prev.findIndex(a => a.id === id);
      if (idx === -1) return prev;
      const newAcc = { ...prev[idx], id: Math.random().toString(36).substr(2, 9) };
      const newArr = [...prev];
      newArr.splice(idx + 1, 0, newAcc);
      return newArr;
    });
  };

  const handleSelectAllDests = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newDests: Record<string, boolean> = {};
    DESTINATIONS_LIST.forEach(d => {
      newDests[d.id] = checked;
    });
    setDests(newDests);
  };

  const isAllDestsSelected = Object.values(dests).every(v => v);
  const selectedDestsCount = Object.values(dests).filter(Boolean).length;

  const handleGenerateLetters = () => {
    openConfirmDialog({
      title: 'Generate Letters',
      description: 'Are you sure you want to generate letters for this round of attacks?',
      confirmText: 'Yes, Generate',
      cancelText: 'Cancel',
      onConfirm: () => {
        const payload = [
          `M2 PHENOM - Letters Generated`,
          `Round: ${roundOfAttack}`,
          `Items: ${filteredAccounts.length}`,
          `Mailing: ${mailingOption === 'pppams' ? 'PPPAMS Provider (Ali badi)' : 'Print & Mail Myself'}`,
        ].join('\n');

        const blob = new Blob([payload], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        setGeneratedZipUrl(url);

        openModal(
          <LettersGeneratedModal
            zipUrl={url}
            fileName={`letters_${roundOfAttack}.zip`}
            roundLabel={ROUND_OPTIONS.find(r => r.value === roundOfAttack)?.label || roundOfAttack}
            itemsCount={filteredAccounts.length}
            initialMailingProvider={mailingOption}
          />,
          'lg'
        );
      },
    });
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col bg-[#f8f9fa] overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2 w-full">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Attack Builder</h1>
              <p className="text-gray-500 text-sm">Advanced configuration, content generation, and routing.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleGenerateLetters} className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold shadow-md hover:shadow-lg transition-all border-none">
                <FileText className="w-4 h-4 mr-2" /> Generate Letters
              </Button>
            </div>
          </div>

          {/* Top Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-6 w-full">
            <button 
              onClick={() => setActiveTab('general')}
              className={cn("pb-3 text-sm font-bold transition-colors", activeTab === 'general' ? "text-[#f97316] border-b-2 border-[#f97316]" : "text-gray-500 hover:text-gray-700")}
            >
              General Setting
            </button>
            <button 
              onClick={() => setActiveTab('client')}
              className={cn("pb-3 text-sm font-bold transition-colors", activeTab === 'client' ? "text-[#f97316] border-b-2 border-[#f97316]" : "text-gray-500 hover:text-gray-700")}
            >
              Client Info
            </button>
          </div>

          {activeTab === 'general' && (
          <Card id="top-filter-bar" className="bg-white border-gray-200 shadow-sm p-4 mb-6 rounded-xl flex flex-col gap-4 w-full min-w-0">
            
            {/* Row 1: Primary Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
              <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-gray-50/50 w-full min-w-0">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 truncate">Select Client</label>
                  <Select options={[{label: 'Kerron Lennon - Sample', value: '1'}]} className="w-full h-8 min-h-[32px] text-sm border-none bg-transparent p-0 font-semibold text-gray-900 focus:ring-0 truncate" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-gray-50/50 w-full min-w-0">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 truncate">Select Credit Report</label>
                  <Select options={[{label: 'EPIC PRO Report V2 10/04/2026', value: '1'}]} className="w-full h-8 min-h-[32px] text-sm border-none bg-transparent p-0 font-semibold text-gray-900 focus:ring-0 truncate" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-gray-50/50 w-full min-w-0">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 truncate">Select Round of Attack Number</label>
                  <Select
                    value={roundOfAttack}
                    onChange={(e) => setRoundOfAttack(e.target.value)}
                    options={ROUND_OPTIONS}
                    className="w-full h-8 min-h-[32px] text-sm border-none bg-transparent p-0 font-semibold text-gray-900 focus:ring-0 truncate"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-gray-50/50 w-full min-w-0">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 truncate">Printing & Mailing Option</label>
                  <Select
                    value={mailingOption}
                    onChange={(e) => setMailingOption(e.target.value as any)}
                    options={MAILING_OPTIONS}
                    className="w-full h-8 min-h-[32px] text-sm border-none bg-transparent p-0 font-semibold text-gray-900 focus:ring-0 truncate"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Secondary Options */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 px-1 pt-3 border-t border-gray-100 w-full min-w-0">
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Document Options ({selectedDocumentOptionsCount})
                </label>
                <Select
                  value={documentOptionPick}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) return;
                    setPrintImageOpts((p) => ({ ...p, [v]: !p[v] }));
                    setDocumentOptionPick('');
                  }}
                  options={[
                    { label: 'Select all that applies', value: '' },
                    ...PRINT_IMAGE_OPTIONS.map((o) => ({ label: o.label, value: o.key })),
                  ]}
                  className="h-8 text-xs bg-gray-50 border-gray-200 min-w-[220px]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer group">
                <Checkbox checked={globalOpts.include3} onChange={(e) => setGlobalOpts(p => ({...p, include3: e.target.checked}))} className="w-4 h-4 shrink-0 checked:bg-[#f97316] checked:border-[#f97316]" />
                <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900 whitespace-nowrap">Include all 3 bureaus</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <Checkbox checked={globalOpts.includeReporting} onChange={(e) => setGlobalOpts(p => ({...p, includeReporting: e.target.checked}))} className="w-4 h-4 shrink-0 checked:bg-[#f97316] checked:border-[#f97316]" />
                <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900 whitespace-nowrap">Include currently reporting</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <Checkbox checked={globalOpts.includeAll} onChange={(e) => setGlobalOpts(p => ({...p, includeAll: e.target.checked}))} className="w-4 h-4 shrink-0 checked:bg-red-500 checked:border-red-500" />
                <span className="text-xs font-bold text-red-500 group-hover:text-red-600 whitespace-nowrap">Include All</span>
              </label>

              <div className="ml-auto flex items-center gap-3 shrink-0">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-700">Hide Positive Items</span>
                <Switch checked={globalOpts.hidePositive} onCheckedChange={(v) => setGlobalOpts(p => ({...p, hidePositive: v}))} />
              </div>
            </div>

            {mailingOption === 'pppams' && (
              <div className="mt-2 border-t border-gray-100 pt-5">
                <div className="text-sm font-extrabold text-gray-900 mb-1">PPPAMS INFO</div>
                <div className="text-sm text-gray-700 font-semibold leading-relaxed">
                  CONGRATULATIONS of your selection of PPAMS Provider, to execute your physical printing out, enveloping, stamping and mailing off of your Prodigy Surge attack letter(s). Please provide your selected PPAMs provider with the following necessary information:
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">My Prodigy username is</label>
                    <Input
                      value={pppamsInfo.prodigyUsername}
                      onChange={(e) => setPppamsInfo((p) => ({ ...p, prodigyUsername: e.target.value }))}
                      className="bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      My NAME is <span className="text-red-500">(Required)</span>
                    </label>
                    <Input
                      value={pppamsInfo.name}
                      onChange={(e) => setPppamsInfo((p) => ({ ...p, name: e.target.value }))}
                      className="bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      My Facebook username is <span className="text-red-500">(Required)</span>
                    </label>
                    <Input
                      value={pppamsInfo.facebookUsername}
                      onChange={(e) => setPppamsInfo((p) => ({ ...p, facebookUsername: e.target.value }))}
                      className="bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      My best email is <span className="text-red-500">(Required)</span>
                    </label>
                    <Input
                      value={pppamsInfo.email}
                      onChange={(e) => setPppamsInfo((p) => ({ ...p, email: e.target.value }))}
                      className="bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      My best Phone number is <span className="text-red-500">(Required)</span>
                    </label>
                    <Input
                      value={pppamsInfo.phone}
                      onChange={(e) => setPppamsInfo((p) => ({ ...p, phone: e.target.value }))}
                      className="bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">NOTES:(add UP to 750 characters as note to PPAMS Provider if desired)</label>
                    <Textarea
                      value={pppamsInfo.notes}
                      onChange={(e) => setPppamsInfo((p) => ({ ...p, notes: e.target.value.slice(0, 750) }))}
                      className="bg-white min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            )}
            
          </Card>
          )}

          {activeTab === 'client' && (
            <Card id="client-info-bar" className="bg-white border-gray-200 shadow-sm p-6 mb-6 rounded-xl flex flex-col gap-6 w-full min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 w-full">
                
                {/* Row 1 Left */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 sm:col-span-5">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5">Today's Date is</label>
                    <Input defaultValue="July 15 2026" className="bg-white w-full h-9 text-sm" />
                  </div>
                  <div className="col-span-3 sm:col-span-3 flex flex-col">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5">Do Not Populate Date</label>
                    <div className="h-9 flex items-center"><Checkbox className="w-4 h-4 checked:bg-[#f97316] checked:border-[#f97316]" /></div>
                  </div>
                  <div className="col-span-3 sm:col-span-4 flex flex-col">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5">Remove Today's Date</label>
                    <div className="h-9 flex items-center"><Checkbox className="w-4 h-4 checked:bg-[#f97316] checked:border-[#f97316]" /></div>
                  </div>
                </div>

                {/* Row 1 Right */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1.5">Credit Report Data Resource or Monitoring</label>
                  <Input defaultValue="EpicPro-V2 03/04/2026" className="bg-white w-full h-9 text-sm" />
                </div>

                {/* Row 2 Left */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1.5"><span className="text-red-500">*</span> Name (at least First and Last Name)</label>
                  <Input defaultValue="Caron Elizabeth Sample" className="bg-white w-full h-9 text-sm" />
                </div>

                {/* Row 2 Right */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1.5"><span className="text-red-500">*</span> Address (at least Street Number, Street Name)</label>
                  <Input defaultValue="11693 Sheldon Street" className="bg-white w-full h-9 text-sm" />
                </div>

                {/* Row 3 Left */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5"><span className="text-red-500">*</span> City</label>
                    <Input defaultValue="Sun Valley" className="bg-white w-full h-9 text-sm" />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5"><span className="text-red-500">*</span> State</label>
                    <Input defaultValue="CA" className="bg-white w-full h-9 text-sm" />
                  </div>
                  <div className="col-span-4">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5"><span className="text-red-500">*</span> Zip</label>
                    <Input defaultValue="91352" className="bg-white w-full h-9 text-sm" />
                  </div>
                </div>

                {/* Row 3 Right */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1.5">Date of Birth</label>
                  <Input defaultValue="01/11/1966" className="bg-white w-full h-9 text-sm" />
                </div>

                {/* Row 4 Left */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1.5">Social Security Number (last four ONLY displayed on ANY DOCUMENT)</label>
                  <Input defaultValue="0012" className="bg-white w-full h-9 text-sm" />
                </div>

                {/* Row 4 Right */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1.5">Personal Tracking Number</label>
                  <div className="relative">
                    <Input defaultValue="5926 1010 7457 7701 4365" className="bg-white w-full h-9 text-sm pr-10" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-600 transition-colors">
                      <RefreshCw className="w-4 h-4 font-bold" />
                    </button>
                  </div>
                </div>

              </div>
            </Card>
          )}

          {/* Main 3-Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 w-full items-start">
            
            {/* COLUMN 1: Accounts to Review */}
            <div className="xl:col-span-1 flex flex-col gap-3 min-w-0 w-full xl:sticky xl:top-8 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
              <div className="flex items-center gap-3 mb-2 px-1 sticky top-0 bg-[#f8f9fa] py-2 z-10 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#f97316] text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">{filteredAccounts.length}</div>
                <h2 className="text-lg font-bold text-gray-900 truncate">Accounts to Review</h2>
              </div>

              {filteredAccounts.map((acc) => {
                const isActive = activeAccountId === acc.id;
                return (
                  <div 
                    key={acc.id} 
                    onClick={() => scrollToAccount(acc.id)}
                    className={cn(
                      "bg-white border rounded-xl p-4 shadow-sm transition-colors cursor-pointer w-full min-w-0 shrink-0 relative overflow-hidden",
                      isActive ? "border-[#f97316] border-2" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-[#f97316]"></div>}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={cn("mt-1 shrink-0", isActive ? "text-[#f97316]" : "text-gray-400")}>
                          {getIcon(acc.iconType)}
                        </div>
                        <div className="min-w-0 flex flex-col">
                          <div className="text-[9px] font-bold text-gray-400 uppercase mb-0.5 truncate">{acc.category}</div>
                          <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">{acc.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">Acct # {acc.accountNo}</p>
                        </div>
                      </div>
                      <Badge className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0", 
                        acc.status === 'Negative' ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-green-50 text-green-600 border-green-200"
                      )}>{acc.status}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* COLUMN 2: Edit Selected Item */}
            <div className="xl:col-span-2 flex flex-col gap-6 min-w-0 w-full">
              {filteredAccounts.map((acc, idx) => (
                <ContentBoxItem 
                  key={acc.id} 
                  account={acc} 
                  index={idx} 
                  total={filteredAccounts.length} 
                  isActive={activeAccountId === acc.id}
                  onRemove={removeAccount}
                  onDuplicate={duplicateAccount}
                  onScrollTop={() => document.getElementById('top-filter-bar')?.scrollIntoView({ behavior: 'smooth' })}
                />
              ))}
              {filteredAccounts.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500 font-bold">No accounts left to review.</p>
                </div>
              )}
            </div>

            {/* COLUMN 3: Send To */}
            <div className="xl:col-span-1 flex flex-col gap-6 min-w-0 w-full xl:sticky xl:top-8 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
              
              <div className="flex items-center gap-3 px-1 w-full min-w-0 sticky top-0 bg-[#f8f9fa] py-2 z-10 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#f97316] text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">3</div>
                <h2 className="text-lg font-bold text-gray-900 truncate">Send To</h2>
              </div>

              <div className="flex flex-col gap-0 w-full min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm shrink-0 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-red-500">5 Letter in</span>
                    <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">CONTENT DESTINATION(s)</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group w-full min-w-0 border-b border-gray-100 pb-3">
                    <Checkbox checked={isAllDestsSelected} onChange={handleSelectAllDests} className="shrink-0 checked:bg-gray-900 checked:border-gray-900" />
                    <span className="text-sm font-bold text-gray-900 truncate">Select All Destinations</span>
                  </label>

                  <div className="flex flex-col gap-2.5 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                    {DESTINATIONS_LIST.map((dest) => (
                      <label key={dest.id} className="flex items-start gap-3 cursor-pointer group w-full min-w-0">
                        <Checkbox 
                          checked={dests[dest.id] || false} 
                          onChange={(e) => setDests(p => ({...p, [dest.id]: e.target.checked}))} 
                          className="mt-0.5 shrink-0 checked:bg-gray-900 checked:border-gray-900" 
                        />
                        <span className="text-xs text-gray-700 group-hover:text-gray-900 leading-tight break-words whitespace-normal min-w-0">
                          {dest.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-2 flex gap-2">
                    <Input placeholder="Address should be Line1, Line2, Line3" className="text-sm h-10 w-full bg-white" />
                    <Button className="w-10 h-10 p-0 shrink-0 bg-white border border-gray-200 text-green-500 hover:bg-green-50 hover:text-green-600 shadow-sm">
                      <Plus className="w-5 h-5 font-bold" />
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="bg-orange-50 border border-orange-100 shadow-sm p-6 rounded-xl mt-1 flex flex-col gap-4 w-full min-w-0 shrink-0">
                <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                  <span>Items selected</span>
                  <span className="font-bold text-orange-600 text-lg">{filteredAccounts.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                  <span>Destinations selected</span>
                  <span className="font-bold text-orange-600 text-lg">{selectedDestsCount}</span>
                </div>
                <div className="pt-4 border-t border-orange-200/50 flex items-center justify-center gap-2 text-green-600 font-bold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" /> <span className="truncate">Ready to generate</span>
                </div>
              </Card>

            </div>

          </div>

          {/* Bottom Global Images Section */}
          <Card className="mt-8 p-8 bg-white border-gray-200 shadow-sm rounded-xl max-w-4xl mx-auto w-full min-w-0">
            <div className="flex flex-col items-center justify-center text-center w-full min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-4">Current Images</h3>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-6 w-full min-w-0">
                <span className="truncate">PHOTO IDENTIFICATION -</span>
                <span className="truncate">ADDRESS PROOF -</span>
                <span className="truncate">OTHER FILE 1 -</span>
                <span className="truncate">OTHER FILE 2 -</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 w-full max-w-md min-w-0">
                <div className="relative flex-1 min-w-0">
                  <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer border border-gray-200 rounded-lg bg-white shadow-sm" 
                  />
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="w-10 h-10 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-200 transition-colors shadow-sm">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center cursor-pointer hover:bg-red-200 transition-colors shadow-sm">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

        </ContentWrapper>
      </div>
    </PageTransition>
  );
}

// Simple Icon Placeholders for the cards
const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
);
const BankIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M12 14v2"/><path d="M3 10L12 3l9 7"/></svg>
);
