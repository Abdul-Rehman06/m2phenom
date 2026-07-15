import { CreditCard, ShieldCheck } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, Input, Select, PageTransition } from '@/components';
import { APP_CONFIG } from '@/constants';

export function PurchaseAdditionalAttacks() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Additional Attacks</h1>
            <p className="text-gray-500">Buy more General Attacks to keep your momentum going.</p>
          </div>

          <div className="w-full flex flex-col gap-8">
            
            {/* Payment Info Card */}
            <Card className="p-8 border-border shadow-sm w-full bg-white">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <CreditCard className="w-5 h-5 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900">Payment Info</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                
                {/* User */}
                <div className="md:col-span-6 w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">User</label>
                  <Input defaultValue="yungmillionaire@yahoo.com" className="bg-white w-full" />
                </div>
                
                {/* GA(S) */}
                <div className="md:col-span-3 w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">GA(S)</label>
                  <Select 
                    options={[
                      {label: 'Select GA(S)', value: 'select'},
                      {label: '10 Attacks - $99', value: '10'},
                      {label: '25 Attacks - $199', value: '25'}
                    ]} 
                    className="bg-white w-full" 
                  />
                </div>

                {/* Amount */}
                <div className="md:col-span-3 w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Amount</label>
                  <Input readOnly placeholder="$0.00" className="bg-gray-50 w-full" />
                </div>

                {/* Card Number */}
                <div className="md:col-span-6 w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Card Number</label>
                  <Input placeholder="0000 0000 0000 0000" className="bg-white w-full" />
                </div>

                {/* CVV */}
                <div className="md:col-span-6 w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">CVV</label>
                  <Input placeholder="123" className="bg-white w-full" type="password" maxLength={4} />
                </div>

                {/* Expiration Date */}
                <div className="md:col-span-12 w-full flex flex-col sm:flex-row items-start sm:items-end gap-6">
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Expiration Date</label>
                      <Select 
                        options={[
                          {label: 'Jan', value: '01'}, {label: 'Feb', value: '02'}, 
                          {label: 'Mar', value: '03'}, {label: 'Apr', value: '04'}
                        ]} 
                        className="bg-white w-24" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 opacity-0">Year</label>
                      <Select 
                        options={[
                          {label: '2026', value: '2026'}, {label: '2027', value: '2027'}, 
                          {label: '2028', value: '2028'}
                        ]} 
                        className="bg-white w-28" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:mb-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6 object-contain" />
                  </div>
                </div>

              </div>
            </Card>

            {/* Billing Information Card */}
            <Card className="p-8 border-border shadow-sm w-full bg-white">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <ShieldCheck className="w-5 h-5 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-900">Billing Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Billing First Name</label>
                  <Input defaultValue="Kerron" className="bg-white w-full" />
                </div>
                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Billing Last Name</label>
                  <Input defaultValue="Murphy" className="bg-white w-full" />
                </div>

                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Billing Address</label>
                  <Input defaultValue="1000 Pennsylvania Ave" className="bg-white w-full" />
                </div>
                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Billing City</label>
                  <Input className="bg-white w-full" />
                </div>

                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Billing Address Line 2</label>
                  <Input defaultValue="Stone Mountain" className="bg-white w-full" />
                </div>
                <div className="w-full">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Billing State</label>
                  <Input defaultValue="GA" className="bg-white w-full" />
                </div>

                <div className="w-full md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Billing Zip</label>
                  <Input defaultValue="30087" className="bg-white w-full" />
                </div>
              </div>
            </Card>

            {/* Action */}
            <div className="flex justify-center sm:justify-end w-full mt-4">
              <Button className="bg-brand-gradient text-white px-12 py-6 text-base font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-full sm:w-auto uppercase tracking-wide">
                Purchase
              </Button>
            </div>

          </div>
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
