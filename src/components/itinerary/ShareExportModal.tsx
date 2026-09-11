import React, { useState } from 'react';
import {
  X,
  Share2,
  Download,
  Printer,
  Copy,
  Check,
  QrCode,
} from 'lucide-react';

import type { Itinerary } from '../../types';
import { useTripStore } from '../../store/useTripStore';

interface ShareExportModalProps {
  itinerary: Itinerary;
  onClose: () => void;
}

export const ShareExportModal: React.FC<ShareExportModalProps> = ({
  itinerary,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const addToast = useTripStore((state) => state.addToast);

  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    addToast('Itinerary link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(itinerary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `roamly-${itinerary.destination.toLowerCase()}-itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Itinerary JSON downloaded successfully', 'success');
  };

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#F5EBDD] max-w-md w-full overflow-hidden flex flex-col shadow-2xl text-left">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#12372A] flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#12372A]">
                Share or Export Itinerary
              </h3>
              <p className="text-[10px] text-gray-500">{itinerary.title}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Shareable Link Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 block">
              Shareable Web Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3 py-2 text-xs bg-[#FAFAF7] border border-[#F5EBDD] rounded-xl text-gray-600 truncate focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-2 rounded-xl bg-[#12372A] hover:bg-[#1a4d3a] text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#F28C28]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Export Action Cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-4 rounded-2xl border border-[#F5EBDD] bg-[#FAFAF7] hover:bg-white hover:border-[#12372A] transition-all text-left group"
            >
              <Printer className="w-5 h-5 text-[#12372A] mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-[#12372A]">Print / Save PDF</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Generate clean printable document
              </p>
            </button>

            {/* Download JSON */}
            <button
              type="button"
              onClick={handleDownloadJSON}
              className="p-4 rounded-2xl border border-[#F5EBDD] bg-[#FAFAF7] hover:bg-white hover:border-[#12372A] transition-all text-left group"
            >
              <Download className="w-5 h-5 text-[#F28C28] mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-[#12372A]">Download JSON</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Machine-readable trip backup
              </p>
            </button>
          </div>

          {/* Mobile Sync Badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3 text-xs text-emerald-900">
            <QrCode className="w-6 h-6 text-[#12372A] shrink-0" />
            <div>
              <p className="font-bold">Sync to Mobile</p>
              <p className="text-[10px] text-emerald-800">
                Share this link to your phone or travel companion to open in full offline view.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
