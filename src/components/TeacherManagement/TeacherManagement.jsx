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
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    class: classOptions[0],
    level: classLevelOptions[0],
    signature: '',
    signaturePreview: '',
    status: statusOptions[0],
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      class: classOptions[0],
      level: classLevelOptions[0],
      signature: '',
      signaturePreview: '',
      status: statusOptions[0],
    });
    setShowModal(true);
  };

  const openEditModal = (teacher, idx) => {
    setEditing(idx);
    setForm(teacher);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          [name]: file,
          signaturePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing !== null) {
      setTeachers(teachers.map((t, i) => i === editing ? { ...form } : t));
    } else {
      setTeachers([
        ...teachers,
        {
          ...form,
          id: generateTeacherId(teachers),
        },
      ]);
    }
    setShowModal(false);
  };

  const confirmDelete = (idx) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((_, i) => i !== idx));
    }
  };

  return (
    <motion.div className="max-w-5xl mx-auto py-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-primary-700 tracking-tight flex items-center gap-2">
          <span role="img" aria-label="teacher">✔️</span> Teacher Management
        </h2>
        <motion.button
          className="btn btn-primary shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={openAddModal}
        >
          + Add Teacher
        </motion.button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-white to-blue-50">
        <table className="min-w-full text-sm">
          <thead className="bg-primary-50">
            <tr>
              <th className="py-3 px-4 font-semibold text-left">S/N</th>
              <th className="py-3 px-4 font-semibold text-left">Teacher ID</th>
              <th className="py-3 px-4 font-semibold text-left">Name</th>
              <th className="py-3 px-4 font-semibold text-left">Class</th>
              <th className="py-3 px-4 font-semibold text-left">Level</th>
              <th className="py-3 px-4 font-semibold text-left">Status</th>
              <th className="py-3 px-4 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {teachers.map((teacher, idx) => (
                <motion.tr
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.02 }}
                  className="border-b hover:bg-blue-50/60 transition-colors"
                >
                  <td className="py-2 px-4 font-bold text-gray-500">{idx + 1}</td>
                  <td className="py-2 px-4 font-mono text-primary-700">{teacher.id}</td>
                  <td className="py-2 px-4 font-medium text-gray-900">{teacher.name}</td>
                  <td className="py-2 px-4 text-gray-700">{teacher.class}</td>
                  <td className="py-2 px-4 text-gray-700">{teacher.level}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{teacher.status}</span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <motion.button className="btn btn-xs btn-secondary" whileHover={{ scale: 1.1 }} onClick={() => openEditModal(teacher, idx)}>Edit</motion.button>
                    <motion.button className="btn btn-xs btn-error" whileHover={{ scale: 1.1 }} onClick={() => confirmDelete(idx)}>Delete</motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {/* Modal for Add/Edit Teacher */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">{editing !== null ? 'Edit Teacher' : 'Add Teacher'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teacher ID (read-only, only on edit) */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-700">Teacher ID:</span>
                <span className="font-mono bg-gray-100 px-3 py-1 rounded text-primary-700 border border-gray-200">{editing !== null ? form.id : generateTeacherId(teachers)}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input className="input w-full" placeholder="Full Name" name="name" value={form.name} onChange={handleChange} required />
                <span className="text-xs text-gray-500">Enter teacher's full name</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select className="input w-full" name="class" value={form.class} onChange={handleChange}>
                  {classOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Level</label>
                <select className="input w-full" name="level" value={form.level} onChange={handleChange}>
                  {classLevelOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input className="input w-full" placeholder="e.g 023-000-000-0000" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input className="input w-full" placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input className="input w-full" placeholder="Address" name="address" value={form.address} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature (upload)</label>
                {form.signaturePreview && (
                  <motion.img src={form.signaturePreview} alt="Signature Preview" className="w-32 h-16 object-contain border mb-2 bg-gray-50" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
                )}
                <input className="input w-full" type="file" name="signature" accept="image/*" onChange={handleChange} />
                <span className="text-xs text-gray-500 mt-1">Upload teacher's signature (optional)</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="input w-full" name="status" value={form.status} onChange={handleChange}>
                  {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn btn-primary" type="submit">
                  {editing !== null ? 'Update Teacher' : 'Add Teacher'}
                </motion.button>
              </div>
            </form>
            <button className="mt-4 btn btn-secondary w-full" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TeacherManagement;
