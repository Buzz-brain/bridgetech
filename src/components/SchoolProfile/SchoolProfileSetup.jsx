import React, { useState } from "react";

const SchoolProfileSetup = () => {
  const [profile, setProfile] = useState({
    name: '',
    url: '',
    logo: '',
    phone: '',
    email: '',
    address: '',
    signature: '',
    smsApi: '',
    birthdaySms: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProfile({ ...profile, [name]: files[0] });
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
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">School Profile Setup</h2>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
            <input className="input w-full" type="file" name="logo" accept="image/*" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Signature (upload)</label>
            <input className="input w-full" type="file" name="signature" accept="image/*" onChange={handleChange} />
          </div>
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
          <button type="submit" className="btn btn-primary">Save Profile</button>
        </div>
      </form>
    </div>
  );
};

export default SchoolProfileSetup;
