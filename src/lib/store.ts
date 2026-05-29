import { create } from 'zustand';
import { ResumeSchema, defaultResumeState, ID, ExperienceItem, CertificateItem, ProjectItem, EducationItem, SkillGroup } from './types';

interface ResumeStore {
  data: ResumeSchema;
  
  // Base updates
  updateBasics: (field: keyof ResumeSchema['basics'], value: any) => void;
  updateMetadata: (field: keyof ResumeSchema['metadata'], value: any) => void;
  updateContact: (id: ID, value: string) => void;
  
  // Experience Array Updates
  addExperience: (item: ExperienceItem) => void;
  updateExperience: (id: ID, updates: Partial<ExperienceItem>) => void;
  removeExperience: (id: ID) => void;
  
  // Deep Nested Updates
  updateExperienceBullet: (expId: ID, bulletIndex: number, newText: string) => void;
  addExperienceBullet: (expId: ID) => void;
  removeExperienceBullet: (expId: ID, bulletIndex: number) => void;
  // Certificates Array Updates
  addCertificate: (item: CertificateItem) => void;
  updateCertificate: (id: ID, updates: Partial<CertificateItem>) => void;
  removeCertificate: (id: ID) => void;
  
  // Education Array Updates
  addEducation: (item: EducationItem) => void;
  updateEducation: (id: ID, updates: Partial<EducationItem>) => void;
  removeEducation: (id: ID) => void;
  updateEducationBullet: (edId: ID, bulletIndex: number, newText: string) => void;
  addEducationBullet: (edId: ID) => void;

  // Skills Array Updates
  addSkillGroup: (item: SkillGroup) => void;
  updateSkillGroup: (id: ID, updates: Partial<SkillGroup>) => void;
  removeSkillGroup: (id: ID) => void;
  updateSkill: (groupId: ID, skillIndex: number, newText: string) => void;
  addSkill: (groupId: ID) => void;

  // Projects Array Updates
  addProject: (item: ProjectItem) => void;
  updateProject: (id: ID, updates: Partial<ProjectItem>) => void;
  removeProject: (id: ID) => void;
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

  updateContact: (id, value) =>
    set((state) => ({
      data: {
        ...state.data,
        basics: {
          ...state.data.basics,
          contact: state.data.basics.contact.map((c) =>
            c.id === id ? { ...c, value } : c
          ),
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

  addCertificate: (item) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: [...state.data.certificates, item],
      },
    })),

  updateCertificate: (id, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: state.data.certificates.map((cert) =>
          cert.id === id ? { ...cert, ...updates } : cert
        ),
      },
    })),

  removeCertificate: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        certificates: state.data.certificates.filter((cert) => cert.id !== id),
      },
    })),

  addEducation: (item) =>
    set((state) => ({ data: { ...state.data, education: [...state.data.education, item] } })),

  updateEducation: (id, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((ed) => (ed.id === id ? { ...ed, ...updates } : ed)),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({ data: { ...state.data, education: state.data.education.filter((ed) => ed.id !== id) } })),

  updateEducationBullet: (edId, bulletIndex, newText) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((ed) => {
          if (ed.id === edId) {
            const newBullets = [...ed.bullets];
            newBullets[bulletIndex] = newText;
            return { ...ed, bullets: newBullets };
          }
          return ed;
        }),
      },
    })),

  addEducationBullet: (edId) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((ed) => (ed.id === edId ? { ...ed, bullets: [...ed.bullets, ''] } : ed)),
      },
    })),

  addSkillGroup: (item) =>
    set((state) => ({ data: { ...state.data, skills: [...state.data.skills, item] } })),

  updateSkillGroup: (id, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((sg) => (sg.id === id ? { ...sg, ...updates } : sg)),
      },
    })),

  removeSkillGroup: (id) =>
    set((state) => ({ data: { ...state.data, skills: state.data.skills.filter((sg) => sg.id !== id) } })),

  updateSkill: (groupId, skillIndex, newText) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((sg) => {
          if (sg.id === groupId) {
            const newSkills = [...sg.skills];
            newSkills[skillIndex] = newText;
            return { ...sg, skills: newSkills };
          }
          return sg;
        }),
      },
    })),

  addSkill: (groupId) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((sg) => (sg.id === groupId ? { ...sg, skills: [...sg.skills, ''] } : sg)),
      },
    })),

  addProject: (item) =>
    set((state) => ({ data: { ...state.data, projects: [...state.data.projects, item] } })),

  updateProject: (id, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        projects: state.data.projects.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj)),
      },
    })),

  removeProject: (id) =>
    set((state) => ({ data: { ...state.data, projects: state.data.projects.filter((proj) => proj.id !== id) } })),
}));
