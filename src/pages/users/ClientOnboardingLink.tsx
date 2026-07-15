import { 
  Link2, Mail, User, Lock, ShieldCheck, 
  FileText, Eye, Headphones, ChevronRight, 
  Copy, ExternalLink 
} from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, Input, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';

export function ClientOnboardingLink() {
  const onboardingLink = "https://client.m2phenom.com/onboard/eYJpdil6ImM3aDcrZGxHQj";

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          
          {/* Header */}
          <div className="mb-8 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Onboarding Link</h1>
            <p className="text-gray-500">Share one link so clients can get started, submit info, and review their data.</p>
          </div>

          {/* Top Steps */}
          <div className="flex flex-col lg:flex-row items-center gap-4 xl:gap-6 w-full mb-8">
            {/* Step 1 */}
            <Card className="flex-1 p-6 border-border shadow-sm flex items-start gap-4 w-full bg-white">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Link2 className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="text-primary-500">1</span> Copy Link
                </h3>
                <p className="text-sm text-gray-500">Copy your unique onboarding link.</p>
              </div>
            </Card>

            <ChevronRight className="w-6 h-6 text-gray-300 hidden lg:block shrink-0" />

            {/* Step 2 */}
            <Card className="flex-1 p-6 border-border shadow-sm flex items-start gap-4 w-full bg-white">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="text-primary-500">2</span> Send to Client
                </h3>
                <p className="text-sm text-gray-500">Send the link by email, text, or however you like.</p>
              </div>
            </Card>

            <ChevronRight className="w-6 h-6 text-gray-300 hidden lg:block shrink-0" />

            {/* Step 3 */}
            <Card className="flex-1 p-6 border-border shadow-sm flex items-start gap-4 w-full bg-white">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="text-primary-500">3</span> Client Gets Started
                </h3>
                <p className="text-sm text-gray-500">Clients register, upload docs, and review their data.</p>
              </div>
            </Card>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-8">
            
            {/* Left Card: Link */}
            <Card className="lg:col-span-2 p-8 border-border shadow-sm bg-white flex flex-col justify-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your Onboarding Link</h2>
              <p className="text-sm text-gray-500 mb-6">This is your unique link to invite clients to your secure onboarding portal.</p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
                <Input 
                  readOnly 
                  value={onboardingLink} 
                  className="flex-1 bg-white text-gray-700 h-12 w-full"
                />
                <Button className="bg-brand-gradient text-white font-bold px-6 h-12 shrink-0 shadow-md">
                  <Copy className="w-4 h-4 mr-2" /> Copy Link
                </Button>
              </div>

              <div className="mb-8">
                <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-10">
                  <ExternalLink className="w-4 h-4 mr-2" /> Open Link
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
                <Lock className="w-3.5 h-3.5" />
                This link is unique to your account and can be shared securely.
              </div>
            </Card>

            {/* Right Card: What clients can do */}
            <Card className="lg:col-span-1 p-8 border-border shadow-sm bg-white">
              <h2 className="text-xl font-bold text-gray-900 mb-8">What clients can do</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary-500" />
                  </div>
                  <span className="font-medium text-gray-700">Register securely</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary-500" />
                  </div>
                  <span className="font-medium text-gray-700">Upload documents</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Eye className="w-5 h-5 text-primary-500" />
                  </div>
                  <span className="font-medium text-gray-700">Review their information</span>
                </div>
              </div>
            </Card>

          </div>

          {/* Bottom Section: Need help */}
          <Card className="w-full p-6 border border-orange-100 shadow-sm bg-orange-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-orange-100 flex items-center justify-center shrink-0 shadow-sm">
                <Headphones className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Need help?</h3>
                <p className="text-sm text-gray-500">Book a walkthrough or contact our support team. We're here to help you succeed.</p>
              </div>
            </div>
            <Button variant="outline" className="text-primary-500 border-primary-200 bg-white hover:bg-primary-50 shrink-0 h-10 px-6">
              Contact Support
            </Button>
          </Card>

        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
