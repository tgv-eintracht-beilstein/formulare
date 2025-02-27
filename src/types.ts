export interface Training {
  title: string;
  date: string;
  start: string;
  end: string;
  price: number;
  distance: number;
}

export interface Journey {
  from: string;
  to: string;
  date: string;
}

export interface FormData {  
  name: string;
  email: string;
  divison: string;
  birthday: string;
  zip: string;
  city: string;
  phone: string;
  trainings: Training[];
  journeys: Journey[];
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  signature: string;
}

export interface FormTemplate {
  title: string;
  pages: {
    title: string;
    description?: string;
    type: string;
    fields?: Record<string, {
      label: string;
      type: string;
      required?: boolean;
    }>;
  }[];
}

export interface SubmittedForm {
  id: string;
  type: 'training' | 'journey';
  title: string;
  date: string;
  data: FormData;
}