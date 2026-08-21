import { useState } from 'react';
import { 
  Search, ChevronDown, Star, Phone, Check, 
  Image as ImageIcon, Send, MessageSquare 
} from 'lucide-react';
import { PageTransition } from '@/components';
import { ContentWrapper } from '@/layouts';

export function CommunicationInbox() {
  const [activeTab, setActiveTab] = useState('Messages');
  
  const contacts = [
    { id: 1, init: 'JD', name: 'John Doe', active: true, unread: 1, color: 'bg-orange-100 text-orange-700' },
    { id: 2, init: 'JS', name: 'Jane Smith', active: false, unread: 3, color: 'bg-orange-100 text-orange-700' },
    { id: 3, init: 'AJ', name: 'Alice Johnson', active: false, unread: 0, color: 'bg-slate-100 text-slate-700' },
    { id: 4, init: 'BW', name: 'Bob Williams', active: false, unread: 0, color: 'bg-orange-100 text-orange-700' },
    { id: 5, init: 'MB', name: 'Michael Brown', active: false, unread: 0, color: 'bg-slate-100 text-slate-700' },
    { id: 6, init: 'ED', name: 'Emma Davis', active: false, unread: 0, color: 'bg-orange-100 text-orange-700' },
    { id: 7, init: 'DW', name: 'David Wilson', active: false, unread: 0, color: 'bg-slate-100 text-slate-700' },
    { id: 8, init: 'SM', name: 'Sarah Miller', active: false, unread: 0, color: 'bg-slate-100 text-slate-700' },
    { id: 9, init: 'JT', name: 'James Taylor', active: false, unread: 0, color: 'bg-orange-100 text-orange-700' },
    { id: 10, init: 'OA', name: 'Olivia Anderson', active: false, unread: 0, color: 'bg-slate-100 text-slate-700' },
    { id: 11, init: 'WT', name: 'William Thomas', active: false, unread: 0, color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-[calc(100vh-64px)] w-full flex flex-col bg-slate-50">
        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 py-6 h-[calc(100vh-80px)] flex flex-col">
          
          <div className="mb-4 w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Communication Portal</h1>
          </div>

          <div className="flex-1 flex overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm w-full">
            
            {/* LEFT SIDEBAR - INBOX LIST */}
            <div className="w-[320px] flex-shrink-0 border-r border-slate-200 flex flex-col bg-white">
              
              {/* Header & Filters */}
              <div className="p-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Inbox</h2>
                <div className="flex items-center gap-2 mb-3">
                  <button className="flex items-center justify-between px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex-1 transition-colors">
                    Newest <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex-1 transition-colors">
                    All Labels <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex-1 transition-colors">
                    Past 30 Days <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <div className="w-6 flex justify-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer" defaultChecked />
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-shadow"
                  />
                </div>
              </div>

              {/* List Header */}
              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</span>
              </div>

              {/* Contacts List */}
              <div className="flex-1 overflow-y-auto">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className={`flex items-center px-4 py-3 cursor-pointer border-b border-slate-50 transition-colors ${contact.active ? 'bg-orange-50/50 border-l-2 border-l-orange-500' : 'hover:bg-slate-50 border-l-2 border-l-transparent'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${contact.color}`}>
                      {contact.init}
                    </div>
                    <div className="ml-3 flex-1 flex items-center justify-between min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0 truncate">
                        <Star className={`w-3.5 h-3.5 shrink-0 ${contact.active ? 'text-orange-400 fill-orange-400' : 'text-slate-300'}`} strokeWidth={2} />
                        <span className={`text-sm font-bold truncate ${contact.active ? 'text-slate-900' : 'text-slate-700'}`}>
                          {contact.name}
                        </span>
                      </div>
                      {contact.unread > 0 && (
                        <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 shadow-sm">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT MAIN AREA - CHAT VIEW */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold">
                    JD
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" strokeWidth={2} />
                    <h3 className="text-lg font-bold text-slate-900">John Doe</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-medium">
                    <Phone className="w-4 h-4" />
                    +1 (555) 019-2834
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    Opt Out
                  </button>
                  <div className="text-sm text-slate-500">
                    Deal Status: <span className="text-slate-700 font-medium">(Internal Agency)</span>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white shadow-sm transition-colors">
                    Select status <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 border-b border-slate-200 flex gap-6">
                {['Messages', 'Info', 'Notes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-sm font-bold border-b-2 transition-colors ${
                      activeTab === tab 
                        ? 'border-orange-500 text-orange-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto bg-[#fafafa] p-6 flex flex-col">
                
                <div className="flex justify-center my-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                    Friday, August 14, 2026
                  </span>
                </div>

                <div className="flex flex-col items-end mb-2">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[75%] shadow-md">
                    <p className="text-[15px] leading-relaxed">
                      Hi John, just following up on your recent inquiry. Let us know if you need any help getting started with your account.<br/>
                      <a href="#" className="text-white underline font-bold opacity-90 hover:opacity-100 transition-opacity">https://demo.m2phenom.com/setup</a>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mt-1.5 mr-1">
                    5:06 AM <Check className="w-3.5 h-3.5 text-orange-500" strokeWidth={3} />
                  </div>
                </div>

                <div className="flex justify-center my-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                    Friday, August 21, 2026
                  </span>
                </div>

                <div className="flex flex-col items-start mb-2">
                  <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[75%] shadow-sm">
                    <p className="text-[15px] leading-relaxed">
                      Sounds good, I will check it out later today!
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mt-1.5 ml-1">
                    9:33 AM
                  </div>
                </div>

              </div>

              {/* Message Input Area */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-end gap-3">
                  <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shrink-0 h-[46px] flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <div className="flex-1 border border-slate-200 rounded-xl bg-white overflow-hidden focus-within:ring-1 focus-within:ring-orange-500 focus-within:border-orange-500 shadow-sm transition-shadow">
                    <textarea 
                      placeholder="Type a message..." 
                      className="w-full max-h-32 min-h-[46px] p-3 text-sm resize-none outline-none text-slate-800 bg-transparent placeholder-slate-400"
                      rows={1}
                    />
                  </div>
                  <button className="h-[46px] px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl flex items-center justify-center gap-2 font-bold shadow-md transition-all hover:scale-[1.02] shrink-0">
                    <Send className="w-4 h-4" /> Send
                  </button>
                  <button className="h-[46px] w-[46px] bg-slate-900 hover:bg-black text-white rounded-xl flex items-center justify-center shadow-md transition-all hover:scale-[1.02] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
