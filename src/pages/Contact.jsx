import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4" id="contact">
      <h2 className="text-3xl font-bold mb-4 text-primary-700">Contact Us</h2>
      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">Thank you for contacting us! We’ll get back to you soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="input w-full" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Your Email" className="input w-full" type="email" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" className="input w-full min-h-[100px]" />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="btn btn-primary w-full">Send Message</button>
        </form>
      )}
    </div>
  );
}
