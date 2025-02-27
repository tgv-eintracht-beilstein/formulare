import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useFormStore } from '../store';

export const Signature: React.FC = () => {
  const { updateFormData } = useFormStore();
  const signatureRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      updateFormData({ signature: '' });
    }
  };

  const handleSave = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL();
      updateFormData({ signature: signatureData });
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-300 bg-white">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            className: 'signature-canvas w-full h-64',
          }}
          onEnd={handleSave}
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleClear}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Löschen
        </button>
      </div>
    </div>
  );
};