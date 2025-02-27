import React, { useState } from 'react';
import { FileText, Plus, Trash2, Clock, Copy, ClipboardPlus, Edit } from 'lucide-react';
import { useFormStore } from '../store';
import type { Training } from '../types';

const timeDifferenceInHours = (start: string, end: string) => {
  const startParts = start.split(':');
  const endParts = end.split(':');
  const startDate = new Date(0, 0, 0, parseInt(startParts[0]), parseInt(startParts[1]));
  const endDate = new Date(0, 0, 0, parseInt(endParts[0]), parseInt(endParts[1]));
  const diff = endDate.getTime() - startDate.getTime();
  console.log(diff);
  return Math.abs(diff) / 1000 / 60 / 60;
}

export const TrainingDetails: React.FC = () => {
  const { formData, addTraining, removeTraining } = useFormStore();
  const [newTraining, setNewTraining] = useState<Training>({
    title: 'Training',
    date: '',
    start: '',
    end: '',
    distance: 0,
    price: 0,
  });

  const handleAdd = () => {
    if (newTraining.title && newTraining.date && newTraining.start && newTraining.end) {
      addTraining(newTraining);
      setNewTraining({
        ...newTraining, ...{
          date: ''
        }
      });
    }
  };

  const copyTraining = (training: Training, resetDate = false) => {
    if (training.title && training.date && training.start && training.end) {
      setNewTraining({
        ...training, ...{
          date: resetDate ? '' : training.date
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Kursbezeichnung oder Reiseziel</label>
          <input
            type="text"
            placeholder="Enter training title"
            value={newTraining.title}
            onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Datum</label>
          <input
            type="date"
            value={newTraining.date}
            onChange={(e) => setNewTraining({ ...newTraining, date: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start</label>
          <input
            type="time"
            value={newTraining.start}
            onChange={(e) => setNewTraining({ ...newTraining, start: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ende</label>
          <input
            type="time"
            value={newTraining.end}
            onChange={(e) => setNewTraining({ ...newTraining, end: e.target.value })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">[Euro] pro Stunde</label>
          <input
            type="number"
            min="0"
            value={newTraining.price}
            onChange={(e) => setNewTraining({ ...newTraining, price: parseFloat(e.target.value) })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Aufwand [km]</label>
          <input
            type="number"
            min="0"
            value={newTraining.distance}
            onChange={(e) => setNewTraining({ ...newTraining, distance: parseFloat(e.target.value) })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
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
          {formData.trainings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Keine Einträge</h3>
              <p className="mt-1 text-sm text-gray-500">
                Bitte erstelle einen Eintrag.
              </p>
            </div>
          ) : null}
          {formData.trainings.map((training, index) => (
            <>
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm transition-colors hover:bg-gray-100"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{training.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {timeDifferenceInHours(training.start, training.end)}h
                    </span>
                    <span className="flex items-center gap-1">
                      {training.title}
                    </span>
                    <span className="flex items-center gap-1">
                      {(timeDifferenceInHours(training.start, training.end) * training.price).toFixed(2)} Euro
                    </span>
                    <span className="flex items-center gap-1">
                      {(training.distance * 0.3).toFixed(2)} Euro
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => copyTraining(training)}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => copyTraining(training, true)}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600"
                >
                  <ClipboardPlus size={18} />
                </button>
                <button
                  onClick={() => removeTraining(index)}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div>
                Aufwandsentschädigung:{" "}
                {formData.trainings.reduce(
                  (sum, training) =>
                    sum + timeDifferenceInHours(training.start, training.end) * training.price,
                  0
                ).toFixed(2)}{" "}
                Euro
              </div>
              <div>
                abzüglich Aufwandsspende:{" "}
                {formData.trainings.reduce(
                  (sum, training) =>
                    sum + training.distance * 0.3,
                  0
                ).toFixed(2)}{" "}
                Euro
              </div>
              <div>
                Endbetrag:{" "}
                {formData.trainings.reduce(
                  (sum, training) =>
                    sum +
                    timeDifferenceInHours(training.start, training.end) * training.price -
                    training.distance * 0.3,
                  0
                ).toFixed(2)}{" "}
                Euro
              </div>
            </>
          ))}

        </div>
      </div>
    </div>
  );
};