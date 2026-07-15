import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Select } from './Select';
import { useUIStore } from '@/store';

type MailingProvider = 'self' | 'pppams';

export function LettersGeneratedModal({
  zipUrl,
  fileName,
  roundLabel,
  itemsCount,
  initialMailingProvider,
}: {
  zipUrl: string;
  fileName: string;
  roundLabel: string;
  itemsCount: number;
  initialMailingProvider: MailingProvider;
}) {
  const { closeModal } = useUIStore();
  const [mailingProvider, setMailingProvider] = useState<MailingProvider>(initialMailingProvider);

  const mailingLabel = useMemo(() => {
    return mailingProvider === 'pppams' ? 'PPPAMS Provider (Ali badi)' : 'Print & Mail Myself';
  }, [mailingProvider]);

  return (
    <div className="p-2">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-gray-900">Letters Generated Successfully</h2>
            <p className="text-sm text-gray-600 mt-1">Your letters ZIP is ready. Download it below.</p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 border border-green-200 px-3 py-1 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Ready
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Round</div>
            <div className="text-sm font-extrabold text-gray-900 mt-1">{roundLabel}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Items Included</div>
            <div className="text-sm font-extrabold text-gray-900 mt-1">{itemsCount}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Mailing</div>
            <div className="text-sm font-extrabold text-gray-900 mt-1">{mailingLabel}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row gap-3">
          <a
            href={zipUrl}
            download={fileName}
            className="inline-flex items-center justify-center rounded-md bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold shadow-sm h-11 px-5"
          >
            Download ZIP
          </a>

          <div className="flex-1">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Mailing provider (optional)
            </label>
            <Select
              value={mailingProvider}
              onChange={(e) => setMailingProvider(e.target.value as MailingProvider)}
              options={[
                { label: 'Print & Mail Myself', value: 'self' },
                { label: 'PPPAMS Provider (Ali badi)', value: 'pppams' },
              ]}
              className="w-full bg-white"
            />
          </div>
        </div>

        {mailingProvider === 'pppams' && (
          <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="text-sm font-extrabold text-gray-900">PPPAMS Provider (Ali badi)</div>
            <p className="text-sm text-gray-700 mt-1">
              The Ali badi Team will get in touch with you within 1 to 10 mins and send you your letters invoice.
            </p>
            <div className="mt-3 text-sm font-bold text-gray-900">Phone: (914) 257-7468</div>
            <div className="text-sm font-bold text-gray-900">Email: sales@totalpostnprint.com</div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={closeModal} variant="outline" className="bg-white">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

