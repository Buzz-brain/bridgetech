import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Award, 
  Users,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';
import LoadingSpinner from '../NavComponents/ui/LoadingSpinner';

const SchoolPortal = () => {
  const { schoolSlug } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        // Simulate API call to fetch school data based on slug
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock school data - in real app, this would come from API
        const mockSchool = {
          id: 1,
          name: 'Stella Maris College',
          slug: schoolSlug,
          logo: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg',
          motto: 'Excellence in Education',
          description: 'A premier educational institution committed to nurturing young minds and building future leaders through quality education and character development.',
          established: '1985',
          address: '123 Education Street, Lagos, Nigeria',
          phone: '+234 123 456 7890',
          email: 'info@stellamaris.edu.ng',
          website: 'www.stellamaris.edu.ng',
          principalName: 'Dr. Mary Johnson',
          studentCount: 1200,
          teacherCount: 85,
          features: [
            'Modern Laboratory Facilities',
            'Well-equipped Library',
            'Sports Complex',
            'Computer Lab',
            'Science Laboratory',
            'Arts & Crafts Center'
          ],
          colors: {
            primary: '#1e40af',
            secondary: '#059669',
            accent: '#dc2626'
          }
        };
        
        setSchool(mockSchool);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [schoolSlug]);

  if (loading) return <LoadingSpinner />;

  if (error || !school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The school "{schoolSlug}" could not be found.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { icon: User, label: 'Student Login', path: '/login?role=student', color: 'from-blue-500 to-blue-600' },
    { icon: Award, label: 'Admin Login', path: '/login?role=admin', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600">
              <span>← Back to Bridgetech</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* School Logo */}
            <div className="mb-8">
              <img
                src={school.logo}
                alt={`${school.name} Logo`}
                className="w-24 h-24 mx-auto rounded-full shadow-lg border-4 border-white/30"
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {school.name}
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {school.motto}
            </p>
            
            <p className="text-lg max-w-3xl mx-auto leading-relaxed opacity-80">
              {school.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Access Your Portal
            </h2>
            <p className="text-xl text-gray-600">
              Select your role to access the appropriate portal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="block bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className={`bg-gradient-to-r ${link.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <link.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.label}</h3>
                  <p className="text-gray-600 text-sm">Click to access your portal</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* School Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {school.established}
              </div>
              <div className="text-gray-600">Established</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {school.studentCount.toLocaleString()}
              </div>
              <div className="text-gray-600">Students</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {school.teacherCount}
              </div>
              <div className="text-gray-600">Teachers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">
                39
              </div>
              <div className="text-gray-600">Years of Excellence</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Facilities
            </h2>
            <p className="text-xl text-gray-600">
              World-class facilities to support comprehensive education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {school.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>{school.address}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <a href={`tel:${school.phone}`} className="hover:text-blue-400 transition-colors">
                    {school.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <a href={`mailto:${school.email}`} className="hover:text-blue-400 transition-colors">
                    {school.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ExternalLink className="h-5 w-5 text-blue-400" />
                  <a 
                    href={`https://${school.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    {school.website}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Administration</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{school.principalName}</h3>
                    <p className="text-gray-400">Principal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolPortal;