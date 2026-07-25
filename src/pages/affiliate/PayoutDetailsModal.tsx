import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Button, Input } from '@/components';

export function PayoutDetailsModal() {
  const { closeModal, addToast } = useUIStore();
  const [accountType, setAccountType] = useState('business');

  const handleSubmit = () => {
    addToast({ title: 'Payout details updated successfully', variant: 'success' });
    closeModal();
  };

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Account Information</h2>
      
      {/* Account Type */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-900 mb-3">Select Account Type</label>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="accountType" 
              value="individual" 
              checked={accountType === 'individual'} 
              onChange={(e) => setAccountType(e.target.value)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-900">Individual</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="accountType" 
              value="business" 
              checked={accountType === 'business'} 
              onChange={(e) => setAccountType(e.target.value)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-900">Business</span>
          </label>
        </div>
      </div>

      {/* Sub Header */}
      <div className="mb-4 border-b border-gray-100 pb-2">
        <h3 className="text-sm font-bold text-gray-900">Bank Account for Payouts</h3>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8">
        <div>
          <label className="block text-xs font-bold text-gray-900 mb-1.5">Email Address</label>
          <Input defaultValue="ali_024@gmail.com" className="bg-white border-gray-200 shadow-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-900 mb-1.5">Routing Number</label>
          <Input defaultValue="099999999" className="bg-white border-gray-200 shadow-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-900 mb-1.5">Account Number</label>
          <Input defaultValue="123456789012" className="bg-white border-gray-200 shadow-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-900 mb-1.5">Account Title</label>
          <Input defaultValue="Ali" className="bg-white border-gray-200 shadow-sm" />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100 mt-2">
        <Button 
          variant="outline" 
          onClick={closeModal} 
          className="bg-gray-100 text-gray-700 border-0 hover:bg-gray-200 font-medium px-6"
        >
          CLOSE
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-[#d97706] hover:bg-[#b45309] text-white font-medium border-0 px-6"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}