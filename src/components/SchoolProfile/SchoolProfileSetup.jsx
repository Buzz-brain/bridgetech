import React, { useState } from "react";
import { motion } from 'framer-motion';

const subscriptionOptions = [
  { value: 'scratch_card', label: 'Scratch Card' },
  { value: 'subscription', label: 'Subscription' },
];

const SchoolProfileSetup = () => {
  const [profile, setProfile] = useState({
    name: '',
    url: '',
    logo: '',
    logoPreview: '',
    phone: '',
    email: '',
    address: '',
    signature: '',
    signaturePreview: '',
    smsApi: '',
    birthdaySms: '',
    resultAccess: 'scratch_card',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          [name]: file,
          [`${name}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save profile data
    alert('Profile saved!');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8">
      {/* Logo Preview at the Top */}
      <div className="flex flex-col items-center mb-6">
        {profile.logoPreview ? (
          <motion.img src={profile.logoPreview} alt="Logo Preview" className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow mb-2" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 mb-2">
            <span className="text-gray-400 text-2xl">No Logo</span>
          </div>
        )}
        <input className="input w-full max-w-xs" type="file" name="logo" accept="image/*" onChange={handleChange} />
        <span className="text-xs text-gray-500 mt-1">Upload your school logo (will appear on all reports)</span>
      </div>
      <motion.h2 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl font-extrabold text-primary-700 mb-6 flex items-center gap-2">
        🏫 School Profile Setup
      </motion.h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
            <input className="input w-full" name="name" value={profile.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School URL</label>
            <input className="input w-full" name="url" value={profile.url} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input className="input w-full" name="phone" value={profile.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input className="input w-full" name="email" value={profile.email} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input className="input w-full" name="address" value={profile.address} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Signature (upload)</label>
            {profile.signaturePreview && (
              <motion.img src={profile.signaturePreview} alt="Signature Preview" className="w-32 h-16 object-contain border mb-2 bg-gray-50" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
            )}
            <input className="input w-full" type="file" name="signature" accept="image/*" onChange={handleChange} />
            <span className="text-xs text-gray-500 mt-1">Upload authorized signature (will appear on result sheets)</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Result Access Mode</label>
          <select className="input w-full" name="resultAccess" value={profile.resultAccess} onChange={handleChange}>
            {subscriptionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <span className="text-xs text-gray-500">Choose how students/parents access results: via scratch card or subscription</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SMS API Endpoint</label>
          <input className="input w-full" name="smsApi" value={profile.smsApi} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Birthday SMS Template</label>
          <textarea className="input w-full" name="birthdaySms" value={profile.birthdaySms} onChange={handleChange} rows={2} />
        </div>
        <div className="flex justify-end">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} type="submit" className="btn btn-primary shadow-lg">Save Profile</motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SchoolProfileSetup;
