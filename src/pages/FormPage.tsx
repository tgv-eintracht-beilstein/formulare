import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { parse } from 'yaml';
import { useFormStore } from '../store';
import { PersonalInfo } from '../components/PersonalInfo';
import { TrainingDetails } from '../components/TrainingDetails';
import { JourneyDetails } from '../components/JourneyDetails';
import { LegalNotices } from '../components/LegalNotices';
import { Signature } from '../components/Signature';
import { Summary } from '../components/Summary';
import type { FormTemplate } from '../types';

export const FormPage: React.FC = () => {
  const { type } = useParams({ from: '/form/$type' });
  const navigate = useNavigate();
  const { currentPage, setCurrentPage, formData, submitForm } = useFormStore();
  const [template, setTemplate] = useState<FormTemplate | null>(null);

  useEffect(() => {
    fetch(`/${type}Template.yaml`)
      .then((res) => res.text())
      .then((text) => {
        const parsed = parse(text) as FormTemplate;
        setTemplate(parsed);
      });
  }, [type]);

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Vorlage laden...</div>
      </div>
    );
  }

  const currentPageData = template.pages[currentPage];

  const renderPageContent = () => {
    switch (currentPageData.type) {
      case 'personal':
        return <PersonalInfo />;
      case 'trainings':
        return <TrainingDetails />;
      case 'journeys':
        return <JourneyDetails />;
      case 'legal':
        return <LegalNotices />;
      case 'signature':
        return <Signature />;
      case 'summary':
        return <Summary />;
      default:
        return null;
    }
  };

  const canGoNext = () => {
    switch (currentPageData.type) {
      case 'personal':
        return formData.name && formData.email;
      case 'trainings':
        return formData.trainings.length > 0;
      case 'journeys':
        return formData.journeys.length > 0;
      case 'legal':
        return formData.acceptedTerms && formData.acceptedPrivacy;
      case 'signature':
        return !!formData.signature;
      case 'summary':
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    submitForm(type as 'training' | 'journey', template.title);
    navigate({ to: '/' });
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {template.title}
        </h1>
        <div className="mt-4 flex items-center space-x-4">
          {template.pages.map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`h-2 w-16 rounded-full transition-colors ${
                  index <= currentPage
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="px-8 py-6">
        <h2 className="text-xl font-medium text-gray-900">
          {currentPageData.title}
        </h2>
        {currentPageData.description && (
          <p className="mt-2 text-sm text-gray-500">
            {currentPageData.description}
          </p>
        )}
        <div className="mt-6">{renderPageContent()}</div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-8 py-4">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              currentPage === 0
                ? 'cursor-not-allowed text-gray-400'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={16} /> Zurück
          </button>
          {currentPage === template.pages.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Speichern
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!canGoNext()}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                !canGoNext()
                  ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                  : 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
            >
              Weiter <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};