import { type FormState } from '../types/FormData';

export const getInitialState = (): FormState => {
    return {
        personalData: {
          name: '',
          email: '',
          studentId: '',
          semester: null,
          career: '',
        },
        preferences: {
          interestedAreas: [],
          participationReason: '',
        },
        technicalSkills: {
          programmingLanguages: {},
          devTechnologies: {},
          microcontrollers: {},
          developmentAreas: [],
          otherSkillsDetails: '',
          otherTools: '',
        },
        experience: {
          previousExperience: '',
          projects: '',
        },
        motivation: {
          learningExpectations: '',
          commitment: '',
          recruitmentSource: '',
        },
      };
}
