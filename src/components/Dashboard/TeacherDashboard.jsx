import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  Clock, 
  CheckCircle,
  Plus,
  Upload,
  BarChart3,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    myStudents: 156,
    resultsUploaded: 23,
    pendingResults: 8,
    classAverage: 78.5,
  });

  const [subjectPerformance] = useState([
    { subject: 'Mathematics', average: 82 },
    { subject: 'Physics', average: 75 },
    { subject: 'Chemistry', average: 78 },
    { subject: 'Biology', average: 85 },
  ]);

  const [recentUploads] = useState([
    { class: 'SS 2A', subject: 'Mathematics', term: 'Second Term', date: '2024-01-15', status: 'Completed' },
    { class: 'SS 2B', subject: 'Mathematics', term: 'Second Term', date: '2024-01-14', status: 'Completed' },
    { class: 'SS 1A', subject: 'Mathematics', term: 'Second Term', date: '2024-01-12', status: 'Pending Review' },
    { class: 'JSS 3A', subject: 'Mathematics', term: 'Second Term', date: '2024-01-10', status: 'Completed' },
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
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage your classes and upload student results</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Results</span>
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
              <p className="text-sm text-gray-600">My Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.myStudents}</p>
              <p className="text-sm text-success-600">Across 4 classes</p>
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
              <p className="text-sm text-gray-600">Results Uploaded</p>
              <p className="text-3xl font-bold text-gray-900">{stats.resultsUploaded}</p>
              <p className="text-sm text-success-600">This term</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Results</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingResults}</p>
              <p className="text-sm text-warning-600">Need attention</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Class Average</p>
              <p className="text-3xl font-bold text-gray-900">{stats.classAverage}%</p>
              <p className="text-sm text-success-600">+2.3% this term</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Subject Performance Chart */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="average" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* My Classes & Recent Uploads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">My Classes</h3>
            <Plus className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { class: 'SS 2A', subject: 'Mathematics', students: 42, status: 'Active' },
              { class: 'SS 2B', subject: 'Mathematics', students: 38, status: 'Active' },
              { class: 'SS 1A', subject: 'Mathematics', students: 45, status: 'Active' },
              { class: 'JSS 3A', subject: 'Mathematics', students: 31, status: 'Active' },
            ].map((classInfo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{classInfo.class}</h4>
                    <p className="text-sm text-gray-600">{classInfo.subject} • {classInfo.students} students</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-success-100 text-success-800 text-xs font-medium rounded-full">
                  {classInfo.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Uploads */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentUploads.map((upload, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{upload.class} - {upload.subject}</h4>
                    <p className="text-sm text-gray-600">{upload.term} • {upload.date}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    upload.status === 'Completed'
                      ? 'bg-success-100 text-success-800'
                      : 'bg-warning-100 text-warning-800'
                  }`}
                >
                  {upload.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <Upload className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-1">Upload Results</h4>
            <p className="text-sm text-gray-600">Upload exam and CA scores</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <Eye className="h-8 w-8 text-secondary-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-1">View Results</h4>
            <p className="text-sm text-gray-600">Check uploaded results</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <BarChart3 className="h-8 w-8 text-accent-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-1">Performance</h4>
            <p className="text-sm text-gray-600">View class analytics</p>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherDashboard;