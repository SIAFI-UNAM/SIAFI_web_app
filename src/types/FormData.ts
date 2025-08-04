export interface FormState {
  recruitment_event_id: number;
  name: string;
  lastname: string;
  phone_number: string;
  email: string;
  major: string;
  semester: number | null;
  contribution_text: string;
  soft_skills_text: string;
  proud_moment_text: string;
  team_inspiration_text: string;
  why_join_text: string;
  how_found_us_text: string;
  expectations_text: string;
  selected_nuclei: string[];
  additional_info_text?: string;
  other_skills_text?: string;
  previous_experience_text?: string;
  skill_csharp?: number | null;
  skill_c?: number | null;
  skill_cpp?: number | null;
  skill_java?: number | null;
  skill_javascript?: number | null;
  skill_python?: number | null;
  skill_tensorflow_keras?: number | null;
  skill_pytorch?: number | null;
  skill_scikit_learn?: number | null;
  skill_opencv?: number | null;
  skill_linux?: number | null;
  skill_ros_docker?: number | null;
  skill_raspberry?: number | null;
  skill_esp32?: number | null;
  skill_arduino?: number | null;
  skill_tiva?: number | null;
  development_areas?: string[];
  detailed_experience_text?: string;
  cv: File | null; // Mantener para el manejo del archivo en el frontend
}
