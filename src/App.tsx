import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, Settings, User, HelpCircle } from 'lucide-react';
import { parse } from 'yaml';
import { useFormStore } from './store';
import { PersonalInfo } from './components/PersonalInfo';
import { TrainingDetails } from './components/TrainingDetails';
import { LegalNotices } from './components/LegalNotices';
import { Signature } from './components/Signature';
import { Summary } from './components/Summary';
import type { FormTemplate } from './types';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { currentPage, setCurrentPage, formData } = useFormStore();
  const [template, setTemplate] = useState<FormTemplate | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/formTemplate.yaml')
      .then((res) => res.text())
      .then((text) => {
        const parsed = parse(text) as FormTemplate;
        setTemplate(parsed);
      });
  }, []);

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Lade Vorlage...</div>
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
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <ClipboardList className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">TGV | Formulare</span>
              </div>
            </div>
            a
            <div className="sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <button className="text-gray-500 hover:text-gray-700">
                <User className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              <button className="flex w-full items-center px-3 py-2 text-gray-600 hover:bg-gray-100">
                <User className="h-5 w-5" />
                <span className="ml-2">Profile</span>
              </button>
              <button className="flex w-full items-center px-3 py-2 text-gray-600 hover:bg-gray-100">
                <Settings className="h-5 w-5" />
                <span className="ml-2">Settings</span>
              </button>
              <button className="flex w-full items-center px-3 py-2 text-gray-600 hover:bg-gray-100">
                <HelpCircle className="h-5 w-5" />
                <span className="ml-2">Help</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-12">
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
                <ChevronLeft size={16} /> Previous
              </button>
              {currentPage === template.pages.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Form
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
                  Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;