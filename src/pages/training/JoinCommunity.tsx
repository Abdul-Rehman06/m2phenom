import { useState } from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';
import { cn } from '@/utils';

export function JoinCommunity() {
  const [activeTab, setActiveTab] = useState<'facebook' | 'skool'>('facebook');

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="mb-8 w-full text-center">
            <div className="w-16 h-16 bg-orange-100 text-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Communities</h1>
            <p className="text-gray-500">Connect with other members, share success stories, and get exclusive updates.</p>
          </div>

          <Card className="border-border shadow-sm bg-white overflow-hidden flex flex-col w-full p-4 sm:p-8">
            
            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl w-full max-w-md mx-auto mb-8 shadow-inner">
              <button
                onClick={() => setActiveTab('facebook')}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
                  activeTab === 'facebook' 
                    ? "bg-white text-[#1877F2] shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Facebook Community
              </button>
              <button
                onClick={() => setActiveTab('skool')}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
                  activeTab === 'skool' 
                    ? "bg-white text-orange-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Metro 2 A.I Skool
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col items-center justify-center">
              {activeTab === 'facebook' ? (
                <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                  <div className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg mb-8 bg-gray-50 flex items-center justify-center">
                    <img 
                      src="/Facebook.png" 
                      alt="Facebook Community Preview" 
                      className="w-full max-h-[600px] object-contain"
                    />
                  </div>
                  <Button 
                    onClick={() => window.open('https://www.facebook.com/groups/417042633674334', '_blank')}
                    className="bg-[#1877F2] hover:bg-[#1864F2] text-white font-bold px-10 py-5 h-auto text-lg shadow-xl hover:-translate-y-1 transition-all rounded-xl"
                  >
                    Join Facebook Group <ExternalLink className="w-5 h-5 ml-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                  <div className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg mb-8 bg-gray-50 flex items-center justify-center">
                    <img 
                      src="/Skool.png" 
                      alt="Skool Community Preview" 
                      className="w-full max-h-[600px] object-contain"
                    />
                  </div>
                  <Button 
                    onClick={() => window.open('https://www.skool.com/metro2-community-5707', '_blank')}
                    className="bg-brand-gradient text-white font-bold px-10 py-5 h-auto text-lg shadow-xl hover:-translate-y-1 transition-all rounded-xl"
                  >
                    Join Skool Community <ExternalLink className="w-5 h-5 ml-3" />
                  </Button>
                </div>
              )}
            </div>

          </Card>
          
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
