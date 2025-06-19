import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="flex-1 mb-10 md:mb-0">
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl font-extrabold text-primary-700 mb-6 leading-tight">
            Welcome to <span className="text-blue-600">Bridgetech</span>
          </motion.h1>
          <motion.p initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg text-gray-700 mb-8 max-w-xl">
            The all-in-one school management platform for modern education. Effortlessly manage students, results, staff, and more with a beautiful, secure, and mobile-friendly dashboard.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-4">
            <a href="#contact" className="btn btn-primary text-lg px-8 py-3 shadow-lg">Get Started</a>
            <a href="#about" className="btn btn-secondary text-lg px-8 py-3">Learn More</a>
          </motion.div>
        </div>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }} className="flex-1 flex justify-center">
          <img src="/vite.svg" alt="Bridgetech Hero" className="w-80 md:w-[28rem] drop-shadow-2xl" />
        </motion.div>
      </section>
      {/* Stats Counter */}
      <section className="bg-white py-12 shadow-inner">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">120+</div>
            <div className="text-gray-600 mt-2">Schools Onboarded</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">15,000+</div>
            <div className="text-gray-600 mt-2">Students Managed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">350+</div>
            <div className="text-gray-600 mt-2">Teachers Empowered</div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
