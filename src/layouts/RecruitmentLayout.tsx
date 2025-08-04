import { Outlet } from 'react-router-dom';
import { useRecruitmentGuard } from '../hooks/useRecruitmentGuard';

export function RecruitmentLayout() {
  useRecruitmentGuard();

  return <Outlet />;
}
