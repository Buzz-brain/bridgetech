import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';

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

const initialStudents = Array.from({ length: 30 }, (_, i) => ({
  id: `SCH001-STU-${String(i + 1).padStart(4, '0')}`,
  surname: `Surname${i + 1}`,
  firstName: `First${i + 1}`,
  middleName: `Middle${i + 1}`,
  currentAcademicLevel: 'JSS1A',
  currentAcademicClass: 'General Class',
  category: i % 2 === 0 ? 'Boarding student' : 'Day student',
  gender: i % 2 === 0 ? 'Male' : 'Female',
  dob: `201${Math.floor(i/3)}-0${(i%12)+1}-15`,
  religion: 'Christianity',
  maritalStatus: 'Single',
  nationality: 'Nigeria',
  address: `Address ${i + 1}`,
  state: 'Lagos',
  lga: `LGA${i + 1}`,
  hometown: `Town${i + 1}`,
  language: 'English',
  admittedSession: '2023/2024',
  admittedPeriod: 'First term',
  admittedLevel: 'JSS1A',
  admittedClass: 'General Class',
  academicStatus: i % 3 === 0 ? 'Active' : (i % 3 === 1 ? 'Graduated' : (i % 3 === 2 ? 'Suspended' : (i % 4 === 3 ? 'Expelled' : 'Withdrawn'))),
  admissionDate: `2023-09-01`,
  bloodGroup: 'O+',
  genotype: 'AA',
  disabilities: '',
  disabilityDescription: 'nil',
  sponsors: [
    { name: `Sponsor${i + 1}`, relationship: 'Parent', phone: `080000000${i + 1}`, email: `sponsor${i + 1}@mail.com`, address: `Sponsor Address ${i + 1}`, occupation: 'Trader' }
  ],
  profilePic: defaultAvatars[i % defaultAvatars.length],
  academicHistory: [
    {
      session: '2023/2024',
      level: 'JSS1A',
      class: 'General Class',
      status: 'Active',
    },
  ],
}));
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genotypes = ['AA', 'AS', 'SS', 'SC', 'Others'];
const categories = ['Boarding student', 'Day student'];
const academicStatuses = ['Active', 'Graduated', 'Suspended', 'Expelled', 'Withdrawn'];
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
    profilePic: '',
  });
  const [sponsorForm, setSponsorForm] = useState({ name: '', relationship: '', photo: '', phone: '', email: '', address: '', occupation: '' });
  const [schoolCode] = useState('SCH001');
  // Filtering state
  const [filters, setFilters] = useState({
    session: '',
    level: '',
    class: '',
    status: '',
  });

  const filteredStudents = students.filter(student =>
    (!filters.session || student.admittedSession === filters.session) &&
    (!filters.level || student.currentAcademicLevel === filters.level) &&
    (!filters.class || student.currentAcademicClass === filters.class) &&
    (!filters.status || student.academicStatus === filters.status)
  );

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
      profilePic: '',
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

  const handleProfilePicChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div className="max-w-6xl mx-auto py-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-primary-700 tracking-tight flex items-center gap-2">
          <span role="img" aria-label="student">🎓</span> Student Management
        </h2>
        <div className="flex gap-2">
          <motion.button className="btn btn-primary shadow-lg hover:scale-105 transition-transform" whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} onClick={openAddModal}>
            + Add Student
          </motion.button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-white rounded-lg shadow p-4">
        <span className="flex items-center gap-2 text-primary-700 font-semibold text-base"><Filter className="w-4 h-4" /> Filters:</span>
        <div className="flex items-center gap-2">
          <select className="input w-36" value={filters.session} onChange={e => setFilters(f => ({ ...f, session: e.target.value }))}>
            <option value="">All Sessions</option>
            {sessions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <select className="input w-36" value={filters.level} onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}>
            <option value="">All Levels</option>
            {academicLevels.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <select className="input w-36" value={filters.class} onChange={e => setFilters(f => ({ ...f, class: e.target.value }))}>
            <option value="">All Classes</option>
            {academicClasses.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <select className="input w-36" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            <option value="">All Statuses</option>
            {academicStatuses.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-white to-blue-50">
        <table className="min-w-full text-sm">
          <thead className="bg-primary-50">
            <tr>
              <th className="py-3 px-4 font-semibold text-left">#</th>
              <th className="py-3 px-4 font-semibold text-left">Photo</th>
              <th className="py-3 px-4 font-semibold text-left">Student ID</th>
              <th className="py-3 px-4 font-semibold text-left">Surname</th>
              <th className="py-3 px-4 font-semibold text-left">First Name</th>
              <th className="py-3 px-4 font-semibold text-left">Class</th>
              <th className="py-3 px-4 font-semibold text-left">Status</th>
              <th className="py-3 px-4 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredStudents.map((student, idx) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.02 }}
                  className="border-b hover:bg-blue-50/60 transition-colors"
                >
                  <td className="py-2 px-4 font-bold text-gray-500">{idx + 1}</td>
                  <td className="py-2 px-4">
                    <img src={student.profilePic || defaultAvatars[0]} alt="Profile" className="w-10 h-10 rounded-full object-cover border shadow" />
                  </td>
                  <td className="py-2 px-4 font-mono">{student.id}</td>
                  <td className="py-2 px-4">{student.surname}</td>
                  <td className="py-2 px-4">{student.firstName}</td>
                  <td className="py-2 px-4">{student.currentAcademicClass}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${student.academicStatus === 'Active' ? 'bg-green-100 text-green-700' : student.academicStatus === 'Graduated' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{student.academicStatus}</span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <motion.button className="btn btn-xs btn-secondary" whileHover={{ scale: 1.1 }} onClick={() => openEditModal(student, idx)}>Edit</motion.button>
                    <motion.button className="btn btn-xs btn-error" whileHover={{ scale: 1.1 }} onClick={() => confirmDelete(idx)}>Delete</motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {/* Modal for Add/Edit Student */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">{editing !== null ? 'Edit Student' : 'Add Student'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student ID (read-only, only on edit) */}
              {editing !== null && (
                <div className="col-span-1 md:col-span-2 flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-700">Student ID:</span>
                  <span className="font-mono bg-gray-100 px-3 py-1 rounded text-primary-700 border border-gray-200">{form.id}</span>
                </div>
              )}
              {/* Profile Pic Preview and Upload */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center mb-2">
                {form.profilePic ? (
                  <img src={form.profilePic} alt="Preview" className="w-20 h-20 rounded-full object-cover border mb-2" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2 border">
                    <span className="text-gray-400">No Photo</span>
                  </div>
                )}
                <label className="btn btn-xs btn-secondary cursor-pointer">
                  Choose Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                </label>
              </div>
              {/* Personal Info Section */}
              <div className="col-span-1 md:col-span-2 mt-2 mb-1">
                <h4 className="text-lg font-bold text-primary-700 mb-2 flex items-center gap-2">
                  <span role="img" aria-label="personal">👤</span> Personal Information
                </h4>
                <hr className="mb-2" />
              </div>
              {/* Personal Info Fields */}
              <div>
                <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" className="input" required />
                <span className="text-xs text-gray-500">Student's last name (family name)</span>
              </div>
              <div>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input" required />
                <span className="text-xs text-gray-500">Student's given name</span>
              </div>
              <div>
                <input name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle Name" className="input" />
                <span className="text-xs text-gray-500">Other name (optional)</span>
              </div>
              <div>
                <input name="dob" value={form.dob} onChange={handleChange} type="date" placeholder="Date of Birth" className="input" required />
                <span className="text-xs text-gray-500">Student's date of birth</span>
              </div>
              <div>
                <select name="gender" value={form.gender} onChange={handleChange} className="input"><option value="">Gender</option><option>Male</option><option>Female</option></select>
                <span className="text-xs text-gray-500">Student's gender</span>
              </div>
              <div>
                <select name="category" value={form.category} onChange={handleChange} className="input">{categories.map(c => <option key={c}>{c}</option>)}</select>
                <span className="text-xs text-gray-500">Boarding or day student</span>
              </div>
              <div>
                <select name="religion" value={form.religion} onChange={handleChange} className="input">{religions.map(r => <option key={r}>{r}</option>)}</select>
                <span className="text-xs text-gray-500">Student's religion</span>
              </div>
              <div>
                <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="input">{maritalStatuses.map(m => <option key={m}>{m}</option>)}</select>
                <span className="text-xs text-gray-500">Student's marital status</span>
              </div>
              <div>
                <select name="nationality" value={form.nationality} onChange={handleChange} className="input">{nationalities.map(n => <option key={n}>{n}</option>)}</select>
                <span className="text-xs text-gray-500">Country of citizenship</span>
              </div>
              <div>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
                <span className="text-xs text-gray-500">Home address</span>
              </div>
              <div>
                <select name="state" value={form.state} onChange={handleChange} className="input">{states.map(s => <option key={s}>{s}</option>)}</select>
                <span className="text-xs text-gray-500">State of origin</span>
              </div>
              <div>
                <input name="lga" value={form.lga} onChange={handleChange} placeholder="LGA" className="input" />
                <span className="text-xs text-gray-500">Local Government Area of origin</span>
              </div>
              <div>
                <input name="hometown" value={form.hometown} onChange={handleChange} placeholder="Home Town" className="input" />
                <span className="text-xs text-gray-500">Student's hometown</span>
              </div>
              <div>
                <input name="language" value={form.language} onChange={handleChange} placeholder="Language Spoken" className="input" />
                <span className="text-xs text-gray-500">Language(s) spoken by student</span>
              </div>

              {/* Academic Info Section */}
              <div className="col-span-1 md:col-span-2 mt-4 mb-1">
                <h4 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                  <span role="img" aria-label="academic">🎓</span> Academic Information
                </h4>
                <hr className="mb-2" />
              </div>
              {/* Academic Info Fields with descriptions */}
              <div>
                <select name="currentAcademicLevel" value={form.currentAcademicLevel} onChange={handleChange} className="input">{academicLevels.map(l => <option key={l}>{l}</option>)}</select>
                <span className="text-xs text-gray-500">Current Academic Level</span>
              </div>
              <div>
                <select name="currentAcademicClass" value={form.currentAcademicClass} onChange={handleChange} className="input">{academicClasses.map(c => <option key={c}>{c}</option>)}</select>
                <span className="text-xs text-gray-500">Current Academic Class</span>
              </div>
              <div>
                <select name="admittedSession" value={form.admittedSession} onChange={handleChange} className="input">{sessions.map(s => <option key={s}>{s}</option>)}</select>
                <span className="text-xs text-gray-500">Session student was admitted</span>
              </div>
              <div>
                <select name="admittedPeriod" value={form.admittedPeriod} onChange={handleChange} className="input">{admissionPeriods.map(p => <option key={p}>{p}</option>)}</select>
                <span className="text-xs text-gray-500">Term/period student was admitted</span>
              </div>
              <div>
                <select name="admittedLevel" value={form.admittedLevel} onChange={handleChange} className="input">{academicLevels.map(l => <option key={l}>{l}</option>)}</select>
                <span className="text-xs text-gray-500">Academic Level student was admitted into</span>
              </div>
              <div>
                <select name="admittedClass" value={form.admittedClass} onChange={handleChange} className="input">{academicClasses.map(c => <option key={c}>{c}</option>)}</select>
                <span className="text-xs text-gray-500">Academic Class student was admitted into</span>
              </div>
              <div>
                <select name="academicStatus" value={form.academicStatus} onChange={handleChange} className="input">{academicStatuses.map(a => <option key={a}>{a}</option>)}</select>
                <span className="text-xs text-gray-500">Current status</span>
              </div>
              <div>
                <input name="admissionDate" value={form.admissionDate} onChange={handleChange} type="date" className="input" readOnly />
                <span className="text-xs text-gray-500">Date of admission</span>
              </div>

              {/* Medical Info Section */}
              <div className="col-span-1 md:col-span-2 mt-4 mb-1">
                <h4 className="text-lg font-bold text-green-700 mb-2 flex items-center gap-2">
                  <span role="img" aria-label="medical">🩺</span> Medical Information
                </h4>
                <hr className="mb-2" />
              </div>
              {/* Medical Info Fields with descriptions */}
              <div>
                <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="input">{bloodGroups.map(bg => <option key={bg}>{bg}</option>)}</select>
                <span className="text-xs text-gray-500">Student's blood group</span>
              </div>
              <div>
                <select name="genotype" value={form.genotype} onChange={handleChange} className="input">{genotypes.map(g => <option key={g}>{g}</option>)}</select>
                <span className="text-xs text-gray-500">Student's genotype</span>
              </div>
              <div>
                <input name="disabilities" value={form.disabilities} onChange={handleChange} placeholder="Disabilities" className="input" />
                <span className="text-xs text-gray-500">Any disabilities (if none, leave blank)</span>
              </div>
              <div>
                <input name="disabilityDescription" value={form.disabilityDescription} onChange={handleChange} placeholder="Disability Description (Say nil if none)" className="input" />
                <span className="text-xs text-gray-500">Describe disability or enter 'nil' if none</span>
              </div>

              {/* Sponsors */}
              <div className="col-span-1 md:col-span-2 font-semibold text-lg mt-4 mb-2">Sponsor(s)</div>
              <div className="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded mb-2">
                <form onSubmit={addSponsor} className="flex flex-wrap gap-2 items-end">
                  <input name="name" value={sponsorForm.name} onChange={handleSponsorChange} placeholder="Name" className="input" required />
                  <span className="text-xs text-gray-500">Sponsor's full name</span>
                  <input name="relationship" value={sponsorForm.relationship} onChange={handleSponsorChange} placeholder="Relationship" className="input" />
                  <span className="text-xs text-gray-500">Relationship to student (e.g. Parent, Guardian)</span>
                  <input name="photo" type="file" className="input" onChange={e => setSponsorForm({ ...sponsorForm, photo: e.target.files[0] })} required />
                  <span className="text-xs text-gray-500">Upload sponsor's photo</span>
                  <input name="phone" value={sponsorForm.phone} onChange={handleSponsorChange} placeholder="Phone" className="input" />
                  <input name="email" value={sponsorForm.email} onChange={handleSponsorChange} placeholder="Email" className="input" />
                  <input name="address" value={sponsorForm.address} onChange={handleSponsorChange} placeholder="Address" className="input" />
                  <input name="occupation" value={sponsorForm.occupation} onChange={handleSponsorChange} placeholder="Occupation" className="input" />
                  <button type="submit" className="btn btn-xs btn-primary block">Add Sponsor</button>
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
      {/* Promotion/Demotion UI and logic removed. Now handled in Result Management. */}
    </motion.div>
  );
}
