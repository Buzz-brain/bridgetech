import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  BarChart3, 
  Search, 
  ArrowRight,
  School,
  MessageSquare,
  FileText,
  Shield,
  Smartphone,
  TrendingUp
} from 'lucide-react';
import Layout from '../../components/common/Layout';

const HomePage = () => {
  const [stats, setStats] = useState({
    schools: 0,
    students: 0,
    results: 0,
    smsDelivered: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Animate stats counter
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        schools: 150,
        students: 25000,
        results: 180000,
        smsDelivered: 500000
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/${searchQuery.toLowerCase().replace(/\s+/g, '')}`);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Student Management',
      description: 'Comprehensive student profiles with academic records, photos, and family information.'
    },
    {
      icon: Award,
      title: 'Result Processing',
      description: 'Automated grade calculation, report generation, and transcript management.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights into academic performance and institutional metrics.'
    },
    {
      icon: MessageSquare,
      title: 'SMS Notifications',
      description: 'Instant communication with students and parents via SMS alerts.'
    },
    {
      icon: FileText,
      title: 'Transcript Generation',
      description: 'Professional academic transcripts with secure verification features.'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Role-based access control with scratch card result verification system.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Education with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Modern Technology
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Complete student management and result processing platform for educational institutions across Nigeria.
            </p>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for your school..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm border-0 focus:ring-4 focus:ring-white/30 text-lg shadow-xl"
                />
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.form>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Get Started Free
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Schools', value: stats.schools, suffix: '+' },
              { label: 'Students', value: stats.students, suffix: '+' },
              { label: 'Results Processed', value: stats.results, suffix: '+' },
              { label: 'SMS Delivered', value: stats.smsDelivered, suffix: '+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive School Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage students, process results, and communicate with stakeholders.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              How Bridgetech Works
            </h2>
            <p className="text-xl text-gray-600">Simple steps to transform your school management</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register Your School',
                description: 'Sign up and customize your school portal with branding, logo, and settings.',
                icon: School
              },
              {
                step: '02',
                title: 'Manage Students & Results',
                description: 'Add students, teachers, and start processing academic results efficiently.',
                icon: Users
              },
              {
                step: '03',
                title: 'Track & Analyze',
                description: 'Monitor performance with analytics and communicate via SMS notifications.',
                icon: TrendingUp
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of schools already using Bridgetech to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;