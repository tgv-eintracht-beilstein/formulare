import { create } from 'zustand';
import { FormData, Training, Journey, SubmittedForm } from './types';

interface FormStore {
  currentPage: number;
  formData: FormData;
  submittedForms: SubmittedForm[];
  setCurrentPage: (page: number) => void;
  updateFormData: (data: Partial<FormData>, persists?: boolean) => void;
  addTraining: (training: Training) => void;
  removeTraining: (index: number) => void;
  addJourney: (journey: Journey) => void;
  removeJourney: (index: number) => void;
  submitForm: (type: 'training' | 'journey', title: string) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  currentPage: 0,
  formData: {
    name: localStorage.getItem('formData.name') ? JSON.parse(localStorage.getItem('formData.name')!) : '',
    email: localStorage.getItem('formData.email') ? JSON.parse(localStorage.getItem('formData.email')!) : '',
    divison: localStorage.getItem('formData.divison') ? JSON.parse(localStorage.getItem('formData.divison')!) : '',
    zip: localStorage.getItem('formData.zip') ? JSON.parse(localStorage.getItem('formData.zip')!) : '71717',
    city: localStorage.getItem('formData.city') ? JSON.parse(localStorage.getItem('formData.city')!) : 'Beilstein',
    phone: localStorage.getItem('formData.phone') ? JSON.parse(localStorage.getItem('formData.phone')!) : '',
    birthday: localStorage.getItem('formData.birthday') ? JSON.parse(localStorage.getItem('formData.birthday')!) : '',
    trainings: [],
    journeys: [],
    acceptedTerms: false,
    acceptedPrivacy: false,
    signature: '',
  },
  submittedForms: [],
  setCurrentPage: (page) => set({ currentPage: page }),
  updateFormData: (data, persist = false) => {
    set((state) => ({ formData: { ...state.formData, ...data } }))

    if (persist) {
      Object.keys(data).forEach((key: string) => {
        const formDataKey = key as keyof FormData;
        if (data[formDataKey] !== undefined) {
          localStorage.setItem(`formData.${formDataKey}`, JSON.stringify(data[formDataKey]))
        }
      })
    }
  },
  addTraining: (training) =>
    set((state) => ({
      formData: {
        ...state.formData,
        trainings: [...state.formData.trainings, training].sort((a, b) => {
          // Compare by date first
          if (a.date !== b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
          // If dates are the same, compare by start time
          return new Date(`1970-01-01T${a.start}`).getTime() - new Date(`1970-01-01T${b.start}`).getTime();
        }),
      },
    })),
  
  removeTraining: (index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        trainings: state.formData.trainings.filter((_, i) => i !== index),
      },
    })),
  addJourney: (journey) =>
    set((state) => ({
      formData: {
        ...state.formData,
        journeys: [...state.formData.journeys, journey],
      },
    })),
  removeJourney: (index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        journeys: state.formData.journeys.filter((_, i) => i !== index),
      },
    })),
  submitForm: (type, title) =>
    set((state) => ({
      submittedForms: [
        ...state.submittedForms,
        {
          id: crypto.randomUUID(),
          type,
          title,
          date: new Date().toISOString(),
          data: { ...state.formData },
        },
      ],
      formData: {
        name: '',
        email: '',
        divison: '',
        zip: '',
        city: '',
        phone: '',
        birthday: '',
        trainings: [],
        journeys: [],
        acceptedTerms: false,
        acceptedPrivacy: false,
        signature: '',
      },
      currentPage: 0,
    })),
}));