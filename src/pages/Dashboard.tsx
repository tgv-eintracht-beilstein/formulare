import React from 'react';
import { Link } from '@tanstack/react-router';
import { FileText, Plus, MapPin, GraduationCap } from 'lucide-react';
import { useFormStore } from '../store';

export const Dashboard: React.FC = () => {
  const { submittedForms } = useFormStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Übersicht</h1>
        <div className="flex gap-4">
          <Link
            to="/form/$type"
            params={{ type: 'training' }}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={16} /> Neue Übungsleiterabrechnung
          </Link>
          <Link
            to="/form/$type"
            disabled={true}
            params={{ type: 'journey' }}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-300 px-4 py-2 text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Plus size={16} /> Neue Reisekostenabrechnung (coming soon)
          </Link>
        </div>
      </div>

      {submittedForms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Keine Formulare verfügbar</h3>
          <p className="mt-1 text-sm text-gray-500">
            Bitte erstelle dein erstes Formular.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {submittedForms.map((form) => (
            <div
              key={form.id}
              className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
            >
              <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  {form.type === 'training' ? (
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  ) : (
                    <MapPin className="h-5 w-5 text-green-600" />
                  )}
                  <h3 className="font-medium text-gray-900">{form.title}</h3>
                </div>
                <time className="mt-1 text-sm text-gray-500">
                  {new Date(form.date).toLocaleDateString()}
                </time>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Von:</span>{' '}
                    {form.data.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">E-Mail:</span> {form.data.email}
                  </p>
                  {form.type === 'training' && (
                    <p className="text-sm">
                      <span className="font-medium">Übungsleiterabrechnung:</span>{' '}
                      {form.data.trainings.length}
                    </p>
                  )}
                  {form.type === 'journey' && (
                    <p className="text-sm">
                      <span className="font-medium">Reisekostenabrechnungen:</span>{' '}
                      {form.data.journeys.length}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};