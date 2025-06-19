import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  School,
  Users,
  GraduationCap,
  FileText,
  UserCheck,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logoutUser } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { sidebarOpen } = useSelector(state => state.ui);
  const { user } = useSelector(state => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const getMenuItems = (role) => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
    ];

    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return [
          ...commonItems,
          { icon: School, label: 'Schools', path: '/schools' },
          { icon: Users, label: 'System Users', path: '/system-users' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' },
          { icon: Settings, label: 'System Settings', path: '/settings' },
        ];
      
      case USER_ROLES.SCHOOL_ADMIN:
        return [
          ...commonItems,
          { icon: Users, label: 'Users', path: '/users' },
          { icon: GraduationCap, label: 'Students', path: '/students' },
          { icon: FileText, label: 'Results', path: '/results' },
          // { icon: UserCheck, label: 'Admissions', path: '/admissions' },
          { icon: MessageSquare, label: 'SMS', path: '/sms' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' },
          { icon: Settings, label: 'School Settings', path: '/settings' },
          // Enhanced School Admin Sections
          { icon: FileText, label: 'School Profile', path: '/school-profile' },
          { icon: FileText, label: 'Academic Calendar', path: '/academic-calendar' },
          { icon: FileText, label: 'Scratch Card', path: '/scratch-card' },
          { icon: Users, label: 'Teacher Management', path: '/teacher-management' },
          { icon: FileText, label: 'Result Management', path: '/result-management' },
          { icon: FileText, label: 'Class & Subject Setup', path: '/class-subject-setup' },
          { icon: MessageSquare, label: 'Notifications', path: '/school-notifications' },
          { icon: FileText, label: 'Transcripts & Reports', path: '/transcripts-reports' },
          { icon: BarChart3, label: 'Audit Log', path: '/school-audit-log' },
          { icon: Settings, label: 'School Config', path: '/school-config' },
        ];
      
      case USER_ROLES.TEACHER:
        return [
          ...commonItems,
          { icon: GraduationCap, label: 'My Students', path: '/students' },
          { icon: FileText, label: 'Upload Results', path: '/results/upload' },
          { icon: FileText, label: 'Result History', path: '/results' },
          { icon: BarChart3, label: 'Performance', path: '/performance' },
        ];
      
      case USER_ROLES.STUDENT:
        return [
          ...commonItems,
          { icon: FileText, label: 'My Results', path: '/my-results' },
          { icon: UserCheck, label: 'Profile', path: '/profile' },
          { icon: FileText, label: 'Transcripts', path: '/transcripts' },
        ];
      
      case USER_ROLES.PARENT:
        return [
          ...commonItems,
          { icon: GraduationCap, label: 'My Children', path: '/children' },
          { icon: FileText, label: 'Results', path: '/children/results' },
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
        ];
      
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems(user?.role);

  const sidebarVariants = {
    open: {
      width: 280,
      transition: {
        damping: 40,
        stiffness: 400,
      },
    },
    closed: {
      width: 80,
      transition: {
        damping: 40,
        stiffness: 400,
      },
    },
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const getUserInitials = () => {
    if (!user?.firstName || !user?.lastName) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  const getUserDisplayName = () => {
    if (!user?.firstName || !user?.lastName) return 'User';
    return `${user.firstName} ${user.lastName}`;
  };

  const getRoleDisplayName = () => {
    if (!user?.role) return '';
    return user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <motion.div
      className="bg-white shadow-lg border-r border-gray-200 flex flex-col"
      variants={sidebarVariants}
      animate={sidebarOpen ? 'open' : 'closed'}
      initial="open"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="bg-primary-600 text-white p-2 rounded-lg">
                  <School className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">SRaAMS</h1>
                  <p className="text-xs text-gray-500">Student Results System</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-medium text-sm">
              {getUserInitials()}
            </span>
          </div>
          
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 flex-1"
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-gray-500 truncate">{getRoleDisplayName()}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="font-medium text-sm truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="font-medium text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;