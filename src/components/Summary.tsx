import React from 'react';
import { useFormStore } from '../store';
import { Clock, Users } from 'lucide-react';

export const Summary: React.FC = () => {
  const { formData } = useFormStore();

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">Persönliche Informationen</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-sm font-medium">{formData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">E-Mail</p>
            <p className="text-sm font-medium">{formData.email}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">Trainings</h3>
        <div className="mt-4 space-y-4">
          {formData.trainings.map((training, index) => (
            <div key={index} className="rounded-lg bg-gray-50 p-4">
              <p className="font-medium text-gray-900">{training.title}</p>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span>{training.date}</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {training.duration}h
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {training.participants} participants
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">Legal Acceptance</h3>
        <div className="mt-4">
          <p className="text-sm">
            Terms and Conditions:{' '}
            <span className="font-medium">
              {formData.acceptedTerms ? 'Accepted' : 'Not accepted'}
            </span>
          </p>
          <p className="text-sm">
            Privacy Policy:{' '}
            <span className="font-medium">
              {formData.acceptedPrivacy ? 'Accepted' : 'Not accepted'}
            </span>
          </p>
        </div>
      </div>

      {formData.signature && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">Signatur</h3>
          <div className="mt-4">
            <img
              src={formData.signature}
              alt="Signatur"
              className="max-h-32 w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};