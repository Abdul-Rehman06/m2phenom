import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MessageSquare, Mail, Eye, EyeOff, Lock, Edit2, Trash2, 
  UploadCloud, FileText, ImageIcon, Download
} from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, Input, Select, PageTransition, EditMonitoringCompanyModal } from '@/components';
import { APP_CONFIG } from '@/constants';
import { useUIStore } from '@/store/useUIStore';

const SectionBadge = ({ num, title, action }: { num: string, title: string, action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-6 w-full">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded bg-primary-500 text-white flex items-center justify-center text-sm font-bold shadow-sm shrink-0">
        {num}
      </div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
    {action && action}
  </div>
);

export function EditClient() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const { openModal, openConfirmDialog, addToast } = useUIStore();
  
  const [showSsn, setShowSsn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMonitoringPwd, setShowMonitoringPwd] = useState(false);

  // Document states
  const [photoIdPreview, setPhotoIdPreview] = useState<string | null>("/public/images.jpg");
  const [ssnPreview, setSsnPreview] = useState<string | null>("/public/socialsecurity.jpg");
  const [proofPreview, setProofPreview] = useState<string | null>("/public/images (1).jpg");
  const [otherDocs, setOtherDocs] = useState<{id: string, url: string}[]>([]);

  // Refs for hidden inputs
  const photoIdRef = useRef<HTMLInputElement>(null);
  const ssnRef = useRef<HTMLInputElement>(null);
  const proofRef = useRef<HTMLInputElement>(null);
  const otherDocsRef = useRef<HTMLInputElement>(null);

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setter(url);
      addToast({ title: 'Document uploaded successfully!', variant: 'success' });
    }
  };

  const handleOtherDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newDocs = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file)
      }));
      setOtherDocs(prev => [...prev, ...newDocs]);
      addToast({ title: 'Documents uploaded successfully!', variant: 'success' });
    }
  };

  const handleRemoveDoc = (setter: (url: string | null) => void) => {
    openConfirmDialog({
      title: 'Remove Document',
      description: 'Are you sure you want to remove this document?',
      confirmText: 'Remove',
      variant: 'danger',
      onConfirm: () => {
        setter(null);
        addToast({ title: 'Document removed', variant: 'success' });
      }
    });
  };

  const handleEditMonitoring = () => {
    openModal(<EditMonitoringCompanyModal />, 'md');
  };

  const handleRemoveMonitoring = () => {
    openConfirmDialog({
      title: 'Remove Credit Report Account',
      description: 'Are you sure you want to remove this credit report account?',
      confirmText: 'Remove Account',
      variant: 'danger',
      onConfirm: () => {
        addToast({ title: 'Credit Report Account removed', variant: 'success' });
      }
    });
  };

  const handleSave = () => {
    addToast({ title: 'Client profile updated successfully!', variant: 'success' });
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 w-full gap-4">
            <div className="w-full">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{isNew ? 'Add New Client' : 'Edit Client Profile'}</h1>
              <p className="text-sm text-gray-500">{isNew ? 'Create a new client profile.' : 'Update client details, documents, and reports.'}</p>
            </div>
            {!isNew && (
              <div className="flex gap-3 shrink-0">
                <Button onClick={() => addToast({ title: 'SMS sent to client.', variant: 'success' })} variant="outline" className="text-primary-500 border-primary-200 bg-white hover:bg-primary-50">
                  <MessageSquare className="w-4 h-4 mr-2" /> SMS
                </Button>
                <Button onClick={() => addToast({ title: 'Email sent to client.', variant: 'success' })} variant="outline" className="text-primary-500 border-primary-200 bg-white hover:bg-primary-50">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
            
            {/* ROW 1: Basic Info (Left 8) + Portal Access (Right 4) */}
            <div className="xl:col-span-8 w-full">
              <Card className="p-6 h-full border-border shadow-sm w-full flex flex-col">
                <SectionBadge num="1" title="Basic Info" />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 w-full">
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">First Name</label>
                    <Input defaultValue={isNew ? '' : "Test"} className="bg-white w-full" />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Last Name</label>
                    <Input defaultValue={isNew ? '' : "Test"} className="bg-white w-full" />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Date of Birth</label>
                    <Input type="date" defaultValue={isNew ? '' : "1990-01-01"} className="bg-white text-gray-600 w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4 w-full">
                  <div className="sm:col-span-3 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">SSN / ITIN</label>
                    <div className="flex items-center gap-3 h-10">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="idType" defaultChecked className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500" />
                        <span className="text-xs text-gray-700 font-medium">SSN</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="idType" className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500" />
                        <span className="text-xs text-gray-700 font-medium">ITIN</span>
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-3 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">SSN</label>
                    <div className="relative w-full">
                      <Input type={showSsn ? "text" : "password"} defaultValue={isNew ? '' : "000-00-0123"} className="pr-10 bg-white w-full" />
                      <button onClick={() => setShowSsn(!showSsn)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showSsn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="sm:col-span-3 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone</label>
                    <Input defaultValue={isNew ? '' : "+1 (555) 545-5555"} className="bg-white w-full" />
                  </div>
                  <div className="sm:col-span-3 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                    <Input defaultValue={isNew ? '' : "teststststs123456789@gmail.com"} className="bg-white w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 w-full">
                  <div className="sm:col-span-3 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Address</label>
                    <Input defaultValue={isNew ? '' : "Test"} className="bg-white w-full" />
                  </div>
                  <div className="sm:col-span-3 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">City</label>
                    <Input defaultValue={isNew ? '' : "Test"} className="bg-white w-full" />
                  </div>
                  <div className="sm:col-span-2 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">State</label>
                    <Select options={[{label: 'Alabama (AL)', value: 'al'}]} value={isNew ? '' : 'al'} className="bg-white w-full" />
                  </div>
                  <div className="sm:col-span-2 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Zip</label>
                    <Input defaultValue={isNew ? '' : "01012"} className="bg-white w-full" />
                  </div>
                  <div className="sm:col-span-2 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Country</label>
                    <Select options={[{label: 'USA', value: 'usa'}]} value={isNew ? '' : 'usa'} className="bg-white w-full" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Portal Access */}
            <div className="xl:col-span-4 w-full">
              <Card className="p-6 h-full border-border shadow-sm flex flex-col w-full">
                <SectionBadge num="2" title="Portal Access" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 w-full">
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Username</label>
                    <Input defaultValue={isNew ? '' : "Testtest0123"} className="bg-white w-full" />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Password</label>
                    <div className="relative w-full">
                      <Input type={showPassword ? "text" : "password"} defaultValue={isNew ? '' : "password123"} className="pr-10 bg-white w-full" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-4 w-full sm:w-1/2 sm:pr-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative w-full">
                    <Input type={showConfirmPassword ? "text" : "password"} defaultValue={isNew ? '' : "password123"} className="pr-10 bg-white w-full" />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="mb-4 flex-1 w-full flex flex-col">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Notes (optional)</label>
                  <textarea 
                    className="w-full flex-1 min-h-[60px] rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Add any notes about this client..."
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto pt-2">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  These credentials allow the client to access their portal.
                </div>
              </Card>
            </div>

            {/* ROW 2: Credit Report Account */}
            <div className="xl:col-span-12 w-full">
              <Card className="p-6 border-border shadow-sm w-full">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
                  <div className="flex-1 w-full">
                    <SectionBadge num="3" title="Credit Report Account" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
                      <div className="w-full">
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Monitoring Site</label>
                        <Input defaultValue={isNew ? '' : "EPIC PRO Report V2"} className="bg-white w-full" />
                      </div>
                      <div className="w-full">
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Monitoring Username</label>
                        <Input defaultValue={isNew ? '' : "saenz@nxtlevel.homes"} className="bg-white w-full" />
                      </div>
                      <div className="w-full">
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Monitoring Password/Token</label>
                        <div className="relative w-full">
                          <Input type={showMonitoringPwd ? "text" : "password"} defaultValue={isNew ? '' : "password123"} className="pr-10 bg-white w-full" />
                          <button onClick={() => setShowMonitoringPwd(!showMonitoringPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showMonitoringPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 self-end md:self-auto mt-4 md:mt-0 shrink-0">
                    <Button onClick={handleEditMonitoring} variant="outline" className="text-primary-500 border-primary-200 bg-white hover:bg-primary-50">
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button onClick={handleRemoveMonitoring} variant="outline" className="text-red-500 border-red-200 bg-white hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* ROW 3: Required Documents */}
            <div className="xl:col-span-12 w-full">
              <Card className="p-6 border-border shadow-sm w-full">
                <SectionBadge num="4" title="Required Documents" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
                  {/* Photo ID */}
                  <div className="border border-border rounded-xl p-4 flex flex-col h-full bg-white shadow-sm w-full relative">
                    <input type="file" ref={photoIdRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setPhotoIdPreview)} />
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                        <ImageIcon className="w-4 h-4 text-gray-500" /> Photo ID
                      </div>
                      {photoIdPreview && <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase shrink-0">Uploaded</span>}
                    </div>
                    <div className="bg-gray-50 rounded-lg h-48 mb-4 flex items-center justify-center border border-border overflow-hidden p-2 relative group">
                      {photoIdPreview ? (
                        <>
                          <img src={photoIdPreview} className="w-full h-full object-contain rounded shadow-sm opacity-90" alt="ID" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-lg backdrop-blur-[1px]">
                            <button onClick={() => window.open(photoIdPreview, '_blank')} className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-md transition-transform hover:scale-105" title="View Full Image">
                              <Eye className="w-4 h-4" />
                            </button>
                            <a href={photoIdPreview} download="photo-id" className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-md transition-transform hover:scale-105" title="Download Image">
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Button onClick={() => photoIdRef.current?.click()} variant="outline" className="flex-1 text-primary-500 border-primary-200 bg-white hover:bg-primary-50 h-8 text-xs">
                        <UploadCloud className="w-3.5 h-3.5 mr-1.5"/> {photoIdPreview ? 'Change' : 'Upload'}
                      </Button>
                      {photoIdPreview && (
                        <Button onClick={() => handleRemoveDoc(setPhotoIdPreview)} variant="outline" className="flex-1 text-red-500 border-red-200 bg-white hover:bg-red-50 h-8 text-xs">
                          <Trash2 className="w-3.5 h-3.5 mr-1.5"/> Remove
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* SSN / Legal ID */}
                  <div className="border border-border rounded-xl p-4 flex flex-col h-full bg-white shadow-sm w-full relative">
                    <input type="file" ref={ssnRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setSsnPreview)} />
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                        <ImageIcon className="w-4 h-4 text-gray-500" /> SSN / Legal ID
                      </div>
                      {ssnPreview && <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase shrink-0">Uploaded</span>}
                    </div>
                    <div className="bg-gray-50 rounded-lg h-48 mb-4 flex items-center justify-center border border-border overflow-hidden p-2 relative group">
                      {ssnPreview ? (
                        <>
                          <img src={ssnPreview} className="w-full h-full object-contain rounded shadow-sm opacity-90" alt="SSN" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-lg backdrop-blur-[1px]">
                            <button onClick={() => window.open(ssnPreview, '_blank')} className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-md transition-transform hover:scale-105" title="View Full Image">
                              <Eye className="w-4 h-4" />
                            </button>
                            <a href={ssnPreview} download="ssn-id" className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-md transition-transform hover:scale-105" title="Download Image">
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Button onClick={() => ssnRef.current?.click()} variant="outline" className="flex-1 text-primary-500 border-primary-200 bg-white hover:bg-primary-50 h-8 text-xs">
                        <UploadCloud className="w-3.5 h-3.5 mr-1.5"/> {ssnPreview ? 'Change' : 'Upload'}
                      </Button>
                      {ssnPreview && (
                        <Button onClick={() => handleRemoveDoc(setSsnPreview)} variant="outline" className="flex-1 text-red-500 border-red-200 bg-white hover:bg-red-50 h-8 text-xs">
                          <Trash2 className="w-3.5 h-3.5 mr-1.5"/> Remove
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Proof of Address */}
                  <div className="border border-border rounded-xl p-4 flex flex-col h-full bg-white shadow-sm w-full relative">
                    <input type="file" ref={proofRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setProofPreview)} />
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                        <ImageIcon className="w-4 h-4 text-gray-500" /> Proof of Address
                      </div>
                      {proofPreview && <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase shrink-0">Uploaded</span>}
                    </div>
                    <div className="bg-gray-50 rounded-lg h-48 mb-4 flex items-center justify-center border border-border overflow-hidden p-2 relative group">
                      {proofPreview ? (
                        <>
                          <img src={proofPreview} className="w-full h-full object-contain rounded shadow-sm opacity-90" alt="Proof" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-lg backdrop-blur-[1px]">
                            <button onClick={() => window.open(proofPreview, '_blank')} className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-md transition-transform hover:scale-105" title="View Full Image">
                              <Eye className="w-4 h-4" />
                            </button>
                            <a href={proofPreview} download="proof-of-address" className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-md transition-transform hover:scale-105" title="Download Image">
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Button onClick={() => proofRef.current?.click()} variant="outline" className="flex-1 text-primary-500 border-primary-200 bg-white hover:bg-primary-50 h-8 text-xs">
                        <UploadCloud className="w-3.5 h-3.5 mr-1.5"/> {proofPreview ? 'Change' : 'Upload'}
                      </Button>
                      {proofPreview && (
                        <Button onClick={() => handleRemoveDoc(setProofPreview)} variant="outline" className="flex-1 text-red-500 border-red-200 bg-white hover:bg-red-50 h-8 text-xs">
                          <Trash2 className="w-3.5 h-3.5 mr-1.5"/> Remove
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Upload Zone */}
                  <div onClick={() => otherDocsRef.current?.click()} className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center h-full bg-surface-50 hover:bg-gray-50 transition-colors cursor-pointer min-h-[220px] w-full relative overflow-hidden">
                    <input type="file" ref={otherDocsRef} className="hidden" multiple accept="image/*" onChange={handleOtherDocsChange} />
                    
                    {otherDocs.length > 0 ? (
                      <div className="w-full h-full flex flex-col items-center justify-center relative">
                         <div className="font-bold text-sm text-gray-900 absolute top-0 left-0">Other Documents</div>
                         <div className="flex -space-x-4 mb-2 mt-4">
                            {otherDocs.slice(0, 3).map((doc, i) => (
                              <img key={doc.id} src={doc.url} className="w-16 h-16 rounded-lg border-2 border-white shadow-sm object-contain bg-white" style={{ zIndex: 3 - i }} alt="doc" />
                            ))}
                           {otherDocs.length > 3 && (
                             <div className="w-16 h-16 rounded-lg border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 z-0">
                               +{otherDocs.length - 3}
                             </div>
                           )}
                         </div>
                         <div className="text-xs text-primary-500 font-bold mt-2">Click to add more</div>
                      </div>
                    ) : (
                      <>
                        <div className="w-full flex items-center gap-2 font-bold text-sm text-gray-900 mb-auto">
                           Other Documents <span className="text-gray-400 font-normal text-xs">(optional)</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center mt-auto mb-auto w-full">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border mb-3 shrink-0">
                            <UploadCloud className="w-5 h-5 text-primary-500" />
                          </div>
                          <div className="text-sm font-medium text-gray-900 text-center mb-1 w-full">Drag & drop files here</div>
                          <div className="text-sm text-gray-500 text-center mb-4 w-full">or <span className="text-primary-500 font-bold">click to browse</span></div>
                          <div className="text-[10px] text-gray-400 text-center w-full">Supports: JPG, PNG, PDF (Max 10MB)</div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </Card>
            </div>

            {/* ROW 4: Report Section */}
            <div className="xl:col-span-12 w-full">
              <Card className="p-6 border-border shadow-sm w-full overflow-hidden flex flex-col">
                <SectionBadge 
                  num="5" 
                  title="Report Section" 
                  action={
                    <Button className="bg-primary-500 text-white hover:bg-primary-600 h-8 text-xs font-bold px-4 shrink-0">
                      <FileText className="w-3.5 h-3.5 mr-1.5" /> Add Report
                    </Button>
                  }
                />
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="border-b border-border text-gray-900 font-bold">
                      <tr>
                        <th className="pb-3 px-4">Monitoring Company</th>
                        <th className="pb-3 px-4">Credit Report Date</th>
                        <th className="pb-3 px-4">Report File</th>
                        <th className="pb-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-gray-700">EPIC PRO Report V2</td>
                        <td className="py-4 px-4 text-gray-700">07/01/2026</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="truncate max-w-[200px] md:max-w-md">images/32143/1783557631051066367_Epic-V2.html</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary-500 border border-primary-200 bg-primary-50 hover:bg-primary-100 shrink-0">
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 shrink-0">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

          </div>

          {/* Footer Action */}
          <div className="flex justify-end mt-8 mb-4 w-full">
            <Button onClick={handleSave} className="bg-brand-gradient text-white px-8 py-6 text-base font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              Save Changes
            </Button>
          </div>

        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
