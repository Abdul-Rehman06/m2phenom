import { useEffect, useState } from 'react';
import { Zap, Printer } from 'lucide-react';
import { ContentWrapper } from '@/layouts';
import { Card, Button, PageTransition, Select, Input, Textarea, LettersGeneratedModal } from '@/components';
import { APP_CONFIG } from '@/constants';
import { useUIStore } from '@/store';

export function AIGenerator() {
  const { openConfirmDialog, openModal } = useUIStore();
  const [selectedClient, setSelectedClient] = useState('');
  const [roundOfAttack, setRoundOfAttack] = useState('round_1');
  const [mailingOption, setMailingOption] = useState<'self' | 'pppams'>('self');
  const [letterAggression, setLetterAggression] = useState('standard');
  const [generatedZipUrl, setGeneratedZipUrl] = useState<string | null>(null);

  const [pppamsInfo, setPppamsInfo] = useState({
    prodigyUsername: '',
    name: '',
    facebookUsername: '',
    email: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    return () => {
      if (generatedZipUrl) URL.revokeObjectURL(generatedZipUrl);
    };
  }, [generatedZipUrl]);

  const handleGenerate = () => {
    openConfirmDialog({
      title: 'Generate Letters',
      description: 'Are you sure you want to generate letters?',
      confirmText: 'Yes, Generate',
      cancelText: 'Cancel',
      onConfirm: () => {
        const payload = [
          `M2 PHENOM - AI Letters Generated`,
          `Client: ${selectedClient || '(not selected)'}`,
          `Round: ${roundOfAttack}`,
          `Aggression: ${letterAggression}`,
          `Mailing: ${mailingOption === 'pppams' ? 'PPPAMS Provider (Ali badi)' : 'Print & Mail Myself'}`,
        ].join('\n');

        const blob = new Blob([payload], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        setGeneratedZipUrl(url);

        openModal(
          <LettersGeneratedModal
            zipUrl={url}
            fileName={`ai_letters_${roundOfAttack}.zip`}
            roundLabel={`Round ${roundOfAttack.split('_')[1] || '1'}`}
            itemsCount={0}
            initialMailingProvider={mailingOption}
          />,
          'lg'
        );
      },
    });
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-12 w-full flex flex-col">
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none -translate-y-10 translate-x-20 z-0">
          <img src={APP_CONFIG.logoUrl} className="w-[800px] h-[800px] object-contain grayscale" alt="watermark" />
        </div>

        <ContentWrapper className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="mb-8 text-center w-full">
            <div className="w-16 h-16 bg-orange-100 text-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Generator</h1>
            <p className="text-gray-500">Streamlined, 1-click letter generation. Skip the manual steps.</p>
          </div>

          <Card className="p-8 border-border shadow-md w-full bg-white flex flex-col gap-6">
            
            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-gray-700">Select Client</label>
              <Select 
                options={[
                  { label: 'Select a client...', value: '' },
                  { label: 'Kerron Lenny Murphy', value: '1' },
                  { label: 'John Doe', value: '2' },
                ]} 
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-gray-700">Select Round of Attack Number</label>
              <Select
                options={Array.from({ length: 8 }, (_, i) => ({ label: `Round ${i + 1}`, value: `round_${i + 1}` }))}
                value={roundOfAttack}
                onChange={(e) => setRoundOfAttack(e.target.value)}
                className="w-full bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-gray-700">Select Letter Aggression</label>
              <Select
                options={[
                  { label: 'Soft', value: 'soft' },
                  { label: 'Standard', value: 'standard' },
                  { label: 'Aggressive', value: 'aggressive' },
                  { label: 'Maximum', value: 'maximum' },
                ]}
                value={letterAggression}
                onChange={(e) => setLetterAggression(e.target.value)}
                className="w-full bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="block text-sm font-bold text-gray-700">Printing & Mailing Option</label>
              <div className="relative">
                <Printer className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Select 
                  options={[
                    { label: 'Print & Mail Myself', value: 'self' },
                    { label: 'PPPAMS Provider (Ali badi)', value: 'pppams' },
                  ]} 
                  value={mailingOption}
                  onChange={(e) => setMailingOption(e.target.value as any)}
                  className="w-full pl-9 bg-gray-50"
                />
              </div>
            </div>

            {mailingOption === 'pppams' && (
              <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
                <div className="text-sm font-extrabold text-gray-900">PPPAMS INFO</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">My Prodigy username is</label>
                    <Input value={pppamsInfo.prodigyUsername} onChange={(e) => setPppamsInfo((p) => ({ ...p, prodigyUsername: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">My NAME is <span className="text-red-500">(Required)</span></label>
                    <Input value={pppamsInfo.name} onChange={(e) => setPppamsInfo((p) => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">My Facebook username is <span className="text-red-500">(Required)</span></label>
                    <Input value={pppamsInfo.facebookUsername} onChange={(e) => setPppamsInfo((p) => ({ ...p, facebookUsername: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">My best email is <span className="text-red-500">(Required)</span></label>
                    <Input value={pppamsInfo.email} onChange={(e) => setPppamsInfo((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">My best Phone number is <span className="text-red-500">(Required)</span></label>
                    <Input value={pppamsInfo.phone} onChange={(e) => setPppamsInfo((p) => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-800">NOTES:(add UP to 750 characters as note to PPAMS Provider if desired)</label>
                    <Textarea value={pppamsInfo.notes} onChange={(e) => setPppamsInfo((p) => ({ ...p, notes: e.target.value.slice(0, 750) }))} className="min-h-[120px]" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-6 border-t border-border">
              <Button onClick={handleGenerate} className="w-full bg-brand-gradient text-white font-bold py-4 text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                <Zap className="w-5 h-5 mr-2 fill-current" /> Generate Instantly
              </Button>
            </div>

          </Card>
          
        </ContentWrapper>
      </div>
    </PageTransition>
  );
}
