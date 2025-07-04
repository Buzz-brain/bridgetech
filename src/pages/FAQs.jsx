import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react';
import Layout from '../NavComponents/layout/Layout';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is Bridgetech and how does it work?',
          answer: 'Bridgetech is a comprehensive educational management platform designed for schools in Nigeria. It provides student management, result processing, transcript generation, SMS notifications, and analytics tools. Schools can manage their entire academic operations through our web-based platform.'
        },
        {
          question: 'How much does Bridgetech cost?',
          answer: 'We offer flexible pricing plans starting from ₦15,000/month for small schools. Our Professional plan is ₦35,000/month, and we offer custom Enterprise solutions for larger institutions. All plans include core features with varying limits on student numbers and SMS allowances.'
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes! We offer a 30-day free trial for all new schools. This gives you full access to explore our features and see how Bridgetech can benefit your institution before making a commitment.'
        },
        {
          question: 'What kind of support do you provide?',
          answer: 'We provide comprehensive support including email support for all plans, priority support for Professional plans, and 24/7 phone support for Enterprise customers. We also offer onboarding assistance and training for your staff.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'Do I need to install any software?',
          answer: 'No installation required! Bridgetech is a cloud-based platform accessible through any web browser. This means you can access your school management system from anywhere with an internet connection.'
        },
        {
          question: 'Is my school data secure?',
          answer: 'Absolutely. We use bank-level security with SSL encryption, regular security audits, and secure data centers. All student and school data is encrypted and backed up daily. We comply with international data protection standards.'
        },
        {
          question: 'Can I import existing student data?',
          answer: 'Yes, we provide data migration services to help you import your existing student records, grades, and other important data. Our team will assist you in the migration process to ensure no data is lost.'
        },
        {
          question: 'What happens if I want to cancel?',
          answer: 'You can cancel your subscription at any time. We provide data export tools so you can download all your school data before cancellation. No long-term contracts or cancellation fees.'
        }
      ]
    },
    {
      category: 'Features',
      questions: [
        {
          question: 'How does the SMS notification system work?',
          answer: 'Our integrated SMS system allows you to send notifications to parents and students about results, events, fees, and other important information. SMS credits are included in your plan, and you can track delivery status for all messages sent.'
        },
        {
          question: 'Can I customize reports and transcripts?',
          answer: 'Yes, you can customize report templates with your school logo, colors, and specific formatting requirements. We also offer custom transcript designs that meet official academic standards.'
        },
        {
          question: 'How does the scratch card system work?',
          answer: 'The scratch card system allows schools to generate revenue from result access. Students purchase cards to view their results online. You can generate cards in batches, track sales, and manage distribution through the platform.'
        },
        {
          question: 'Can multiple users access the system simultaneously?',
          answer: 'Yes, our platform supports multiple concurrent users with role-based access control. Teachers, administrators, students, and parents can all access their respective portals simultaneously without any issues.'
        }
      ]
    },
    {
      category: 'Setup & Implementation',
      questions: [
        {
          question: 'How long does it take to set up my school?',
          answer: 'Basic setup can be completed in 1-2 days. This includes school profile creation, user accounts, and basic configuration. Full implementation with data migration and staff training typically takes 1-2 weeks depending on school size.'
        },
        {
          question: 'Do you provide training for our staff?',
          answer: 'Yes, we provide comprehensive training for your administrative staff and teachers. This includes live training sessions, documentation, and ongoing support to ensure everyone is comfortable using the platform.'
        },
        {
          question: 'Can I customize the platform for my school branding?',
          answer: 'Absolutely! You can customize your school portal with your logo, colors, and branding elements. Each school gets their own subdomain (e.g., yourschool.bridgetech.com) with personalized styling.'
        },
        {
          question: 'What if I need help after setup?',
          answer: 'Our customer success team provides ongoing support through email, phone, and live chat. We also have extensive documentation, video tutorials, and regular webinars to help you get the most out of the platform.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const faqId = `${categoryIndex}-${questionIndex}`;
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

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
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about Bridgetech's educational management platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const faqId = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openFAQ === faqId;
                  
                  return (
                    <div
                      key={questionIndex}
                      className="bg-gray-50 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600">
              Our support team is here to help you get the answers you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-6">
                Get instant answers from our support team during business hours.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Support</h3>
              <p className="text-gray-600 mb-6">
                Send us your questions and we'll respond within 24 hours.
              </p>
              <a
                href="mailto:support@bridgetech.com"
                className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors inline-block"
              >
                Send Email
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Phone Support</h3>
              <p className="text-gray-600 mb-6">
                Speak directly with our technical support specialists.
              </p>
              <a
                href="tel:+2348000000000"
                className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
              >
                Call Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Knowledge Base CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore Our Knowledge Base
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Access detailed guides, tutorials, and documentation to get the most out of Bridgetech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
              >
                Browse Documentation
              </a>
              <a
                href="/tutorials"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Watch Tutorials
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;