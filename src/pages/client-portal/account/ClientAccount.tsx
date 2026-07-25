import { useState } from 'react';
import { PageHeader, ContentWrapper } from '@/layouts';
import { Card, Button } from '@/components';
import { Eye, EyeOff, ExternalLink, Edit2, Trash2, ChevronDown, UploadCloud, Shield, FileText, Lock, User, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

type UploadedDoc = {
  url: string;
  type: string;
  name: string;
};

export function ClientAccount() {
  const { openModal, closeModal, openConfirmDialog, addToast } = useUIStore();
  const [showHiddenFields, setShowHiddenFields] = useState(false);
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDoc>>({});

  const toggleFieldVisibility = (field: string) => {
    setVisibleFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const isFieldVisible = (field: string) => {
    return showHiddenFields || visibleFields[field];
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedDocs(prev => ({ ...prev, [id]: { url, type: file.type, name: file.name } }));
      addToast({ title: 'File uploaded successfully', variant: 'success' });
    }
  };

  const handleEditConnection = () => {
    openModal(
      <div className="p-6">
        <h3 className="text-lg font-bold text-surface-900 mb-4">Edit Monitoring Connection</h3>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          closeModal();
          addToast({ title: 'Connection updated successfully', variant: 'success' });
        }}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-surface-700">Monitoring Username</label>
            <input type="text" defaultValue="abomyupchurch@yahoo.com" className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-lg text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-surface-700">Monitoring Password/Token</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-lg text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-surface-100">
            <Button variant="secondary" onClick={closeModal} type="button">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    );
  };

  const handleRemoveConnection = () => {
    openConfirmDialog({
      title: 'Remove Connection',
      description: 'Are you sure you want to delete this monitoring connection? This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'danger',
      onConfirm: () => {
        addToast({ title: 'Connection removed successfully', variant: 'success' });
      }
    });
  };

  const renderField = (label: string, id: string, defaultValue: string, icon?: React.ReactNode, colSpan: boolean = false) => {
    const visible = isFieldVisible(id);
    return (
      <div className={`space-y-1.5 ${colSpan ? 'md:col-span-2 lg:col-span-3' : ''}`}>
        <label className="text-sm font-bold text-surface-700">{label}</label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-400">
              {icon}
            </div>
          )}
          <input
            type={visible ? "text" : "password"}
            defaultValue={defaultValue}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-10 py-2.5 bg-surface-50 border border-surface-200 rounded-lg text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all`}
            readOnly={!visible}
          />
          <button
            type="button"
            onClick={() => toggleFieldVisibility(id)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
          >
            {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  };

  const renderUploadCard = (id: string, label: string, description: string) => {
    const doc = uploadedDocs[id];
    const isImage = doc?.type.startsWith('image/');
    
    return (
      <div className={`relative group border-2 ${doc ? 'border-emerald-200 bg-emerald-50/10' : 'border-dashed border-surface-200'} rounded-xl p-5 hover:border-primary-400 hover:bg-primary-50/50 transition-all text-center flex flex-col h-full overflow-hidden bg-white`}>
        {doc && isImage && (
          <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-5 transition-opacity">
            <img src={doc.url} alt={label} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-10 flex flex-col h-full items-center">
          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors shrink-0 ${doc ? 'bg-emerald-100 text-emerald-600' : 'bg-surface-100 group-hover:bg-primary-100 text-surface-500 group-hover:text-primary-600'}`}>
            {doc ? <CheckCircle2 className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
          </div>
          <h4 className="text-sm font-bold text-surface-900 mb-1">{label}</h4>
          {doc ? (
            <p className="text-xs font-bold text-emerald-600 mb-5 flex-grow truncate w-full px-2" title={doc.name}>{doc.name}</p>
          ) : (
            <p className="text-xs text-surface-500 mb-5 flex-grow">{description}</p>
          )}
          <label className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-bold text-surface-700 cursor-pointer hover:bg-surface-50 hover:text-primary-600 transition-colors shadow-sm mt-auto relative z-20">
            {doc ? 'Change File' : 'Choose File'}
            <input type="file" className="hidden" onChange={(e) => handleFileUpload(id, e)} accept="image/*,.pdf,.doc,.docx" />
          </label>
        </div>
      </div>
    );
  };

  const renderVerifiedFile = (label: string) => (
    <div className="flex items-center justify-between p-3 rounded-lg border border-surface-100 bg-surface-50/50 hover:bg-surface-50 hover:border-surface-200 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-surface-900">{label}</p>
          <p className="text-xs font-medium text-emerald-600">Verified & Secure</p>
        </div>
      </div>
      <a href="#" className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors tooltip-trigger" title="View Document">
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );

  return (
    <ContentWrapper>
      <PageHeader 
        title="Account Settings" 
        description="Manage your personal information, security settings, and required documentation."
      />

      <div className="space-y-6">
        {/* Top Section: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Col: Personal Information */}
          <div className="lg:col-span-2">
            <Card className="p-6 lg:p-8 shadow-sm border border-surface-200 bg-white h-full">
              <div className="flex items-center justify-between mb-8 border-b border-surface-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-surface-900">Personal Information</h3>
                  <p className="text-sm text-surface-500 mt-1">Update your contact and security details.</p>
                </div>
                <div className="flex items-center gap-3 bg-surface-50 px-3 py-1.5 rounded-lg border border-surface-100">
                  <span className="text-xs font-bold text-surface-600 uppercase tracking-wider">Reveal Fields</span>
                  <button 
                    type="button"
                    onClick={() => setShowHiddenFields(!showHiddenFields)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border border-surface-200 shadow-inner ${showHiddenFields ? 'bg-primary-500 border-primary-500' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${showHiddenFields ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              <form className="space-y-8">
                {/* Basic Info */}
                <div>
                  <h4 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" /> Basic Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {renderField("First Name", "firstName", "Happy", <User className="w-4 h-4"/>)}
                    {renderField("Last Name", "lastName", "Traveler", <User className="w-4 h-4"/>)}
                    {renderField("Email Address", "email", "happy@example.com", <Mail className="w-4 h-4"/>)}
                    {renderField("Phone Number", "phone", "(555) 123-4567", <Phone className="w-4 h-4"/>)}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h4 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {renderField("Street Address", "address", "123 Main St", undefined, true)}
                    {renderField("City", "city", "Anytown")}
                    {renderField("State", "state", "NY")}
                    {renderField("Zip Code", "zip", "12345")}
                  </div>
                </div>

                {/* Security & Portal */}
                <div>
                  <h4 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Security & Access
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {renderField("Social Security Number", "ssn", "000-00-0000", <Lock className="w-4 h-4"/>, true)}
                    {renderField("Portal Username", "username", "happy_traveler", <User className="w-4 h-4"/>)}
                    {renderField("Portal Password", "password", "password123", <Lock className="w-4 h-4"/>)}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-100 flex justify-end">
                  <Button type="button" className="px-8 py-2.5 rounded-lg">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Col: Integrations & Existing Docs */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Credit Monitoring Integration */}
            <Card className="p-6 shadow-sm border border-surface-200 bg-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-surface-900">Credit Monitoring</h3>
                  <p className="text-sm text-surface-500 mt-1">MyFreeScoreNow Integration</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              <div className="bg-surface-50 border border-surface-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-surface-200">
                  <div>
                    <p className="text-xs font-bold text-surface-500 uppercase tracking-wider">Provider</p>
                    <p className="text-sm font-bold text-surface-900 mt-0.5">EPIC PRO Report V2</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="truncate pr-4">
                    <p className="text-xs font-bold text-surface-500 uppercase tracking-wider">Username</p>
                    <p className="text-sm font-medium text-surface-900 mt-0.5 truncate">abomyupchurch@yahoo.com</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={handleEditConnection} className="w-8 h-8 rounded-lg bg-white border border-surface-200 flex items-center justify-center text-surface-500 hover:text-primary-600 hover:border-primary-200 transition-colors tooltip-trigger" title="Edit Connection">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handleRemoveConnection} className="w-8 h-8 rounded-lg bg-white border border-surface-200 flex items-center justify-center text-surface-500 hover:text-red-600 hover:border-red-200 transition-colors tooltip-trigger" title="Remove">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <Button className="w-full rounded-lg flex items-center justify-center">
                Get Credit Report <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Verified Documents */}
            <Card className="p-6 shadow-sm border border-surface-200 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-surface-900">Current Documents</h3>
                  <p className="text-sm text-surface-500">Your verified files on record.</p>
                </div>
              </div>

              <div className="space-y-3">
                {renderVerifiedFile("Identity Proof")}
                {renderVerifiedFile("SSN Proof")}
                {renderVerifiedFile("Address Proof")}
              </div>
            </Card>

          </div>
        </div>

        {/* Bottom Section: Upload New Documents */}
        <Card className="p-6 lg:p-8 shadow-sm border border-surface-200 bg-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-surface-100 pb-6">
            <div>
              <h3 className="text-lg font-bold text-surface-900">Upload New Documentation</h3>
              <p className="text-sm text-surface-500 mt-1">Please ensure all uploaded documents are clear and legible to avoid processing delays.</p>
            </div>
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              Max file size: 10MB per document
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderUploadCard("photo_id", "Photo Identification", "Valid government-issued ID")}
            {renderUploadCard("legal_id", "Legal ID Number", "Secondary form of identification")}
            {renderUploadCard("proof_address", "Proof of Address", "Utility bill or bank statement")}
            {renderUploadCard("other_1", "Other Document 1", "Additional supporting file")}
            {renderUploadCard("other_2", "Other Document 2", "Additional supporting file")}
            {renderUploadCard("other_3", "Other Document 3", "Additional supporting file")}
          </div>
        </Card>

      </div>
    </ContentWrapper>
  );
}