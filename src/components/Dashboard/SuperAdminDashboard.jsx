import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  School, 
  Users, 
  TrendingUp, 
  Activity,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSchools: 12,
    totalUsers: 1247,
    activeStudents: 8934,
    systemHealth: 98.5,
  });

  const [schoolsData] = useState([
    { name: 'Jan', schools: 8 },
    { name: 'Feb', schools: 9 },
    { name: 'Mar', schools: 10 },
    { name: 'Apr', schools: 11 },
    { name: 'May', schools: 12 },
    { name: 'Jun', schools: 12 },
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
          <h1 className="text-3xl font-bold text-gray-900">System Overview</h1>
          <p className="text-gray-600">Monitor and manage all schools in the system</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add School</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Schools</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSchools}</p>
              <p className="text-sm text-success-600">+2 this month</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <School className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">System Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-success-600">+89 this week</p>
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
              <p className="text-sm text-gray-600">Active Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeStudents.toLocaleString()}</p>
              <p className="text-sm text-success-600">+156 today</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">System Health</p>
              <p className="text-3xl font-bold text-gray-900">{stats.systemHealth}%</p>
              <p className="text-sm text-success-600">All systems operational</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schools Growth Chart */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Schools Growth</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={schoolsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="schools" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Distribution Chart */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Distribution</h3>
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

      {/* Recent Schools Table */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Schools</h3>
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
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">School Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'St. Mary\'s College', location: 'Lagos', students: 1200, status: 'Active' },
                { name: 'Federal College', location: 'Abuja', students: 800, status: 'Active' },
                { name: 'Unity High School', location: 'Kano', students: 650, status: 'Active' },
                { name: 'Victory Academy', location: 'Port Harcourt', students: 450, status: 'Pending' },
              ].map((school, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{school.name}</td>
                  <td className="py-3 px-4 text-gray-600">{school.location}</td>
                  <td className="py-3 px-4 text-gray-600">{school.students}</td>
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
    </motion.div>
  );
};

export default SuperAdminDashboard;