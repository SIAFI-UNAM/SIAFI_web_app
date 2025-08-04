import { type FormState } from '../types/FormData';

export const getInitialState = (): FormState => {
    return {
        personalData: {
          name: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          studentId: '',
          semester: null,
          career: '',
          cv: null,
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
          additionalComments: '',
        },
      };
}
