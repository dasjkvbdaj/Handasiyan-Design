import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

const StatusModal = ({ 
  type = 'loading', // 'loading', 'success', 'error'
  message = '', 
  onClose,
  isOpen = false 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={type !== 'loading' ? onClose : undefined}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0b1612] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Icon Container */}
                <div className={`p-4 rounded-full ${
                  type === 'loading' ? 'bg-[#d4af37]/10' : 
                  type === 'success' ? 'bg-green-500/10' : 
                  'bg-red-500/10'
                }`}>
                  {type === 'loading' && (
                    <Loader2 size={40} className="text-[#d4af37] animate-spin" />
                  )}
                  {type === 'success' && (
                    <CheckCircle2 size={40} className="text-green-400" />
                  )}
                  {type === 'error' && (
                    <AlertCircle size={40} className="text-red-400" />
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {type === 'loading' ? 'Processing' : type === 'success' ? 'Success!' : 'Oops!'}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {message}
                  </p>
                </div>

                {/* Close Button (Success/Error only) */}
                {type !== 'loading' && (
                  <button
                    onClick={onClose}
                    className="mt-2 px-8 py-3 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#b8962d] transition-all duration-300 w-full uppercase tracking-widest text-[10px]"
                  >
                    Continue
                  </button>
                )}
              </div>

              {/* Top-right close X (Success/Error only) */}
              {type !== 'loading' && (
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StatusModal;
