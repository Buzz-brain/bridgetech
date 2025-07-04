import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  Bell,
  User,
  LogOut,
  School,
  Calendar,
  CreditCard,
  BarChart3,
  UserCheck,
  GraduationCap,
  Heart
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const DashboardLayout = ({ children, title, subtitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, school } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'super_admin':
        return [
          { name: 'Dashboard', href: '/super-admin/dashboard', icon: Home },
          { name: 'Schools', href: '/super-admin/schools', icon: School },
          { name: 'Users', href: '/super-admin/users', icon: Users },
          { name: 'Analytics', href: '/super-admin/analytics', icon: BarChart3 },
          { name: 'Audit Log', href: '/super-admin/audit', icon: FileText },
          { name: 'Settings', href: '/super-admin/settings', icon: Settings },
        ];
      case 'school_admin':
        return [
          { name: 'Dashboard', href: '/school-admin/dashboard', icon: Home },
          { name: 'School Profile', href: '/school-admin/profile', icon: School },
          { name: 'Academic Calendar', href: '/school-admin/calendar', icon: Calendar },
          { name: 'Teachers', href: '/school-admin/teachers', icon: UserCheck },
          { name: 'Students', href: '/school-admin/students', icon: Users },
          { name: 'Classes & Subjects', href: '/school-admin/classes', icon: BookOpen },
          { name: 'Results', href: '/school-admin/results', icon: FileText },
          { name: 'Scratch Cards', href: '/school-admin/scratch-cards', icon: CreditCard },
        ];
      case 'teacher':
        return [
          { name: 'Dashboard', href: '/teacher/dashboard', icon: Home },
          { name: 'My Subjects', href: '/teacher/subjects', icon: BookOpen },
          { name: 'Enter Results', href: '/teacher/results/entry', icon: FileText },
          { name: 'View Results', href: '/teacher/results/view', icon: BarChart3 },
        ];
      case 'student':
        return [
          { name: 'Dashboard', href: '/student/dashboard', icon: Home },
          { name: 'My Profile', href: '/student/profile', icon: User },
          { name: 'Results', href: '/student/results', icon: FileText },
          { name: 'Transcripts', href: '/student/transcripts', icon: GraduationCap },
        ];
      case 'parent':
        return [
          { name: 'Dashboard', href: '/parent/dashboard', icon: Home },
          { name: 'My Children', href: '/parent/children', icon: Heart },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
            >
              <SidebarContent 
                navigationItems={navigationItems}
                isActiveRoute={isActiveRoute}
                user={user}
                school={school}
                onClose={() => setSidebarOpen(false)}
                logout={logout}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent 
          navigationItems={navigationItems}
          isActiveRoute={isActiveRoute}
          user={user}
          school={school}
          logout={logout}
        />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="ml-4 lg:ml-0">
                  <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                  {subtitle && (
                    <p className="text-sm text-gray-500">{subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-5 w-5" />
                </button>

                {/* User info */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role?.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({ navigationItems, isActiveRoute, user, school, onClose, logout }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="flex items-center px-6 py-4 border-b border-gray-200">
      <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <div>
          <span className="text-lg font-bold text-gray-900">Bridgetech</span>
          {school && (
            <p className="text-xs text-gray-500">{school.name}</p>
          )}
        </div>
      </Link>
      {onClose && (
        <button onClick={onClose} className="ml-auto p-2 lg:hidden">
          <X className="h-5 w-5 text-gray-400" />
        </button>
      )}
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-6 space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const active = isActiveRoute(item.href);
        
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              active
                ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>

    {/* User section */}
    <div className="border-t border-gray-200 p-4">
      <button
        onClick={() => {
          logout();
          if (onClose) onClose();
        }}
        className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
      >
        <LogOut className="mr-3 h-5 w-5" />
        Logout
      </button>
    </div>
  </div>
);

export default DashboardLayout;