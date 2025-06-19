import React, { useState } from 'react';

const initialStudents = [];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genotypes = ['AA', 'AS', 'SS', 'SC', 'Others'];
const categories = ['Boarding', 'Day'];
const academicStatuses = ['Active', 'Expelled', 'Graduated'];

function generateStudentId(schoolCode, count) {
  return `${schoolCode}-STU-${String(count + 1).padStart(4, '0')}`;
}

export default function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState({
    passport: '',
    fullName: '',
    dob: '',
    gender: '',
    religion: '',
    address: '',
    nationality: '',
    lga: '',
    hometown: '',
    category: categories[0],
    classLevel: '',
    language: '',
    maritalStatus: '',
    admittedSession: '',
    admittedTerm: '',
    admittedClass: '',
    academicStatus: academicStatuses[0],
    admissionDate: new Date().toISOString().slice(0, 10),
    bloodGroup: bloodGroups[0],
    genotype: genotypes[0],
    disabilities: '',
    sponsors: [],
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

  const handleSubmit = e => {
    e.preventDefault();
    const newStudent = {
      ...form,
      id: generateStudentId(schoolCode, students.length),
    };
    setStudents([...students, newStudent]);
    setForm({
      passport: '', fullName: '', dob: '', gender: '', religion: '', address: '', nationality: '', lga: '', hometown: '',
      category: categories[0], classLevel: '', language: '', maritalStatus: '', admittedSession: '', admittedTerm: '', admittedClass: '',
      academicStatus: academicStatuses[0], admissionDate: new Date().toISOString().slice(0, 10), bloodGroup: bloodGroups[0], genotype: genotypes[0], disabilities: '', sponsors: [],
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Student Management</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal */}
        <div className="col-span-1 md:col-span-2 font-semibold text-lg mb-2">Personal Information</div>
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="input" required />
        <input name="dob" value={form.dob} onChange={handleChange} type="date" placeholder="Date of Birth" className="input" required />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="input" required />
        <input name="religion" value={form.religion} onChange={handleChange} placeholder="Religion" className="input" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
        <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Nationality" className="input" />
        <input name="lga" value={form.lga} onChange={handleChange} placeholder="LGA" className="input" />
        <input name="hometown" value={form.hometown} onChange={handleChange} placeholder="Hometown" className="input" />
        <select name="category" value={form.category} onChange={handleChange} className="input">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <input name="classLevel" value={form.classLevel} onChange={handleChange} placeholder="Class/Level" className="input" />
        <input name="language" value={form.language} onChange={handleChange} placeholder="Language Spoken" className="input" />
        <input name="maritalStatus" value={form.maritalStatus} onChange={handleChange} placeholder="Marital Status" className="input" />
        {/* Passport upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1">Passport Photo</label>
          <input name="passport" type="file" className="input" onChange={e => setForm({ ...form, passport: e.target.files[0] })} />
        </div>
        {/* Academic */}
        <div className="col-span-1 md:col-span-2 font-semibold text-lg mt-4 mb-2">Academic Information</div>
        <input name="admittedSession" value={form.admittedSession} onChange={handleChange} placeholder="Admitted Session" className="input" />
        <input name="admittedTerm" value={form.admittedTerm} onChange={handleChange} placeholder="Admitted Term" className="input" />
        <input name="admittedClass" value={form.admittedClass} onChange={handleChange} placeholder="Admitted Class/Level" className="input" />
        <select name="academicStatus" value={form.academicStatus} onChange={handleChange} className="input">
          {academicStatuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <input name="admissionDate" value={form.admissionDate} onChange={handleChange} type="date" className="input" readOnly />
        {/* Medical */}
        <div className="col-span-1 md:col-span-2 font-semibold text-lg mt-4 mb-2">Medical Information</div>
        <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="input">
          {bloodGroups.map(bg => <option key={bg}>{bg}</option>)}
        </select>
        <select name="genotype" value={form.genotype} onChange={handleChange} className="input">
          {genotypes.map(g => <option key={g}>{g}</option>)}
        </select>
        <input name="disabilities" value={form.disabilities} onChange={handleChange} placeholder="Disabilities" className="input" />
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
        <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">Add Student</button>
      </form>
      {/* Students Table */}
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4">Student ID</th>
            <th className="py-2 px-4">Full Name</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Class</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="border-t">
              <td className="py-2 px-4">{student.id}</td>
              <td className="py-2 px-4">{student.fullName}</td>
              <td className="py-2 px-4">{student.gender}</td>
              <td className="py-2 px-4">{student.category}</td>
              <td className="py-2 px-4">{student.classLevel}</td>
              <td className="py-2 px-4">{student.academicStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
