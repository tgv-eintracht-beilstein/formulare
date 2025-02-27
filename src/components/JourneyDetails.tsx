import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useFormStore } from '../store';
import type { Journey } from '../types';

export const JourneyDetails: React.FC = () => {
  const { formData, addJourney, removeJourney } = useFormStore();
  const [newJourney, setNewJourney] = useState<Journey>({
    from: '',
    to: '',
    date: '',
  });

  const handleAdd = () => {
    if (newJourney.from && newJourney.to && newJourney.date) {
      addJourney(newJourney);
      setNewJourney({ from: '', to: '', date: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input
          type="text"
          placeholder="From"
          value={newJourney.from}
          onChange={(e) => setNewJourney({ ...newJourney, from: e.target.value })}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          placeholder="To"
          value={newJourney.to}
          onChange={(e) => setNewJourney({ ...newJourney, to: e.target.value })}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="date"
          value={newJourney.date}
          onChange={(e) => setNewJourney({ ...newJourney, date: e.target.value })}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleAdd}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus size={16} /> Hinzufügen
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-medium">Einträge</h3>
        <div className="mt-4 space-y-4">
          {formData.journeys.map((journey, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm transition-colors hover:bg-gray-100"
            >
              <div className="flex-1">
                <p>
                  Von <span className="font-medium">{journey.from}</span> bis{' '}
                  <span className="font-medium">{journey.to}</span>
                </p>
                <p className="text-sm text-gray-500">{journey.date}</p>
              </div>
              <button
                onClick={() => removeJourney(index)}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};