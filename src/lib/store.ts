import { create } from 'zustand';
import { ResumeSchema, defaultResumeState, ID, ExperienceItem } from './types';

interface ResumeStore {
  data: ResumeSchema;
  
  // Base updates
  updateBasics: (field: keyof ResumeSchema['basics'], value: any) => void;
  updateMetadata: (field: keyof ResumeSchema['metadata'], value: any) => void;
  
  // Experience Array Updates
  addExperience: (item: ExperienceItem) => void;
  updateExperience: (id: ID, updates: Partial<ExperienceItem>) => void;
  removeExperience: (id: ID) => void;
  
  // Deep Nested Updates
  updateExperienceBullet: (expId: ID, bulletIndex: number, newText: string) => void;
  addExperienceBullet: (expId: ID) => void;
  removeExperienceBullet: (expId: ID, bulletIndex: number) => void;
  
  // We can add similar CRUD operations for Education and Skills as needed.
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: defaultResumeState,

  updateBasics: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        basics: {
          ...state.data.basics,
          [field]: value,
        },
      },
    })),

  updateMetadata: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        metadata: {
          ...state.data.metadata,
          [field]: value,
        },
      },
    })),

  addExperience: (item) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: [...state.data.experience, item],
      },
    })),

  updateExperience: (id, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) =>
          exp.id === id ? { ...exp, ...updates } : exp
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter((exp) => exp.id !== id),
      },
    })),

  updateExperienceBullet: (expId, bulletIndex, newText) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) => {
          if (exp.id === expId) {
            const newBullets = [...exp.bullets];
            newBullets[bulletIndex] = newText;
            return { ...exp, bullets: newBullets };
          }
          return exp;
        }),
      },
    })),

  addExperienceBullet: (expId) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) => {
          if (exp.id === expId) {
            return { ...exp, bullets: [...exp.bullets, ''] };
          }
          return exp;
        }),
      },
    })),

  removeExperienceBullet: (expId, bulletIndex) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) => {
          if (exp.id === expId) {
            const newBullets = exp.bullets.filter((_, i) => i !== bulletIndex);
            return { ...exp, bullets: newBullets };
          }
          return exp;
        }),
      },
    })),
}));
