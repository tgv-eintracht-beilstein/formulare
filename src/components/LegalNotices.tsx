import React from 'react';
import { useFormStore } from '../store';

export const LegalNotices: React.FC = () => {
  const { formData, updateFormData } = useFormStore();

  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="terms"
            type="checkbox"
            checked={formData.acceptedTerms}
            onChange={(e) => updateFormData({ acceptedTerms: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="terms" className="text-sm text-gray-700">
            I accept the terms and conditions
          </label>
          <p className="mt-1 text-xs text-gray-500">
            By accepting, you agree to our terms of service and acknowledge that
            you have read our privacy policy.
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="privacy"
            type="checkbox"
            checked={formData.acceptedPrivacy}
            onChange={(e) => updateFormData({ acceptedPrivacy: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="privacy" className="text-sm text-gray-700">
            I agree to the privacy policy
          </label>
          <p className="mt-1 text-xs text-gray-500">
            We will process your personal information in accordance with our
            privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};