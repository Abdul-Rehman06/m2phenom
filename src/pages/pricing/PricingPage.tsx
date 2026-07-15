import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  User, 
  Briefcase, 
  Building2, 
  Shield, 
  Award, 
  Crown, 
  Gem, 
  Info,
  HelpCircle,
  Calendar,
  Headphones
} from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Button, Card, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';

const FEATURES = [
  'Generate Unlimited Metro2 Letters Per Attack',
  'Artificial Intelligence Generated Letters',
  'Free Live Weekly Software Training',
  'Free Support Community Access',
  'Printing & Mailing Services Available',
  '1:1 Training Support Available',
  'Add Unlimited Clients',
  'Client Portal Available'
];

const PACKAGES = [
  {
    id: 'iron',
    name: 'IRON PACKAGE',
    price: 97,
    category: 'Individual',
    users: '1 person',
    icon: Shield,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-100',
    isRecommended: false,
  },
  {
    id: 'bronze',
    name: 'BRONZE PACKAGE',
    price: 147,
    category: 'Individual',
    users: '1-4 people',
    icon: Shield,
    iconColor: 'text-orange-700',
    iconBg: 'bg-orange-100',
    isRecommended: false,
  },
  {
    id: 'silver',
    name: 'SILVER PACKAGE',
    price: 197,
    category: 'Business',
    users: '8 people',
    icon: Award,
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-200',
    isRecommended: true,
  },
  {
    id: 'gold',
    name: 'GOLD PACKAGE',
    price: 297,
    category: 'Business',
    users: '17 people',
    icon: Crown,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    isRecommended: false,
  },
  {
    id: 'platinum',
    name: 'PLATINUM PACKAGE',
    price: 397,
    category: 'Enterprise',
    users: '30 people',
    icon: Gem,
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-200',
    isRecommended: false,
  },
  {
    id: 'diamond',
    name: 'DIAMOND PACKAGE',
    price: 997,
    category: 'Enterprise',
    users: '100 people',
    icon: Gem,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
    isRecommended: false,
  }
];

const TABS = ['All', 'Individual', 'Business', 'Enterprise'];

export function PricingPage() {
  const [activeTab, setActiveTab] = useState('All');

  const showIndividual = activeTab === 'All' || activeTab === 'Individual';
  const showBusiness = activeTab === 'All' || activeTab === 'Business';
  const showEnterprise = activeTab === 'All' || activeTab === 'Enterprise';

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-20 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[1000px] h-[1000px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="max-w-full flex-1 relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 flex flex-col">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Choose Your Subscription Plan</h1>
            <p className="text-gray-500 text-sm">Flexible plans for individuals, growing teams, and enterprise-level operations.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-full p-1 border border-border shadow-sm">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeTab === tab 
                      ? 'bg-brand-gradient text-white shadow-md' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Info Alert */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-border shadow-sm">
              <Info className="w-4 h-4 text-primary-500" />
              Best for solo users, growing businesses, or enterprise teams.
            </div>
          </div>

          {/* Pricing Grid Layout */}
          <div className="flex flex-wrap justify-center gap-8 xl:gap-12 mb-16">
            <AnimatePresence mode="popLayout">
              {showIndividual && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-center gap-2 text-gray-500 font-bold text-sm uppercase tracking-wider mb-2">
                    <User className="w-4 h-4" /> Individual Plans
                  </div>
                  <div className="flex gap-4 xl:gap-6">
                    {PACKAGES.filter(p => p.category === 'Individual').map(plan => (
                      <PlanCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                </motion.div>
              )}

              {showBusiness && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-center gap-2 text-gray-500 font-bold text-sm uppercase tracking-wider mb-2">
                    <Briefcase className="w-4 h-4" /> Business Plans
                  </div>
                  <div className="flex gap-4 xl:gap-6">
                    {PACKAGES.filter(p => p.category === 'Business').map(plan => (
                      <PlanCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                </motion.div>
              )}

              {showEnterprise && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-center gap-2 text-gray-500 font-bold text-sm uppercase tracking-wider mb-2">
                    <Building2 className="w-4 h-4" /> Enterprise Plans
                  </div>
                  <div className="flex gap-4 xl:gap-6">
                    {PACKAGES.filter(p => p.category === 'Enterprise').map(plan => (
                      <PlanCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Support Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full mb-12">
            <Card className="p-6 flex items-start gap-4 bg-white/50 backdrop-blur-sm border-border hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-primary-500 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Need help choosing?</h3>
                <p className="text-xs text-gray-500">Our team is here to help you find the perfect plan.</p>
              </div>
            </Card>
            
            <Card className="p-6 flex items-start gap-4 bg-white/50 backdrop-blur-sm border-border hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-primary-500 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Book a walkthrough</h3>
                <p className="text-xs text-gray-500">See how M2 Phenom can help you win.</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4 bg-white/50 backdrop-blur-sm border-border hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-primary-500 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Contact support</h3>
                <p className="text-xs text-gray-500">Get answers to your questions from our experts.</p>
              </div>
            </Card>
          </div>

          {/* Page Footer */}
          <div className="mt-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500 max-w-7xl mx-auto w-full">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
              <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Blog</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Get Copy Of Credit Report</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Pricing</a>
            </div>
            <div className="text-center md:text-right">
              &copy; 2026 m2phenom All Rights Reserved.
            </div>
          </div>

        </ContentWrapper>
      </div>
    </PageTransition>
  );
}

// Sub-component for the pricing card
function PlanCard({ plan }: { plan: typeof PACKAGES[0] }) {
  const Icon = plan.icon;
  
  return (
    <div className={`relative flex flex-col bg-white rounded-2xl p-6 w-[280px] xl:w-[300px] transition-all duration-300 hover:shadow-xl ${
      plan.isRecommended ? 'border-2 border-primary-500 shadow-lg scale-105 z-10' : 'border border-border shadow-sm'
    }`}>
      
      {plan.isRecommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm whitespace-nowrap">
          <Award className="w-3 h-3" /> MOST RECOMMENDED
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner ${plan.iconBg} ${plan.iconColor}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{plan.name}</h3>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-1 text-primary-500">
          <span className="text-4xl font-black leading-none">${plan.price}</span>
          <span className="text-gray-500 text-sm font-medium mb-1">/ month</span>
        </div>
        <div className="flex items-center gap-2 mt-3 text-gray-600 text-sm font-medium bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
          <User className="w-4 h-4 text-gray-400" /> Service {plan.users} / month
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-8">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
            <span className="text-xs text-gray-600 leading-snug">{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="primary" 
        className="w-full bg-brand-gradient text-white border-0 shadow-md hover:shadow-lg font-bold h-11"
      >
        Choose Plan
      </Button>
    </div>
  );
}