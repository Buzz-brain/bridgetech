import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  BarChart3, 
  MessageSquare, 
  FileText,
  Shield,
  Calendar,
  CreditCard,
  Settings,
  Database,
  Smartphone,
  CheckCircle,
  Star
} from 'lucide-react';
import Layout from '../NavComponents/layout/Layout';

const Services = () => {
  const services = [
    {
      icon: Users,
      title: 'Student Management System',
      description: 'Comprehensive student profiles with academic records, personal information, and family details.',
      features: [
        'Complete student profiles with photos',
        'Academic history tracking',
        'Family and sponsor information',
        'Auto-generated student IDs',
        'Bulk student import/export'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Result Processing & Analytics',
      description: 'Automated grade calculation, report generation, and comprehensive academic analytics.',
      features: [
        'Automated grade calculations',
        'Customizable grading systems',
        'Term and session result reports',
        'Performance analytics dashboard',
        'Class ranking and positioning'
      ],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: FileText,
      title: 'Transcript & Report Generation',
      description: 'Professional academic transcripts and detailed student reports with secure verification.',
      features: [
        'Official transcript generation',
        'Customizable report templates',
        'Digital signatures and seals',
        'Bulk report printing',
        'PDF export capabilities'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'SMS Notification System',
      description: 'Instant communication with students and parents through integrated SMS services.',
      features: [
        'Result release notifications',
        'Event and announcement alerts',
        'Parent-teacher communication',
        'Bulk SMS campaigns',
        'Delivery status tracking'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CreditCard,
      title: 'Scratch Card Management',
      description: 'Secure result access control through customizable scratch card systems.',
      features: [
        'Scratch card generation',
        'Batch management system',
        'Revenue tracking',
        'Card validation system',
        'Distribution management'
      ],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Calendar,
      title: 'Academic Calendar',
      description: 'Complete academic year planning with term dates, events, and session management.',
      features: [
        'Academic session setup',
        'Term date management',
        'Event scheduling',
        'Holiday tracking',
        'Automatic date calculations'
      ],
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Comprehensive insights into academic performance and institutional metrics.',
      features: [
        'Performance trend analysis',
        'Class and subject statistics',
        'Gender distribution charts',
        'Pass/fail rate tracking',
        'Custom report generation'
      ],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Security & Access Control',
      description: 'Role-based access control with advanced security features for data protection.',
      features: [
        'Multi-role user management',
        'Secure authentication',
        'Audit trail logging',
        'Data encryption',
        'Backup and recovery'
      ],
      color: 'from-gray-600 to-gray-700'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '₦15,000',
      period: '/month',
      description: 'Perfect for small schools getting started',
      features: [
        'Up to 200 students',
        'Basic result processing',
        'SMS notifications (500/month)',
        'Standard reports',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₦35,000',
      period: '/month',
      description: 'Ideal for growing institutions',
      features: [
        'Up to 1,000 students',
        'Advanced analytics',
        'SMS notifications (2,000/month)',
        'Custom report templates',
        'Scratch card system',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large institutions with custom needs',
      features: [
        'Unlimited students',
        'Full feature access',
        'Unlimited SMS',
        'Custom integrations',
        'Dedicated account manager',
        '24/7 phone support'
      ],
      popular: false
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Comprehensive educational management solutions designed to streamline your school operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete School Management Suite
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to run your educational institution efficiently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your school's needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Bridgetech?
            </h2>
            <p className="text-xl text-gray-600">
              Advantages that set us apart from the competition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: 'Cloud-Based Infrastructure',
                description: 'Reliable, scalable, and secure cloud hosting with 99.9% uptime guarantee.'
              },
              {
                icon: Smartphone,
                title: 'Mobile Responsive',
                description: 'Access your school management system from any device, anywhere, anytime.'
              },
              {
                icon: Settings,
                title: 'Customizable Solutions',
                description: 'Tailor the platform to match your school\'s unique requirements and branding.'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level security with data encryption and regular security audits.'
              },
              {
                icon: Users,
                title: 'Expert Support',
                description: 'Dedicated customer success team with educational technology expertise.'
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Comprehensive reporting and analytics to drive data-informed decisions.'
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of schools already transforming their operations with Bridgetech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
              >
                Start Free Trial
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Schedule Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;