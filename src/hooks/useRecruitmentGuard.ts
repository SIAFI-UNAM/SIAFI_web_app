import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { type FormState } from '../types/FormData';

const pagePaths = [
    '/reclutamiento/informacion-personal',
    '/reclutamiento/preferencias-y-participacion',
    '/reclutamiento/habilidades-tecnicas',
    '/reclutamiento/experiencia-y-trayectoria',
    '/reclutamiento/motivacion-y-expectativas',
];

const isPersonalDataComplete = (data: FormState) => {
    return !!(data.name && data.lastname && data.phone_number && data.email && data.major && data.semester !== null);
};

const arePreferencesComplete = (data: FormState) => {
    return data.selected_nuclei.length > 0 && !!data.contribution_text;
};

const areTechnicalSkillsComplete = (data: FormState) => {
    const skillFields: (keyof FormState)[] = [
        'skill_python', 'skill_javascript', 'skill_c', 'skill_cpp', 'skill_csharp', 'skill_java',
        'skill_pytorch', 'skill_tensorflow_keras', 'skill_scikit_learn', 'skill_opencv',
        'skill_linux', 'skill_ros_docker', 'skill_raspberry', 'skill_esp32', 'skill_tiva', 'skill_arduino'
    ];
    return skillFields.every(skill => data[skill] !== null && data[skill] !== undefined);
};

const isExperienceComplete = (data: FormState) => {
    return !!(data.proud_moment_text && data.soft_skills_text && data.team_inspiration_text);
};

const checks = [
    isPersonalDataComplete,
    arePreferencesComplete,
    areTechnicalSkillsComplete,
    isExperienceComplete,
];

export const useRecruitmentGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { watch } = useFormContext<FormState>();

    const formData = watch();

    useEffect(() => {
        if (location.pathname === '/reclutamiento' || location.pathname === '/') {
            return;
        }

        let firstIncompletePath = pagePaths[0]; 

        for (let i = 0; i < checks.length; i++) {
            if (!checks[i](formData)) {
                firstIncompletePath = pagePaths[i];
                break;
            }
            if (i === checks.length - 1) { 
                firstIncompletePath = pagePaths[i + 1] || firstIncompletePath;
            }
        }
        
        const currentIndex = pagePaths.indexOf(location.pathname);
        const targetIndex = pagePaths.indexOf(firstIncompletePath);
        
        if (currentIndex > targetIndex && targetIndex > -1) {
            navigate(firstIncompletePath, { replace: true });
        }
    }, [location.pathname, navigate, formData]);
};
