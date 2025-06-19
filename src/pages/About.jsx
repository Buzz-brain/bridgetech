import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-4 text-primary-700">About Bridgetech</h2>
      <p className="text-lg text-gray-700 mb-4">
        Bridgetech is a next-generation school management platform designed to simplify and modernize the way schools operate. Our mission is to empower educators, administrators, students, and parents with seamless digital tools for every aspect of school life.
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>Role-based dashboards for Super Admin, School Admin, Teachers, Students, and Parents</li>
        <li>Modern, mobile-friendly UI with beautiful analytics and charts</li>
        <li>Secure authentication and data privacy</li>
        <li>Customizable for each school’s branding and needs</li>
        <li>24/7 support and regular updates</li>
      </ul>
    </div>
  );
}
