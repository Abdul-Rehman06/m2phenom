import { AlertCircle, CreditCard, X, PlusCircle } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, Badge, PageTransition, Input } from '@/components';
import { APP_CONFIG } from '@/constants';
import { useUIStore } from '@/store/useUIStore';

function UpdateCardModal() {
  const { closeModal, addToast } = useUIStore();

  const handleSave = () => {
    addToast({
      title: 'Card Updated',
      description: 'Your payment method has been successfully updated.',
      variant: 'success'
    });
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <CreditCard className="w-5 h-5 text-primary-500" />
        <h2 className="text-xl font-bold text-gray-900">Update Card Details</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Card Number</label>
          <Input placeholder="0000 0000 0000 0000" className="bg-white" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Expiration Date</label>
            <Input placeholder="MM/YY" className="bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">CVV</label>
            <Input placeholder="123" type="password" maxLength={4} className="bg-white" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={closeModal}>Cancel</Button>
        <Button className="bg-brand-gradient text-white font-bold" onClick={handleSave}>
          Save Card
        </Button>
      </div>
    </div>
  );
}

export function ManageSubscription() {
  const { openModal, openConfirmDialog, addToast } = useUIStore();

  const handleUpdateCard = () => {
    openModal(<UpdateCardModal />, 'md');
  };

  const handleCancelSubscription = () => {
    openConfirmDialog({
      title: 'Cancel Subscription',
      description: 'Are you sure you want to cancel the Subscription? You will not be able to generate letters and will only have unused GAs left.',
      confirmText: 'Yes, Cancel Subscription',
      cancelText: 'Keep Subscription',
      variant: 'danger',
      onConfirm: () => {
        addToast({
          title: 'Subscription Cancelled',
          description: 'Your subscription has been successfully cancelled.',
          variant: 'success' // or danger, but success means action succeeded
        });
      }
    });
  };

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Subscription</h1>
            <p className="text-gray-500">View and update your current active plans and payment methods.</p>
          </div>

          <div className="w-full flex flex-col gap-6">
            
            {/* Informational Alerts */}
            <div className="flex flex-col gap-3">
              <div className="bg-surface border border-border p-4 rounded-xl shadow-sm flex items-start gap-3">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></div>
                <p className="text-sm text-gray-700">
                  Dear <span className="font-bold text-gray-900">yungmillionaire@yahoo.com</span> you have currently subscribed our subscription named: <span className="font-bold text-primary-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">bronzeMonthly</span>
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl shadow-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary-500 shrink-0" />
                <p className="text-sm text-primary-800 leading-relaxed">
                  All users must be on a monthly subscription plan to generate letters. You will not be able to generate letters if you purchase a plan then cancel it. This will only leave you with GA's that you can not use.
                </p>
              </div>
            </div>

            {/* Subscription Table Card */}
            <Card className="border-border shadow-sm w-full bg-white overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-bold text-gray-900">Active Subscriptions</h2>
                </div>
                <Button className="bg-brand-gradient text-white shadow-sm hover:shadow-md transition-all font-bold">
                  <PlusCircle className="w-4 h-4 mr-2" /> Get New Subscription
                </Button>
              </div>
              
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-gray-50/50 border-b border-border text-gray-500 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Start Date</th>
                      <th className="py-4 px-6">Subscription Id</th>
                      <th className="py-4 px-6">Subscription Name</th>
                      <th className="py-4 px-6">Response</th>
                      <th className="py-4 px-6">Card Number</th>
                      <th className="py-4 px-6">Amount</th>
                      <th className="py-4 px-6">GA</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Action(s)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-gray-900 font-medium">June 18, 2024</td>
                      <td className="py-4 px-6 text-gray-600 font-mono text-xs">72454705</td>
                      <td className="py-4 px-6 text-gray-900 font-bold">Bronze Monthly</td>
                      <td className="py-4 px-6 text-gray-500">-</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-700 font-mono text-xs">
                          <span className="tracking-widest">••••</span> 7260
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900 font-bold">$147</td>
                      <td className="py-4 px-6">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-bold text-xs">4</span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="success" className="bg-green-50 text-green-700 border-green-200 gap-1.5 px-2.5 py-0.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>Active
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-primary-600 border-primary-200 bg-primary-50 hover:bg-primary-100 text-xs h-8 font-bold"
                            onClick={handleUpdateCard}
                          >
                            Update Card Details
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-white bg-red-500 hover:bg-red-600 border border-red-600 shadow-sm shrink-0"
                            onClick={handleCancelSubscription}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

          </div>
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}