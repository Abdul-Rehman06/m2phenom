import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Mail, FileText, UserPlus, Link as LinkIcon, Copy, ExternalLink, Share2,
  Search, Calendar, Plus, Download, Upload, Edit2, RefreshCw, MoreHorizontal,
  Headphones, GraduationCap, CloudUpload, Trash2
} from 'lucide-react';
import { ContentWrapper, PageHeader } from '@/layouts';
import {
  Card, Button, Input, Select, Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Badge, Avatar, Tooltip, Checkbox, PageTransition
} from '@/components';
import { useUIStore } from '@/store/useUIStore';

// --- MOCK DATA ---
const MOCK_CLIENTS = [
  {
    id: 1,
    name: 'Test Test',
    role: 'Client',
    addedBy: 'Dion',
    email: 'teststststs123456789@gmail.com',
    dateAdded: 'Dec 05, 2025',
    status: 'Active',
    initials: 'TT',
  },
  {
    id: 2,
    name: 'Caron Elizabeth Sample',
    role: 'Client',
    addedBy: 'Dion',
    email: 'xauprints@gmail.com',
    dateAdded: 'Oct 08, 2025',
    status: 'Imported',
    initials: 'CS',
  },
  {
    id: 3,
    name: 'Delete Me',
    role: 'Client',
    addedBy: 'Dion',
    email: 'dflya@mailinator.com',
    dateAdded: 'Oct 08, 2025',
    status: 'Needs Attention',
    initials: 'DM',
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

type ClientRow = {
  id: number;
  name: string;
  role: string;
  addedBy: string;
  email: string;
  dateAdded: string;
  status: string;
  initials: string;
};

function safeParseDate(input: string) {
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ComposeMessageModal({
  mode,
  clientName,
  clientEmail,
}: {
  mode: 'sms' | 'email';
  clientName: string;
  clientEmail: string;
}) {
  const { closeModal, addToast } = useUIStore();
  const [subject, setSubject] = useState(mode === 'email' ? `Message for ${clientName}` : '');
  const [message, setMessage] = useState('');

  return (
    <div className="p-1">
      <div className="text-lg font-extrabold text-gray-900">{mode === 'sms' ? 'Send SMS' : 'Send Email'}</div>
      <div className="text-sm text-gray-600 mt-1">{clientName}{mode === 'email' ? ` · ${clientEmail}` : ''}</div>

      <div className="mt-5 flex flex-col gap-4">
        {mode === 'email' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700">Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-white" />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[140px] rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
            placeholder={mode === 'sms' ? 'Type SMS message...' : 'Type email message...'}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" className="bg-white" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className="bg-brand-gradient text-white font-bold"
            onClick={() => {
              addToast({ title: mode === 'sms' ? 'SMS queued successfully.' : 'Email queued successfully.', variant: 'success' });
              closeModal();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

function InviteClientModal() {
  const { closeModal, addToast } = useUIStore();
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [note, setNote] = useState('');

  return (
    <div className="p-1">
      <div className="text-lg font-extrabold text-gray-900">Invite Client</div>
      <div className="text-sm text-gray-600 mt-1">Send an invitation to your client.</div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-gray-700">Client Email / Phone</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white" placeholder="client@email.com or +1..." />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Method</label>
          <Select
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            options={[
              { label: 'Email', value: 'email' },
              { label: 'SMS', value: 'sms' },
            ]}
            className="bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Quick Note (optional)</label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} className="bg-white" placeholder="Add a short note..." />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6">
        <Button variant="outline" className="bg-white" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          className="bg-brand-gradient text-white font-bold"
          onClick={() => {
            if (!email.trim()) {
              addToast({ title: 'Email/phone is required.', variant: 'danger' });
              return;
            }
            addToast({ title: `Invite sent via ${method.toUpperCase()}.`, description: note.trim() || undefined, variant: 'success' });
            closeModal();
          }}
        >
          Send Invite
        </Button>
      </div>
    </div>
  );
}

function UploadClientFileModal({ clientName }: { clientName: string }) {
  const { closeModal, addToast } = useUIStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');

  return (
    <div className="p-1">
      <div className="text-lg font-extrabold text-gray-900">Upload File</div>
      <div className="text-sm text-gray-600 mt-1">{clientName}</div>

      <div className="mt-5">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setFileName(f.name);
          }}
        />
        <div
          className="border border-dashed border-border rounded-xl p-6 bg-surface-50 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900">{fileName ? fileName : 'Choose a file to upload'}</div>
              <div className="text-xs text-gray-500">Supports: PDF, JPG, PNG, HTML</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6">
        <Button variant="outline" className="bg-white" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          className="bg-brand-gradient text-white font-bold"
          onClick={() => {
            if (!fileName) {
              addToast({ title: 'Please select a file first.', variant: 'danger' });
              return;
            }
            addToast({ title: 'File uploaded (mock).', description: fileName, variant: 'success' });
            closeModal();
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

function ClientActionsModal({
  client,
  clientLink,
  onOpenProfile,
  onDelete,
}: {
  client: ClientRow;
  clientLink: string;
  onOpenProfile: () => void;
  onDelete: () => void;
}) {
  const { closeModal, addToast } = useUIStore();

  return (
    <div className="p-1">
      <div className="text-lg font-extrabold text-gray-900">Client Actions</div>
      <div className="text-sm text-gray-600 mt-1">{client.name}</div>

      <div className="mt-5 grid grid-cols-1 gap-2">
        <Button
          onClick={() => {
            onOpenProfile();
            closeModal();
          }}
          variant="outline"
          className="bg-white justify-start"
        >
          <Edit2 className="w-4 h-4 mr-2" /> Open Profile
        </Button>
        <Button
          onClick={async () => {
            try {
              await copyText(clientLink);
              addToast({ title: 'Client link copied.', variant: 'success' });
              closeModal();
            } catch {
              addToast({ title: 'Failed to copy client link.', variant: 'danger' });
            }
          }}
          variant="outline"
          className="bg-white justify-start"
        >
          <Copy className="w-4 h-4 mr-2" /> Copy Onboarding Link
        </Button>
        <Button
          onClick={() => {
            window.open(clientLink, '_blank');
            closeModal();
          }}
          variant="outline"
          className="bg-white justify-start"
        >
          <ExternalLink className="w-4 h-4 mr-2" /> Open Onboarding Link
        </Button>
        <Button
          onClick={() => {
            closeModal();
            onDelete();
          }}
          variant="outline"
          className="bg-white justify-start text-red-600 border-red-200 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete Client
        </Button>
      </div>
    </div>
  );
}

export function ClientManager() {
  const navigate = useNavigate();
  const { openModal, openConfirmDialog, addToast } = useUIStore();
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [clients, setClients] = useState<ClientRow[]>(MOCK_CLIENTS as any);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addedByFilter, setAddedByFilter] = useState('all');
  const [dateSort, setDateSort] = useState<'newest' | 'oldest'>('newest');

  const referralLink = 'https://m2phenom.com/get-started?ref=dion';

  const toggleSelectAll = () => {
    const visibleIds = filteredClients.map((c) => c.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedClients.includes(id));
    if (allVisibleSelected) {
      setSelectedClients((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }
    setSelectedClients((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const toggleSelect = (id: number) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter(cId => cId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success" className="bg-success-50 text-success-700 border-success-200 gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success-500"/>Active</Badge>;
      case 'Imported':
        return <Badge variant="primary" className="bg-blue-50 text-blue-700 border-blue-200 gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"/>Imported</Badge>;
      case 'Needs Attention':
        return <Badge variant="danger" className="bg-danger-50 text-danger-700 border-danger-200 gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-danger-500"/>Needs Attention</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const statusOptions = useMemo(() => {
    const uniq = Array.from(new Set(clients.map(c => c.status)));
    return [{ label: 'Status: All', value: 'all' }, ...uniq.map(s => ({ label: s, value: s }))];
  }, [clients]);

  const addedByOptions = useMemo(() => {
    const uniq = Array.from(new Set(clients.map(c => c.addedBy)));
    return [{ label: 'Added By: All', value: 'all' }, ...uniq.map(s => ({ label: s, value: s }))];
  }, [clients]);

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = clients.filter((c) => {
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesAddedBy = addedByFilter === 'all' || c.addedBy === addedByFilter;
      return matchesSearch && matchesStatus && matchesAddedBy;
    });

    return base.sort((a, b) => {
      const at = safeParseDate(a.dateAdded);
      const bt = safeParseDate(b.dateAdded);
      return dateSort === 'newest' ? bt - at : at - bt;
    });
  }, [clients, search, statusFilter, addedByFilter, dateSort]);

  const getClientLink = (client: ClientRow) => {
    return `https://client.m2phenom.com/onboard?client=${client.id}`;
  };

  const exportClientsCsv = (rows: ClientRow[], fileName: string) => {
    const header = ['id', 'name', 'email', 'status', 'addedBy', 'dateAdded'];
    const lines = [
      header.join(','),
      ...rows.map((r) => [
        r.id,
        `"${r.name.replace(/"/g, '""')}"`,
        `"${r.email.replace(/"/g, '""')}"`,
        `"${r.status.replace(/"/g, '""')}"`,
        `"${r.addedBy.replace(/"/g, '""')}"`,
        `"${r.dateAdded.replace(/"/g, '""')}"`,
      ].join(',')),
    ].join('\n');
    downloadBlob(new Blob([lines], { type: 'text/csv;charset=utf-8' }), fileName);
  };

  const allVisibleSelected = useMemo(() => {
    const visibleIds = filteredClients.map((c) => c.id);
    return visibleIds.length > 0 && visibleIds.every((id) => selectedClients.includes(id));
  }, [filteredClients, selectedClients]);

  const selectedVisibleCount = useMemo(() => {
    const visibleIds = new Set(filteredClients.map((c) => c.id));
    return selectedClients.filter((id) => visibleIds.has(id)).length;
  }, [filteredClients, selectedClients]);

  const handleCopy = async (text: string, label: string) => {
    try {
      await copyText(text);
      addToast({ title: `${label} copied.`, variant: 'success' });
    } catch {
      addToast({ title: `Failed to copy ${label}.`, variant: 'danger' });
    }
  };

  const handleShare = async (text: string) => {
    try {
      const nav: any = navigator as any;
      if (nav.share) {
        await nav.share({ title: 'M2 Phenom Link', text, url: text });
        addToast({ title: 'Shared successfully.', variant: 'success' });
        return;
      }
      await handleCopy(text, 'Link');
    } catch {
      addToast({ title: 'Share cancelled.', variant: 'primary' });
    }
  };

  const handleDeleteClient = (client: ClientRow) => {
    openConfirmDialog({
      title: 'Delete Client',
      description: `Are you sure you want to delete ${client.name}?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
      onConfirm: () => {
        setClients((prev) => prev.filter((c) => c.id !== client.id));
        setSelectedClients((prev) => prev.filter((id) => id !== client.id));
        addToast({ title: 'Client deleted.', variant: 'success' });
      },
    });
  };

  return (
    <PageTransition>
      <ContentWrapper className="max-w-full px-4 md:px-8 xl:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          
          {/* Header & Top Stats */}
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start">
            <motion.div variants={itemVariants} className="max-w-md">
              <PageHeader 
                title="Client Manager" 
                description="Manage your clients, reports, and onboarding all in one place."
                className="mb-0"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full xl:w-auto">
              <Card className="p-4 flex flex-col justify-center border-border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-sm font-medium text-foreground">Active Clients</h4>
                <p className="text-xs text-surface-500">All time</p>
              </Card>

              <Card className="p-4 flex flex-col justify-center border-border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-2xl font-bold">127</span>
                </div>
                <h4 className="text-sm font-medium text-foreground">GA Used</h4>
                <p className="text-xs text-surface-500">This month</p>
              </Card>

              <Card className="p-4 flex flex-col justify-center border-border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-sm font-medium text-foreground">Pending Reports</h4>
                <p className="text-xs text-surface-500">Awaiting upload</p>
              </Card>

              <Card className="p-4 flex flex-col justify-center border-border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-sm font-medium text-foreground">New This Month</h4>
                <p className="text-xs text-surface-500">Added this month</p>
              </Card>
            </motion.div>
          </div>

          {/* Referral Link Banner */}
          <motion.div variants={itemVariants}>
            <Card className="p-1 bg-gradient-to-r from-primary-500/5 to-transparent border border-primary-500/20 shadow-sm">
              <div className="bg-surface rounded-lg p-5 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                
                <div className="flex gap-4 items-start w-full lg:w-auto">
                  <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      Your Credit Report Referral Link
                      <div className="w-4 h-4 rounded-full border border-surface-300 text-surface-400 flex items-center justify-center text-[10px]">i</div>
                    </h3>
                    <p className="text-sm text-surface-500 mb-4">Share this link with clients to invite them to pull their credit report.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1 max-w-md">
                        <Input 
                          value={referralLink} 
                          readOnly 
                          className="bg-surface-50 text-surface-600 w-full pr-4"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleCopy(referralLink, 'Referral link')} variant="primary" className="bg-brand-gradient text-white border-0 shadow-sm">
                          <Copy className="w-4 h-4 mr-2" /> Copy Link
                        </Button>
                        <Button onClick={() => window.open(referralLink, '_blank')} variant="outline" className="bg-white">
                          <ExternalLink className="w-4 h-4 mr-2" /> Open Link
                        </Button>
                        <Button onClick={() => handleShare(referralLink)} variant="outline" className="bg-white">
                          <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-xl p-4 flex gap-4 items-center border border-primary-100 w-full lg:w-auto shrink-0">
                  <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Earn More Credits</h4>
                    <p className="text-xs text-surface-600">Earn GA credits when your<br/>referrals pull a report!</p>
                  </div>
                </div>

              </div>
            </Card>
          </motion.div>

          {/* Table Filters & Actions */}
          <motion.div variants={itemVariants} className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mt-8 w-full">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-1 w-full">
              <div className="relative w-full sm:w-64 xl:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients by name or email..." className="pl-9 bg-white w-full" />
              </div>
              <Select className="w-full sm:w-40 bg-white" options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
              <Select className="w-full sm:w-40 bg-white" options={addedByOptions} value={addedByFilter} onChange={(e) => setAddedByFilter(e.target.value)} />
              <Button
                onClick={() => {
                  setDateSort((p) => (p === 'newest' ? 'oldest' : 'newest'));
                  addToast({ title: `Sorted by date: ${dateSort === 'newest' ? 'Oldest first' : 'Newest first'}.`, variant: 'primary' });
                }}
                variant="outline"
                className="bg-white text-surface-600 w-full sm:w-auto"
              >
                Date Added ({dateSort === 'newest' ? 'Newest' : 'Oldest'}) <Calendar className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0 w-full xl:w-auto">
              <Button
                onClick={() => navigate('/users/manage-profiles/new')}
                variant="primary"
                className="bg-brand-gradient text-white border-0 shadow-sm flex-1 sm:flex-none"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Client
              </Button>
              <Button
                onClick={() => openModal(<InviteClientModal />, 'md')}
                variant="outline"
                className="text-primary-600 border-primary-200 bg-primary-50 hover:bg-primary-100 flex-1 sm:flex-none"
              >
                <UserPlus className="w-4 h-4 mr-2" /> Invite Client
              </Button>
              <Button
                onClick={() => navigate('/users/import-client-files/import-client')}
                variant="outline"
                className="text-primary-600 border-primary-200 bg-primary-50 hover:bg-primary-100 flex-1 sm:flex-none"
              >
                <Upload className="w-4 h-4 mr-2" /> Import MFSN
              </Button>
              <Button
                onClick={() => {
                  const visibleIds = new Set(filteredClients.map((c) => c.id));
                  const selectedRows = clients.filter((c) => selectedClients.includes(c.id) && visibleIds.has(c.id));
                  const rows = selectedRows.length ? selectedRows : filteredClients;
                  exportClientsCsv(rows, selectedRows.length ? 'selected_clients.csv' : 'clients.csv');
                  addToast({ title: 'CSV exported.', variant: 'success' });
                }}
                variant="outline"
                className="bg-white flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>
          </motion.div>

          {selectedVisibleCount > 0 && (
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm font-bold text-gray-900">
                {selectedVisibleCount} selected
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    const visibleIds = new Set(filteredClients.map((c) => c.id));
                    const selectedRows = clients.filter((c) => selectedClients.includes(c.id) && visibleIds.has(c.id));
                    exportClientsCsv(selectedRows, 'selected_clients.csv');
                    addToast({ title: 'Selected CSV exported.', variant: 'success' });
                  }}
                  variant="outline"
                  className="bg-white"
                >
                  <Download className="w-4 h-4 mr-2" /> Export Selected
                </Button>
                <Button
                  onClick={() => openModal(<InviteClientModal />, 'md')}
                  variant="outline"
                  className="text-primary-600 border-primary-200 bg-primary-50 hover:bg-primary-100"
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Invite Selected
                </Button>
                <Button onClick={() => setSelectedClients([])} variant="outline" className="bg-white">
                  Clear Selection
                </Button>
              </div>
            </motion.div>
          )}

          {/* Clients Data Table */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-sm border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-surface-50 hover:bg-surface-50 border-b border-border">
                    <TableHead className="w-12 pl-6">
                      <Checkbox 
                        checked={allVisibleSelected} 
                        onChange={toggleSelectAll} 
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-xs text-surface-500 uppercase tracking-wider">Client</TableHead>
                    <TableHead className="font-semibold text-xs text-surface-500 uppercase tracking-wider">Added By</TableHead>
                    <TableHead className="font-semibold text-xs text-surface-500 uppercase tracking-wider">Email</TableHead>
                    <TableHead className="font-semibold text-xs text-surface-500 uppercase tracking-wider">Date Added <Download className="w-3 h-3 inline-block ml-1" /></TableHead>
                    <TableHead className="font-semibold text-xs text-surface-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="font-semibold text-xs text-surface-500 uppercase tracking-wider text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 && (
                    <TableRow className="border-b border-border">
                      <TableCell colSpan={7} className="py-10 text-center text-sm text-gray-500">
                        No clients match your filters.
                      </TableCell>
                    </TableRow>
                  )}

                  {filteredClients.map((client) => (
                    <TableRow key={client.id} className="group border-b border-border hover:bg-surface-50/50">
                      <TableCell className="pl-6">
                        <Checkbox 
                          checked={selectedClients.includes(client.id)} 
                          onChange={() => toggleSelect(client.id)} 
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar fallback={client.initials} className="w-10 h-10 bg-primary-100 text-primary-700 font-bold" />
                          <div>
                            <div 
                              className="font-medium text-foreground cursor-pointer hover:text-primary-500 transition-colors"
                              onClick={() => navigate(`/users/manage-profiles/${client.id}`)}
                            >
                              {client.name}
                            </div>
                            <div className="text-xs text-surface-500">{client.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-surface-600">{client.addedBy}</TableCell>
                      <TableCell className="text-surface-600">{client.email}</TableCell>
                      <TableCell className="text-surface-600">{client.dateAdded}</TableCell>
                      <TableCell>{getStatusBadge(client.status)}</TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Tooltip content="Send SMS">
                            <Button
                              onClick={() => openModal(<ComposeMessageModal mode="sms" clientName={client.name} clientEmail={client.email} />, 'md')}
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-primary-600 bg-primary-50 hover:bg-primary-100"
                            >
                              <span className="text-xs font-bold">SMS</span>
                            </Button>
                          </Tooltip>
                          <Tooltip content="Send Email">
                            <Button
                              onClick={() => openModal(<ComposeMessageModal mode="email" clientName={client.name} clientEmail={client.email} />, 'md')}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-surface-500 hover:text-foreground border border-border bg-white"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit Client">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-surface-500 hover:text-foreground border border-border bg-white"
                              onClick={() => navigate(`/users/manage-profiles/${client.id}`)}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Copy Link">
                            <Button
                              onClick={() => handleCopy(getClientLink(client), 'Client link')}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-surface-500 hover:text-foreground border border-border bg-white"
                            >
                              <LinkIcon className="w-3.5 h-3.5" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Refresh Data">
                            <Button
                              onClick={() => addToast({ title: 'Client data refreshed (mock).', description: client.name, variant: 'success' })}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-surface-500 hover:text-foreground border border-border bg-white"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Upload File">
                            <Button
                              onClick={() => openModal(<UploadClientFileModal clientName={client.name} />, 'md')}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-surface-500 hover:text-foreground border border-border bg-white"
                            >
                              <Upload className="w-3.5 h-3.5" />
                            </Button>
                          </Tooltip>
                          <Button
                            onClick={() =>
                              openModal(
                                <ClientActionsModal
                                  client={client}
                                  clientLink={getClientLink(client)}
                                  onOpenProfile={() => navigate(`/users/manage-profiles/${client.id}`)}
                                  onDelete={() => handleDeleteClient(client)}
                                />,
                                'md'
                              )
                            }
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-surface-400 hover:text-foreground"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>

          {/* Bottom Action Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
            <Card className="p-5 border-border shadow-sm flex flex-col hover-lift">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4 text-primary-600 border border-primary-100">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-foreground mb-1">Client Onboarding Link</h4>
              <p className="text-sm text-surface-500 mb-6 flex-1">Share your onboarding link so clients can get started.</p>
              <Button
                onClick={async () => {
                  await handleCopy(referralLink, 'Onboarding link');
                  navigate('/users/client-onboarding-link');
                }}
                variant="primary"
                className="w-full bg-brand-gradient text-white border-0"
              >
                Copy Link <Copy className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            <Card className="p-5 border-border shadow-sm flex flex-col hover-lift">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600 border border-blue-100">
                <CloudUpload className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-foreground mb-1">Import Client Files</h4>
              <p className="text-sm text-surface-500 mb-6 flex-1">Upload MFSN or client data files in bulk.</p>
              <Button onClick={() => navigate('/users/import-client-files/import-client')} variant="outline" className="w-full text-primary-600 border-primary-200">
                Import MFSN <Upload className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            <Card className="p-5 border-border shadow-sm flex flex-col hover-lift">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-orange-600 border border-orange-100">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-foreground mb-1">Book Support</h4>
              <p className="text-sm text-surface-500 mb-6 flex-1">Schedule a 1:1 walkthrough with our team.</p>
              <Button onClick={() => window.open('https://calendly.com/', '_blank')} variant="outline" className="w-full">
                Book Now <Calendar className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            <Card className="p-5 border-border shadow-sm flex flex-col hover-lift">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-purple-600 border border-purple-100">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-foreground mb-1">Training & Help</h4>
              <p className="text-sm text-surface-500 mb-6 flex-1">Access tutorials, guides and live training.</p>
              <Button onClick={() => window.open('https://m2phenom.com/training', '_blank')} variant="outline" className="w-full text-primary-600 border-primary-200">
                Go to Training <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>

        </motion.div>
      </ContentWrapper>
    </PageTransition>
  );
}
