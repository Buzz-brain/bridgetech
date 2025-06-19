import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const classOptions = [
  'Nil', 'Art Class', 'Commercial Class', 'General Class', 'Science Class', 'Technology Class'
];
const classLevelOptions = [
  'Nil', 'JSS1', 'JSS1A', 'JSS1B', 'JSS2', 'JSS2A', 'JSS2B', 'JSS3', 'JSS3A', 'JSS3B',
  'SSS1', 'SSS1A', 'SSS1B', 'SSS2', 'SSS2A', 'SSS2B', 'SSS3', 'SSS3A', 'SSS3B'
];
const statusOptions = [
  'Active', 'Transferred', 'Suspended', 'Dismissed', 'Onleave'
];

const initialTeachers = [
  {
    id: 'TCH-0001',
    name: "John Doe",
    email: "john@school.com",
    phone: "08012345678",
    address: "123 Main St, Cityville",
    class: "General Class",
    level: "JSS1A",
    signature: '',
    signaturePreview: '',
    status: "Active",
  },
];

const generateTeacherId = (teachers) => {
  const lastId = teachers.length ? parseInt(teachers[teachers.length - 1].id?.split('-')[1] || '0', 10) : 0;
  return `TCH-${(lastId + 1).toString().padStart(4, '0')}`;
};

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    class: '',
    level: '',
    signature: '',
    signaturePreview: '',
    status: 'Active',
  });
  const [showAdd, setShowAdd] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTeacher((prev) => ({
          ...prev,
          [name]: file,
          signaturePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setNewTeacher({ ...newTeacher, [name]: value });
    }
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.phone) return;
    setTeachers([
      ...teachers,
      {
        ...newTeacher,
        id: generateTeacherId(teachers),
      },
    ]);
    setNewTeacher({ name: '', email: '', phone: '', address: '', class: '', level: '', signature: '', signaturePreview: '', status: 'Active' });
    setShowAdd(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8">
      <h2 className="text-3xl font-extrabold text-primary-700 mb-6 flex items-center gap-2">✔️ Teacher Management</h2>
      <div className="mb-6 flex gap-2">
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : 'Add Teacher'}
        </button>
      </div>
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="bg-gray-50 p-6 rounded-lg mb-6 border border-primary-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input className="input w-full" placeholder="Full Name" name="name" value={newTeacher.name} onChange={handleChange} />
                <span className="text-xs text-gray-500">Enter teacher's full name</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher ID</label>
                <input className="input w-full bg-gray-100" value={generateTeacherId(teachers)} disabled />
                <span className="text-xs text-gray-500">Auto-generated</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select className="input w-full" name="class" value={newTeacher.class} onChange={handleChange}>
                  {classOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Level</label>
                <select className="input w-full" name="level" value={newTeacher.level} onChange={handleChange}>
                  {classLevelOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input className="input w-full" placeholder="e.g 023-000-000-0000" name="phone" value={newTeacher.phone} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input className="input w-full" placeholder="Email" name="email" value={newTeacher.email} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input className="input w-full" placeholder="Address" name="address" value={newTeacher.address} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature (upload)</label>
                {newTeacher.signaturePreview && (
                  <motion.img src={newTeacher.signaturePreview} alt="Signature Preview" className="w-32 h-16 object-contain border mb-2 bg-gray-50" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
                )}
                <input className="input w-full" type="file" name="signature" accept="image/*" onChange={handleChange} />
                <span className="text-xs text-gray-500 mt-1">Upload teacher's signature (optional)</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="input w-full" name="status" value={newTeacher.status} onChange={handleChange}>
                  {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn btn-primary" onClick={handleAddTeacher}>Save Teacher</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="overflow-x-auto">
        <table className="w-full table-auto mb-2">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Teacher ID</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Level</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Address</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Signature</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id} className="border-b border-gray-100">
                <td className="py-2 px-2 font-mono text-primary-700">{teacher.id}</td>
                <td className="py-2 px-2 font-medium text-gray-900">{teacher.name}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.email}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.phone}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.class}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.level}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.address}</td>
                <td className="py-2 px-2 text-gray-700">
                  {teacher.signaturePreview ? (
                    <img src={teacher.signaturePreview} alt="Signature" className="w-16 h-8 object-contain border bg-gray-50" />
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${teacher.status === 'Active' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>{teacher.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TeacherManagement;
