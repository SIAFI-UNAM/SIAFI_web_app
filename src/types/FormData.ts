export interface Skill {
  [key: string]: string;
}

export interface FormData {
  personalData: {
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    studentId: string;
    semester: number | null;
    career: string;
    cv: File | null;
  };
  preferences: {
    interestedAreas: string[];
    participationReason: string;
  };
  technicalSkills: {
    programmingLanguages: Skill;
    devTechnologies: Skill;
    microcontrollers: Skill;
    developmentAreas: string[];
    otherSkillsDetails: string;
    otherTools: string;
  };
  experience: {
    previousExperience: string;
    projects: string;
  };
  motivation: {
    learningExpectations: string;
    commitment: string;
    recruitmentSource: string;
    additionalComments: string;
  };
}

export type FormState = FormData;
