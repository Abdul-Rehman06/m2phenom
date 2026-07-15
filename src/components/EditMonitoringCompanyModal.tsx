import { Input, Select, Button } from '@/components';
import { useUIStore } from '@/store/useUIStore';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function EditMonitoringCompanyModal() {
  const { closeModal } = useUIStore();
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Monitoring Username</label>
          <Input defaultValue="saenz@nxtlevel.homes" className="w-full bg-white text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Monitoring Password/Token</label>
          <div className="relative">
            <Input 
              type={showPwd ? "text" : "password"} 
              defaultValue="password12345" 
              className="w-full pr-10 bg-white text-sm" 
            />
            <button 
              onClick={() => setShowPwd(!showPwd)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">Monitoring Company</label>
        <Select 
          options={[{ label: 'EPIC PRO Report V2', value: 'epic' }]} 
          className="w-full bg-white text-sm"
        />
      </div>
      <div className="flex justify-center mt-2">
        <Button 
          onClick={closeModal} 
          className="bg-[#d95d16] hover:bg-[#c25313] text-white font-bold px-8"
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}
