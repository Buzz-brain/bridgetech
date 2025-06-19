import React, { useState } from "react";

const initialTeachers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@school.com",
    phone: "08012345678",
    class: "JSS 1",
    level: "Junior",
    signature: '',
    status: "active",
  },
];

const statusOptions = [
  "active",
  "transferred",
  "suspended",
  "dismissed",
  "on leave",
];

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', phone: '', class: '', level: '', signature: '', status: 'active' });
  const [showAdd, setShowAdd] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewTeacher({ ...newTeacher, [name]: files[0] });
    } else {
      setNewTeacher({ ...newTeacher, [name]: value });
    }
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.phone) return;
    setTeachers([
      ...teachers,
      { ...newTeacher, id: Date.now() },
    ]);
    setNewTeacher({ name: '', email: '', phone: '', class: '', level: '', signature: '', status: 'active' });
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Teacher Management</h2>
      <div className="mb-6 flex gap-2">
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : 'Add Teacher'}
        </button>
      </div>
      {showAdd && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-2">
            <input className="input" placeholder="Full Name" name="name" value={newTeacher.name} onChange={handleChange} />
            <input className="input" placeholder="Email" name="email" value={newTeacher.email} onChange={handleChange} />
            <input className="input" placeholder="Phone" name="phone" value={newTeacher.phone} onChange={handleChange} />
            <input className="input" placeholder="Class" name="class" value={newTeacher.class} onChange={handleChange} />
            <input className="input" placeholder="Level" name="level" value={newTeacher.level} onChange={handleChange} />
            <input className="input" type="file" name="signature" accept="image/*" onChange={handleChange} />
            <select className="input" name="status" value={newTeacher.status} onChange={handleChange}>
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleAddTeacher}>Save Teacher</button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full table-auto mb-2">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Level</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Signature</th>
              <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id} className="border-b border-gray-100">
                <td className="py-2 px-2 font-medium text-gray-900">{teacher.name}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.email}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.phone}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.class}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.level}</td>
                <td className="py-2 px-2 text-gray-700">{teacher.signature ? teacher.signature.name || 'Uploaded' : '-'}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${teacher.status === 'active' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>{teacher.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherManagement;
