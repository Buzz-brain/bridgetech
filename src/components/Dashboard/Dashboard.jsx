import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../utils/constants';
import SuperAdminDashboard from './SuperAdminDashboard';
import SchoolAdminDashboard from './SchoolAdminDashboard';
import StudentDashboard from './StudentDashboard';
import ParentDashboard from './ParentDashboard';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);

  const renderDashboard = () => {
    switch (user?.role) {
      case USER_ROLES.SUPER_ADMIN:
        return <SuperAdminDashboard />;
      case USER_ROLES.SCHOOL_ADMIN:
        return <SchoolAdminDashboard />;
      case USER_ROLES.STUDENT:
        return <StudentDashboard />;
      case USER_ROLES.PARENT:
        return <ParentDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SRaAMS</h2>
            <p className="text-gray-600">Your dashboard will appear here based on your role.</p>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;