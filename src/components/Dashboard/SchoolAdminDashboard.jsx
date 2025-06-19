import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  FileText, 
  TrendingUp,
  Plus,
  Eye,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SchoolAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 1247,
    totalTeachers: 45,
    resultsUploaded: 834,
    pendingAdmissions: 23,
  });

  const [performanceData] = useState([
    { name: 'Jan', average: 72 },
    { name: 'Feb', average: 75 },
    { name: 'Mar', average: 78 },
    { name: 'Apr', average: 73 },
    { name: 'May', average: 81 },
    { name: 'Jun', average: 79 },
  ]);

  const [classDistribution] = useState([
    { name: 'JSS 1', value: 180, color: '#3B82F6' },
    { name: 'JSS 2', value: 165, color: '#14B8A6' },
    { name: 'JSS 3', value: 170, color: '#F97316' },
    { name: 'SS 1', value: 220, color: '#EF4444' },
    { name: 'SS 2', value: 195, color: '#8B5CF6' },
    { name: 'SS 3', value: 200, color: '#10B981' },
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Dashboard</h1>
          <p className="text-gray-600">Manage your school's students, teachers, and results</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Send SMS</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
              <p className="text-sm text-success-600">+15 this month</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Teachers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTeachers}</p>
              <p className="text-sm text-success-600">+3 this month</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Results Uploaded</p>
              <p className="text-3xl font-bold text-gray-900">{stats.resultsUploaded}</p>
              <p className="text-sm text-success-600">67% completion</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Admissions</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingAdmissions}</p>
              <p className="text-sm text-warning-600">Requires attention</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Average Performance Trend</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Class Distribution Chart */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Students by Class</h3>
            <GraduationCap className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {classDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Plus className="h-6 w-6 text-primary-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Add Student</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Users className="h-6 w-6 text-secondary-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Add Teacher</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FileText className="h-6 w-6 text-accent-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Upload Results</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <MessageSquare className="h-6 w-6 text-warning-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Send SMS</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { action: 'Results uploaded for JSS 3A Mathematics', time: '2 hours ago', type: 'success' },
              { action: 'New student admission request', time: '4 hours ago', type: 'info' },
              { action: 'SMS sent to SS 2 parents', time: '6 hours ago', type: 'info' },
              { action: 'Teacher John Doe added to system', time: '1 day ago', type: 'success' },
              { action: 'System backup completed', time: '2 days ago', type: 'success' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-success-500' : 'bg-primary-500'
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SchoolAdminDashboard;