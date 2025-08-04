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

    // Observamos todos los campos para re-evaluar con datos frescos.
    const formData = watch();

    useEffect(() => {
        // No ejecutar el guardián en la página de bienvenida.
        if (location.pathname === '/reclutamiento' || location.pathname === '/') {
            return;
        }

        let firstIncompletePath = pagePaths[0]; // Por defecto, la primera página.

        for (let i = 0; i < checks.length; i++) {
            if (!checks[i](formData)) {
                firstIncompletePath = pagePaths[i];
                break;
            }
            // Si la sección actual está completa, el usuario puede acceder a la siguiente.
            if (i === checks.length - 1) { // Todas las comprobaciones pasaron
                firstIncompletePath = pagePaths[i + 1];
            }
        }
        
        const currentIndex = pagePaths.indexOf(location.pathname);
        const targetIndex = pagePaths.indexOf(firstIncompletePath);

        // Si el usuario está más adelante de lo que debería, lo redirigimos.
        if (currentIndex > targetIndex) {
            navigate(firstIncompletePath, { replace: true });
        }
    }, [location.pathname, navigate, formData]);
};
