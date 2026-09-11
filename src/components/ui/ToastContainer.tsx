import React from 'react';
import { useTripStore } from '../../store/useTripStore';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const toasts = useTripStore((state) => state.toasts);
  const removeToast = useTripStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-sky-500/40 text-sky-900 bg-sky-50/95';

        if (toast.type === 'success') {
          Icon = CheckCircle;
          borderClass = 'border-emerald-600/40 text-[#12372A] bg-emerald-50/95';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-500/40 text-amber-900 bg-amber-50/95';
        } else if (toast.type === 'error') {
          Icon = XCircle;
          borderClass = 'border-rose-500/40 text-rose-900 bg-rose-50/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-2 ${borderClass}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-xs font-medium leading-relaxed flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 transition-colors p-0.5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
