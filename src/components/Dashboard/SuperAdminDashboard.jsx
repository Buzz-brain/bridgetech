import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  School,
  Users,
  TrendingUp,
  Activity,
  Plus,
  Eye,
  BarChart3,
  Bell,
  Sun,
  Moon,
  AlertCircle,
  UserPlus,
  Download,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const notifications = [
  { id: 1, type: 'success', message: 'Backup completed successfully.' },
  { id: 2, type: 'warning', message: 'New school registration pending approval.' },
  { id: 3, type: 'error', message: 'SMS provider authentication failed.' },
];

const recentActivities = [
  { id: 1, user: 'Jane Doe', action: 'Added new school', time: '2 min ago' },
  { id: 2, user: 'Admin', action: 'Changed backup policy', time: '10 min ago' },
  { id: 3, user: 'John Smith', action: 'Sent 500 SMS', time: '1 hour ago' },
];

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSchools: 12,
    totalUsers: 1247,
    activeStudents: 8934,
    systemHealth: 98.5,
    smsSent: 12800,
  });
  const [darkMode, setDarkMode] = useState(false);

  const [schoolsData] = useState([
    { name: 'Jan', schools: 8, sms: 1000 },
    { name: 'Feb', schools: 9, sms: 1200 },
    { name: 'Mar', schools: 10, sms: 1500 },
    { name: 'Apr', schools: 11, sms: 1800 },
    { name: 'May', schools: 12, sms: 2000 },
    { name: 'Jun', schools: 12, sms: 2300 },
  ]);

  const [userDistribution] = useState([
    { name: 'School Admins', value: 45, color: '#3B82F6' },
    { name: 'Teachers', value: 312, color: '#14B8A6' },
    { name: 'Students', value: 8934, color: '#F97316' },
    { name: 'Parents', value: 6890, color: '#EF4444' },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Animated counter
  const AnimatedNumber = ({ value }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = value;
      if (start === end) return;
      let increment = end / 30;
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setDisplay(Math.floor(current));
      }, 20);
      return () => clearInterval(timer);
    }, [value]);
    return <span>{display.toLocaleString()}</span>;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={darkMode ? 'space-y-6 bg-gray-900 min-h-screen text-white' : 'space-y-6'}
    >
      {/* Header & Quick Actions */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor and manage all schools in the system</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add School
          </button>
          <button className="btn btn-secondary flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Data
          </button>
          <button className="btn btn-secondary flex items-center gap-2">
            <FileText className="h-4 w-4" /> Audit Log
          </button>
          <button
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm border ${
              n.type === 'success'
                ? 'bg-success-50 text-success-700 border-success-200'
                : n.type === 'warning'
                ? 'bg-warning-50 text-warning-700 border-warning-200'
                : 'bg-error-50 text-error-700 border-error-200'
            }`}
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4" /> {n.message}
          </div>
        ))}
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Schools</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedNumber value={stats.totalSchools} />
              </p>
              <p className="text-sm text-success-600">+2 this month</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <School className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">System Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedNumber value={stats.totalUsers} />
              </p>
              <p className="text-sm text-success-600">+89 this week</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Active Students</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedNumber value={stats.activeStudents} />
              </p>
              <p className="text-sm text-success-600">+156 today</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">System Health</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedNumber value={stats.systemHealth} />%
              </p>
              <p className="text-sm text-success-600">All systems operational</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">SMS Sent</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedNumber value={stats.smsSent} />
              </p>
              <p className="text-sm text-success-600">+1,200 this month</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <Bell className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schools Growth & SMS Line Chart */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schools & SMS Growth</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={schoolsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="schools" stroke="#3B82F6" strokeWidth={2} name="Schools" />
              <Line type="monotone" dataKey="sms" stroke="#F59E0B" strokeWidth={2} name="SMS Sent" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Distribution Chart */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Distribution</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Schools Table & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Schools Table */}
        <motion.div variants={itemVariants} className="card col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Schools</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>View All</span>
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-200">School Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-200">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-200">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-200">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "St. Mary's College", location: 'Lagos', students: 1200, status: 'Active' },
                  { name: 'Federal College', location: 'Abuja', students: 800, status: 'Active' },
                  { name: 'Unity High School', location: 'Kano', students: 650, status: 'Active' },
                  { name: 'Victory Academy', location: 'Port Harcourt', students: 450, status: 'Pending' },
                ].map((school, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{school.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{school.location}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{school.students}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          school.status === 'Active'
                            ? 'bg-success-100 text-success-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}
                      >
                        {school.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <UserPlus className="h-5 w-5 text-gray-400" />
          </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-3 flex flex-col gap-1">
                <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm">{activity.action}</span>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuperAdminDashboard;