import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Users, BadgeCheck } from 'lucide-react';

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
const defaultAvatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/12.jpg',
  'https://randomuser.me/api/portraits/women/22.jpg',
  'https://randomuser.me/api/portraits/men/77.jpg',
  'https://randomuser.me/api/portraits/women/33.jpg',
  'https://randomuser.me/api/portraits/men/88.jpg',
  'https://randomuser.me/api/portraits/women/99.jpg',
];

const initialTeachers = Array.from({ length: 30 }, (_, i) => ({
  id: `TCH-${String(i + 1).padStart(4, '0')}`,
  name: `Teacher${i + 1} Fullname`,
  email: `teacher${i + 1}@school.com`,
  phone: `080100000${String(i + 1).padStart(2, '0')}`,
  address: `Address ${i + 1}, Cityville`,
  class: classOptions[(i % classOptions.length)],
  level: classLevelOptions[(i % classLevelOptions.length)],
  photo: '',
  photoPreview: defaultAvatars[i % defaultAvatars.length],
  signature: '',
  signaturePreview: '',
  status: statusOptions[i % statusOptions.length],
}));

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
    photo: '',
    photoPreview: '',
    signature: '',
    signaturePreview: '',
    status: statusOptions[0],
  });
  const [filters, setFilters] = useState({
    class: '',
    level: '',
    status: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const openAddModal = () => {
    setEditing(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      class: classOptions[0],
      level: classLevelOptions[0],
      photo: '',
      photoPreview: '',
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

  const confirmDelete = idx => {
    setTeacherToDelete(idx);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setTeachers(teachers.filter((_, i) => i !== teacherToDelete));
    setShowDeleteModal(false);
    setTeacherToDelete(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'photo') {
          setForm((prev) => ({ ...prev, photo: file, photoPreview: reader.result }));
        } else if (name === 'signature') {
          setForm((prev) => ({ ...prev, signature: file, signaturePreview: reader.result }));
        }
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
          photoPreview: form.photoPreview || defaultAvatars[(teachers.length) % defaultAvatars.length],
        },
      ]);
    }
    setShowModal(false);
  };

  // Filtering logic
  const filteredTeachers = teachers.filter(teacher =>
    (!filters.class || teacher.class === filters.class) &&
    (!filters.level || teacher.level === filters.level) &&
    (!filters.status || teacher.status === filters.status)
  );

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
      {/* Filters with icons */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-white rounded-lg shadow p-4">
        <span className="flex items-center gap-2 text-primary-700 font-semibold text-base">Filters:</span>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-gray-400" />
          <select className="input w-36" value={filters.class} onChange={e => setFilters(f => ({ ...f, class: e.target.value }))}>
            <option value="">All Classes</option>
            {classOptions.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <select className="input w-36" value={filters.level} onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}>
            <option value="">All Levels</option>
            {classLevelOptions.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-gray-400" />
          <select className="input w-36" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            <option value="">All Statuses</option>
            {statusOptions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-white to-blue-50">
        <table className="min-w-full text-sm">
          <thead className="bg-primary-50">
            <tr>
              <th className="py-3 px-4 font-semibold text-left">S/N</th>
              <th className="py-3 px-4 font-semibold text-left">Photo</th>
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
              {filteredTeachers.map((teacher, idx) => (
                <motion.tr
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.02 }}
                  className="border-b hover:bg-blue-50/60 transition-colors"
                >
                  <td className="py-2 px-4 font-bold text-gray-500">{idx + 1}</td>
                  <td className="py-2 px-4">
                    {teacher.photoPreview ? (
                      <img src={teacher.photoPreview} alt="Teacher" className="w-10 h-10 rounded-full object-cover border shadow" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border">
                        <span className="text-gray-400 text-xs">No Photo</span>
                      </div>
                    )}
                  </td>
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
              {/* Photo Upload and Preview */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center mb-2">
                {form.photoPreview ? (
                  <img src={form.photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border mb-2" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2 border">
                    <span className="text-gray-400">No Photo</span>
                  </div>
                )}
                <label className="btn btn-xs btn-secondary cursor-pointer">
                  Choose Photo
                  <input type="file" name="photo" accept="image/*" className="hidden" onChange={handleChange} />
                </label>
                <span className="text-xs text-gray-500">Upload teacher's passport photo</span>
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
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this teacher?</p>
            <div className="flex gap-4 mt-6">
              <button className="btn btn-error flex-1" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TeacherManagement;
