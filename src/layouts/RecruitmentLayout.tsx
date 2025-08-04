import { Outlet } from 'react-router-dom';
import { useRecruitmentGuard } from '../hooks/useRecruitmentGuard';

export function RecruitmentLayout() {
  useRecruitmentGuard();

  return (
    <div style={{ position: 'relative' }}>
      <Outlet />
    </div>
  );
}
