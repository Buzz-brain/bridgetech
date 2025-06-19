import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Schools Onboarded', value: 120, color: 'text-blue-600', icon: '🏫' },
  { label: 'Students Managed', value: 15000, color: 'text-green-600', icon: '🎓' },
  { label: 'Teachers Empowered', value: 350, color: 'text-purple-600', icon: '👩‍🏫' },
];

function AnimatedCounter({ value, ...props }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let incrementTime = 10;
    let step = Math.ceil(end / 60);
    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span {...props}>{count.toLocaleString()}</span>;
}

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 0.15 }} transition={{ duration: 1.2 }} className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-blue-400 rounded-full blur-3xl z-0" />
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 0.12 }} transition={{ duration: 1.4 }} className="absolute -bottom-40 right-0 w-[28rem] h-[28rem] bg-purple-400 rounded-full blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto z-10">
        <div className="flex-1 mb-10 md:mb-0">
          <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl font-extrabold text-primary-700 mb-6 leading-tight drop-shadow">
            Welcome to <span className="text-blue-600">Bridgetech</span>
          </motion.h1>
          <motion.p initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg text-gray-700 mb-8 max-w-xl">
            The all-in-one school management platform for modern education. Effortlessly manage students, results, staff, and more with a beautiful, secure, and mobile-friendly dashboard.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-4">
            <a href="#contact" className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:scale-105 transition-transform">Get Started</a>
            <a href="#about" className="btn btn-secondary text-lg px-8 py-3 hover:scale-105 transition-transform">Learn More</a>
          </motion.div>
        </div>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }} className="flex-1 flex justify-center relative">
          <img src="/vite.svg" alt="Bridgetech Hero" className="w-80 md:w-[28rem] drop-shadow-2xl z-10" />
          {/* Animated Mascot */}
          <motion.img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Mascot" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, type: 'spring', stiffness: 120 }} className="absolute -bottom-8 right-0 w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-white bg-white" />
        </motion.div>
      </section>
      {/* Stats Counter */}
      <section className="bg-white py-12 shadow-inner z-10">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.15 }} className="text-center flex flex-col items-center">
              <span className="text-4xl mb-2">{stat.icon}</span>
              <div className={`text-4xl font-bold ${stat.color}`}><AnimatedCounter value={stat.value} /></div>
              <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Floating Shapes for extra depth */}
      <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 0.12 }} transition={{ duration: 1.5 }} className="absolute top-1/2 left-0 w-40 h-40 bg-green-300 rounded-full blur-2xl z-0" />
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 0.10 }} transition={{ duration: 1.7 }} className="absolute bottom-0 left-1/2 w-32 h-32 bg-yellow-200 rounded-full blur-2xl z-0" />
    </motion.div>
  );
}
