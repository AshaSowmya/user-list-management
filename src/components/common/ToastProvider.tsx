'use client';

import React, { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';

export const toastRef = { current: null as any };

export default function ToastProvider() {
  const localRef = useRef<Toast>(null);

  useEffect(() => {
    toastRef.current = localRef.current;
  }, []);

  return (
    <>
      <style>{`
        .p-toast {
          width: 300px !important; /* fixed width */
          max-width: 90vw; /* in case screen is smaller than 300px */
          right: 1rem !important;
          left: auto !important;
        }

        .p-toast .p-toast-message {
          padding: 0.5rem 1rem !important;
          font-size: 0.85rem !important;
          line-height: 1.2 !important;
          word-break: break-word;
          box-sizing: border-box;
        }

        .p-toast-message .p-toast-message-icon {
          font-size: 1rem !important;
          margin-right: 0.5rem !important;
        }

        .p-toast-message .p-toast-summary,
        .p-toast-message .p-toast-detail {
          font-size: 0.8rem !important;
          line-height: 1.2 !important;
        }

        .p-toast .p-toast-icon-close {
          width: 1rem !important;
          height: 1rem !important;
          font-size: 1rem !important;
        }

        @media (max-width: 400px) {
          .p-toast {
            right: 0.5rem !important;
          }
        }
      `}</style>

      <Toast ref={localRef} position="top-right" />
    </>
  );
}
