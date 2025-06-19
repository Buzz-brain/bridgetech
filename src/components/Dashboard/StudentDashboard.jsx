import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FileText, 
  Award, 
  TrendingUp, 
  Calendar,
  Eye,
  Download,
  BarChart3,
  User
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    currentAverage: 82.5,
    classPosition: '3rd',
    totalSubjects: 9,
    completedTerms: 2,
  });

  const [performanceData] = useState([
    { term: 'First Term', average: 78 },
    { term: 'Second Term', average: 82.5 },
    { term: 'Third Term', average: 0 }, // Pending
  ]);

  const [subjectPerformance] = useState([
    { subject: 'Mathematics', score: 85, fullMark: 100 },
    { subject: 'English', score: 78, fullMark: 100 },
    { subject: 'Physics', score: 82, fullMark: 100 },
    { subject: 'Chemistry', score: 79, fullMark: 100 },
    { subject: 'Biology', score: 88, fullMark: 100 },
    { subject: 'Geography', score: 75, fullMark: 100 },
  ]);

  const [recentResults] = useState([
    { subject: 'Mathematics', term: 'Second Term', score: 85, grade: 'A1', date: '2024-01-15' },
    { subject: 'Physics', term: 'Second Term', score: 82, grade: 'B2', date: '2024-01-14' },
    { subject: 'Chemistry', term: 'Second Term', score: 79, grade: 'B2', date: '2024-01-12' },
    { subject: 'Biology', term: 'Second Term', score: 88, grade: 'A1', date: '2024-01-10' },
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
          <h1 className="text-3xl font-bold text-gray-900">My Academic Dashboard</h1>
          <p className="text-gray-600">Track your academic progress and results</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Results</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
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
              <p className="text-sm text-gray-600">Current Average</p>
              <p className="text-3xl font-bold text-gray-900">{stats.currentAverage}%</p>
              <p className="text-sm text-success-600">+4.5% from last term</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Class Position</p>
              <p className="text-3xl font-bold text-gray-900">{stats.classPosition}</p>
              <p className="text-sm text-success-600">Out of 42 students</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Subjects</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSubjects}</p>
              <p className="text-sm text-primary-600">All subjects active</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Terms</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completedTerms}/3</p>
              <p className="text-sm text-warning-600">1 term remaining</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
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

        {/* Subject Performance Radar */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
            <Award className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={subjectPerformance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Results & Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Results</h3>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{result.subject}</h4>
                    <p className="text-sm text-gray-600">{result.term} • {result.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{result.score}%</p>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      result.grade.startsWith('A')
                        ? 'bg-success-100 text-success-800'
                        : result.grade.startsWith('B')
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}
                  >
                    {result.grade}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Profile */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">My Profile</h3>
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">John Doe</h4>
                <p className="text-gray-600">SS 2A • Admission No: SCH/22/0156</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-medium text-gray-900">SS 2A</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Session</p>
                <p className="font-medium text-gray-900">2023/2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Term</p>
                <p className="font-medium text-gray-900">Second Term</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium text-gray-900">16 years</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn btn-secondary"
              >
                Update Profile
              </motion.button>
            </div>
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
            <Eye className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-1">View All Results</h4>
            <p className="text-sm text-gray-600">Check all your academic results</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <Download className="h-8 w-8 text-secondary-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-1">Download Report</h4>
            <p className="text-sm text-gray-600">Get your report card</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            <FileText className="h-8 w-8 text-accent-600 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-1">Request Transcript</h4>
            <p className="text-sm text-gray-600">Apply for official transcript</p>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentDashboard;