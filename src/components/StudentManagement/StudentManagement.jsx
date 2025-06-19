import React, { useState } from 'react';

const initialStudents = [];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genotypes = ['AA', 'AS', 'SS', 'SC', 'Others'];
const categories = ['Boarding student', 'Day student'];
const academicStatuses = ['Active', 'Graduated', 'Suspended', 'Expelled'];
const maritalStatuses = ['Single', 'Married'];
const religions = ['Christianity', 'Islam', 'Others', 'Traditional'];
const nationalities = ['Nigeria', 'Others'];
const admissionPeriods = ['First term', 'Second term', 'Third term'];
const academicLevels = [
  'Nil', 'JSS1', 'JSS1A', 'JSS1B', 'JSS2', 'JSS2A', 'JSS2B', 'JSS3', 'JSS3A', 'JSS3B',
  'SSS1', 'SSS1A', 'SSS1B', 'SSS2', 'SSS2A', 'SSS2B', 'SSS3', 'SSS3A', 'SSS3B'
];
const academicClasses = [
  'Nil', 'Art Class', 'Commercial Class', 'General Class', 'Science Class', 'Technology Class'
];
const sessions = ['2021/2022', '2022/2023', '2023/2024', '2024/2025'];
const states = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

function generateStudentId(schoolCode, count) {
  return `${schoolCode}-STU-${String(count + 1).padStart(4, '0')}`;
}

export default function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [form, setForm] = useState({
    passport: '', surname: '', firstName: '', middleName: '',
    currentAcademicLevel: academicLevels[0], currentAcademicClass: academicClasses[0],
    category: categories[0], gender: '', dob: '', religion: religions[0], maritalStatus: maritalStatuses[0], nationality: nationalities[0], address: '', state: states[0], lga: '', hometown: '', language: '',
    admittedSession: sessions[0], admittedPeriod: admissionPeriods[0], admittedLevel: academicLevels[0], admittedClass: academicClasses[0], academicStatus: academicStatuses[0], admissionDate: new Date().toISOString().slice(0, 10),
    bloodGroup: bloodGroups[0], genotype: genotypes[0], disabilities: '', disabilityDescription: '', sponsors: [],
  });
  const [sponsorForm, setSponsorForm] = useState({ name: '', relationship: '', photo: '', phone: '', email: '', address: '', occupation: '' });
  const [schoolCode] = useState('SCH001');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSponsorChange = e => {
    setSponsorForm({ ...sponsorForm, [e.target.name]: e.target.value });
  };

  const addSponsor = e => {
    e.preventDefault();
    setForm({ ...form, sponsors: [...form.sponsors, sponsorForm] });
    setSponsorForm({ name: '', relationship: '', photo: '', phone: '', email: '', address: '', occupation: '' });
  };

  const openAddModal = () => {
    setEditing(null);
    setForm({
      passport: '', surname: '', firstName: '', middleName: '',
      currentAcademicLevel: academicLevels[0], currentAcademicClass: academicClasses[0],
      category: categories[0], gender: '', dob: '', religion: religions[0], maritalStatus: maritalStatuses[0], nationality: nationalities[0], address: '', state: states[0], lga: '', hometown: '', language: '',
      admittedSession: sessions[0], admittedPeriod: admissionPeriods[0], admittedLevel: academicLevels[0], admittedClass: academicClasses[0], academicStatus: academicStatuses[0], admissionDate: new Date().toISOString().slice(0, 10),
      bloodGroup: bloodGroups[0], genotype: genotypes[0], disabilities: '', disabilityDescription: '', sponsors: [],
    });
    setShowModal(true);
  };

  const openEditModal = (student, idx) => {
    setEditing(idx);
    setForm(student);
    setShowModal(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing !== null) {
      setStudents(students.map((s, i) => i === editing ? { ...form } : s));
    } else {
      setStudents([...students, { ...form, id: generateStudentId(schoolCode, students.length) }]);
    }
    setShowModal(false);
  };

  const confirmDelete = idx => {
    setStudentToDelete(idx);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setStudents(students.filter((_, i) => i !== studentToDelete));
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <button className="btn btn-primary" onClick={openAddModal}>Add Student</button>
      </div>
      <table className="min-w-full bg-white rounded shadow mb-8">
        <thead>
          <tr>
            <th className="py-2 px-4">Student ID</th>
            <th className="py-2 px-4">Surname</th>
            <th className="py-2 px-4">First Name</th>
            <th className="py-2 px-4">Class</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student.id} className="border-t">
              <td className="py-2 px-4">{student.id}</td>
              <td className="py-2 px-4">{student.surname}</td>
              <td className="py-2 px-4">{student.firstName}</td>
              <td className="py-2 px-4">{student.currentAcademicClass}</td>
              <td className="py-2 px-4">{student.academicStatus}</td>
              <td className="py-2 px-4 flex gap-2">
                <button className="btn btn-xs btn-secondary" onClick={() => openEditModal(student, idx)}>Edit</button>
                <button className="btn btn-xs btn-danger" onClick={() => confirmDelete(idx)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for Add/Edit Student */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">{editing !== null ? 'Edit Student' : 'Add Student'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Info */}
              <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" className="input" required />
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input" required />
              <input name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle Name" className="input" />
              <input name="dob" value={form.dob} onChange={handleChange} type="date" placeholder="Date of Birth" className="input" required />
              <select name="gender" value={form.gender} onChange={handleChange} className="input"><option value="">Gender</option><option>Male</option><option>Female</option></select>
              <select name="category" value={form.category} onChange={handleChange} className="input">{categories.map(c => <option key={c}>{c}</option>)}</select>
              <select name="religion" value={form.religion} onChange={handleChange} className="input">{religions.map(r => <option key={r}>{r}</option>)}</select>
              <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="input">{maritalStatuses.map(m => <option key={m}>{m}</option>)}</select>
              <select name="nationality" value={form.nationality} onChange={handleChange} className="input">{nationalities.map(n => <option key={n}>{n}</option>)}</select>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
              <select name="state" value={form.state} onChange={handleChange} className="input">{states.map(s => <option key={s}>{s}</option>)}</select>
              <input name="lga" value={form.lga} onChange={handleChange} placeholder="LGA" className="input" />
              <input name="hometown" value={form.hometown} onChange={handleChange} placeholder="Home Town" className="input" />
              <input name="language" value={form.language} onChange={handleChange} placeholder="Language Spoken" className="input" />
              {/* Academic Info */}
              <select name="currentAcademicLevel" value={form.currentAcademicLevel} onChange={handleChange} className="input">{academicLevels.map(l => <option key={l}>{l}</option>)}</select>
              <select name="currentAcademicClass" value={form.currentAcademicClass} onChange={handleChange} className="input">{academicClasses.map(c => <option key={c}>{c}</option>)}</select>
              <select name="admittedSession" value={form.admittedSession} onChange={handleChange} className="input">{sessions.map(s => <option key={s}>{s}</option>)}</select>
              <select name="admittedPeriod" value={form.admittedPeriod} onChange={handleChange} className="input">{admissionPeriods.map(p => <option key={p}>{p}</option>)}</select>
              <select name="admittedLevel" value={form.admittedLevel} onChange={handleChange} className="input">{academicLevels.map(l => <option key={l}>{l}</option>)}</select>
              <select name="admittedClass" value={form.admittedClass} onChange={handleChange} className="input">{academicClasses.map(c => <option key={c}>{c}</option>)}</select>
              <select name="academicStatus" value={form.academicStatus} onChange={handleChange} className="input">{academicStatuses.map(a => <option key={a}>{a}</option>)}</select>
              <input name="admissionDate" value={form.admissionDate} onChange={handleChange} type="date" className="input" readOnly />
              {/* Medical Info */}
              <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="input">{bloodGroups.map(bg => <option key={bg}>{bg}</option>)}</select>
              <select name="genotype" value={form.genotype} onChange={handleChange} className="input">{genotypes.map(g => <option key={g}>{g}</option>)}</select>
              <input name="disabilities" value={form.disabilities} onChange={handleChange} placeholder="Disabilities" className="input" />
              <input name="disabilityDescription" value={form.disabilityDescription} onChange={handleChange} placeholder="Disability Description (Say nil if none)" className="input" />
              {/* Sponsors */}
              <div className="col-span-1 md:col-span-2 font-semibold text-lg mt-4 mb-2">Sponsor(s)</div>
              <div className="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded mb-2">
                <form onSubmit={addSponsor} className="flex flex-wrap gap-2 items-end">
                  <input name="name" value={sponsorForm.name} onChange={handleSponsorChange} placeholder="Name" className="input" required />
                  <input name="relationship" value={sponsorForm.relationship} onChange={handleSponsorChange} placeholder="Relationship" className="input" />
                  <input name="photo" type="file" className="input" onChange={e => setSponsorForm({ ...sponsorForm, photo: e.target.files[0] })} />
                  <input name="phone" value={sponsorForm.phone} onChange={handleSponsorChange} placeholder="Phone" className="input" />
                  <input name="email" value={sponsorForm.email} onChange={handleSponsorChange} placeholder="Email" className="input" />
                  <input name="address" value={sponsorForm.address} onChange={handleSponsorChange} placeholder="Address" className="input" />
                  <input name="occupation" value={sponsorForm.occupation} onChange={handleSponsorChange} placeholder="Occupation" className="input" />
                  <button type="submit" className="btn btn-xs btn-primary">Add Sponsor</button>
                </form>
                <ul className="mt-2">
                  {form.sponsors.map((s, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex gap-2 items-center mt-1">
                      <span className="font-semibold">{s.name}</span> ({s.relationship})
                    </li>
                  ))}
                </ul>
              </div>
              <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">{editing !== null ? 'Update Student' : 'Add Student'}</button>
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
            <p>Are you sure you want to delete this student?</p>
            <div className="flex gap-4 mt-6">
              <button className="btn btn-danger flex-1" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
