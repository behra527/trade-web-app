import React, { useEffect } from 'react';

interface CustomToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'loading';
  onClose: () => void;
  duration?: number;
}

const iconStyle =
  'flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-md';

export const CustomToast: React.FC<CustomToastProps> = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-6 right-6 z-100 px-6 py-4 rounded-2xl shadow-2xl text-white flex items-center gap-4 animate-slide-in-toast bg-gradient-to-br from-blue-600 to-purple-700 border border-slate-800`}
      style={{ minWidth: 260, maxWidth: 400 }}
    >
      {/* Icon */}
      {type === 'success' && (
        <span className={iconStyle} style={{ borderColor: '#22d3ee', background: 'linear-gradient(135deg, #3b82f6 60%, #a21caf 100%)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#fff" strokeWidth="2" fill="none" />
            <path d="M8 12.5l3 3 5-5.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
      )}
      {type === 'error' && (
        <span className={iconStyle} style={{ borderColor: '#f87171', background: 'linear-gradient(135deg, #ef4444 60%, #a21caf 100%)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#fff" strokeWidth="2" fill="none" />
            <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      )}
      {type === 'loading' && (
        <span className={iconStyle} style={{ borderColor: '#38bdf8', background: 'linear-gradient(135deg, #0ea5e9 60%, #a21caf 100%)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#fff" strokeWidth="2" fill="none" opacity="0.3" />
            <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="2.2" fill="none" strokeDasharray="44" strokeDashoffset="20">
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
      )}
      {type === 'info' && (
        <span className={iconStyle} style={{ borderColor: '#818cf8', background: 'linear-gradient(135deg, #6366f1 60%, #a21caf 100%)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#fff" strokeWidth="2" fill="none" />
            <text x="12" y="17" textAnchor="middle" fontSize="14" fill="#fff">i</text>
          </svg>
        </span>
      )}
      {/* Message */}
      <span className="font-semibold text-base whitespace-pre-line" style={{ letterSpacing: 0.1 }}>{message}</span>
      {/* Close button */}
      <button onClick={onClose} className="ml-auto text-white/70 hover:text-white text-lg px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white/40 transition">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#fff" strokeWidth="1.5" fill="none" />
          <path d="M7 7l6 6M13 7l-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};
