import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  MessageSquare,
  Eye,
  Download,
  BarChart3,
  User,
  Bell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  
  const [children] = useState([
    {
      id: 1,
      name: 'John Doe',
      class: 'SS 2A',
      admissionNo: 'SCH/22/0156',
      currentAverage: 82.5,
      position: '3rd',
      photo: null,
    },
    {
      id: 2,
      name: 'Jane Doe',
      class: 'JSS 3B',
      admissionNo: 'SCH/23/0089',
      currentAverage: 78.2,
      position: '8th',
      photo: null,
    },
  ]);

  const [performanceData] = useState([
    { term: 'First Term', john: 78, jane: 75 },
    { term: 'Second Term', john: 82.5, jane: 78.2 },
  ]);

  const [subjectComparison] = useState([
    { subject: 'Math', john: 85, jane: 72 },
    { subject: 'English', john: 78, jane: 82 },
    { subject: 'Physics', john: 82, jane: 0 }, // Jane doesn't take Physics
    { subject: 'Chemistry', john: 79, jane: 0 },
    { subject: 'Biology', john: 88, jane: 85 },
    { subject: 'Geography', john: 75, jane: 78 },
  ]);

  const [recentMessages] = useState([
    { 
      title: 'Parent-Teacher Meeting Reminder',
      message: 'Reminder: Parent-teacher meeting scheduled for January 20th, 2024.',
      date: '2024-01-15',
      type: 'info'
    },
    {
      title: 'John\'s Excellent Performance',
      message: 'John has shown remarkable improvement in Mathematics this term.',
      date: '2024-01-12',
      type: 'success'
    },
    {
      title: 'School Fee Payment Due',
      message: 'School fee payment for next term is due by January 30th, 2024.',
      date: '2024-01-10',
      type: 'warning'
    },
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

  const currentChild = children[selectedChild];

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
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600">Monitor your children's academic progress</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Reports</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Children Selector */}
      <motion.div variants={itemVariants} className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Children</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child, index) => (
            <motion.button
              key={child.id}
              onClick={() => setSelectedChild(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                selectedChild === index
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{child.name}</h4>
                  <p className="text-sm text-gray-600">{child.class} • {child.admissionNo}</p>
                  <p className="text-sm text-primary-600">Average: {child.currentAverage}% • Position: {child.position}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Selected Child Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Average</p>
              <p className="text-3xl font-bold text-gray-900">{currentChild.currentAverage}%</p>
              <p className="text-sm text-success-600">Above class average</p>
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
              <p className="text-3xl font-bold text-gray-900">{currentChild.position}</p>
              <p className="text-sm text-success-600">Out of 42 students</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <p className="text-3xl font-bold text-gray-900">{currentChild.class}</p>
              <p className="text-sm text-primary-600">2023/2024 Session</p>
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
              <p className="text-sm text-gray-600">Unread Messages</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-warning-600">Requires attention</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Comparison */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Children Performance Comparison</h3>
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
                dataKey="john" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="John"
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="jane" 
                stroke="#14B8A6" 
                strokeWidth={3}
                name="Jane"
                dot={{ fill: '#14B8A6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Comparison */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectComparison.filter(item => item.john > 0 || item.jane > 0)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="john" fill="#3B82F6" name="John" />
              <Bar dataKey="jane" fill="#14B8A6" name="Jane" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Messages & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <motion.div variants={itemVariants} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      message.type === 'success'
                        ? 'bg-success-500'
                        : message.type === 'warning'
                        ? 'bg-warning-500'
                        : 'bg-primary-500'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{message.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{message.message}</p>
                    <p className="text-xs text-gray-500">{message.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Eye className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">View All Results</h4>
                  <p className="text-sm text-gray-600">Check detailed academic performance</p>
                </div>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-secondary-100 p-2 rounded-lg">
                  <Download className="h-5 w-5 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Download Report Cards</h4>
                  <p className="text-sm text-gray-600">Get official report cards</p>
                </div>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-accent-100 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Contact Teachers</h4>
                  <p className="text-sm text-gray-600">Send messages to teachers</p>
                </div>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-warning-100 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-warning-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Performance Analytics</h4>
                  <p className="text-sm text-gray-600">Detailed performance insights</p>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParentDashboard;