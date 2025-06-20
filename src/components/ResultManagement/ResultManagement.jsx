import React, { useState } from 'react';
import { FaDownload, FaPlus, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const initialResults = [
  {
    id: 1,
    studentName: 'John Doe',
    age: 13,
    numberInClass: 25,
    house: 'Red',
    overallAverage: 78.5,
    position: 3,
    resumptionDate: '2025-09-10',
    vacationDate: '2025-07-20',
    resultType: 'JSS1 First Term Terminal Report [2024/2025]',
    session: '2024/2025',
    term: 'First Term',
    subjects: [
      {
        name: 'Mathematics',
        assessments: [15, 16, 14, 15],
        exam: 30,
        termAverage: 90,
        summary: 'Algebra, Geometry',
        grade: 'A',
        remark: 'Excellent',
        teacherInitial: 'MJ',
      },
      {
        name: 'English',
        assessments: [14, 15, 13, 14],
        exam: 28,
        termAverage: 84,
        summary: 'Grammar, Comprehension',
        grade: 'B',
        remark: 'Very Good',
        teacherInitial: 'JJ',
      },
    ],
    scratchCardValidated: true,
  },
];

const terms = ['First Term', 'Second Term', 'Third Term'];
const sessions = ['2024/2025', '2025/2026'];

export default function ResultManagement() {
  const [results, setResults] = useState(initialResults);
  const [filter, setFilter] = useState({ session: '', term: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null); // null for add, index for edit
  const [form, setForm] = useState({
    studentName: '',
    age: '',
    numberInClass: '',
    house: '',
    overallAverage: '',
    position: '',
    resumptionDate: '',
    vacationDate: '',
    resultType: '',
    session: sessions[0],
    term: terms[0],
    subjects: [
      { name: '', assessments: ['', '', '', ''], exam: '', termAverage: '', summary: '', grade: '', remark: '', teacherInitial: '' },
    ],
    scratchCardValidated: false,
  });

  const filteredResults = results.filter(r =>
    (!filter.session || r.session === filter.session) &&
    (!filter.term || r.term === filter.term)
  );

  const handleDownloadPDF = () => {
    alert('Download as PDF (to be implemented)');
  };

  const openAddModal = () => {
    setEditIdx(null);
    setForm({
      studentName: '',
      age: '',
      numberInClass: '',
      house: '',
      overallAverage: '',
      position: '',
      resumptionDate: '',
      vacationDate: '',
      resultType: '',
      session: sessions[0],
      term: terms[0],
      subjects: [
        { name: '', assessments: ['', '', '', ''], exam: '', termAverage: '', summary: '', grade: '', remark: '', teacherInitial: '' },
      ],
      scratchCardValidated: false,
    });
    setModalOpen(true);
  };

  const openEditModal = idx => {
    setEditIdx(idx);
    setForm({ ...results[idx], subjects: results[idx].subjects.map(s => ({ ...s, assessments: s.assessments.map(a => a.toString()) })) });
    setModalOpen(true);
  };

  const handleFormChange = (e, subjIdx, assessIdx) => {
    const { name, value, type, checked } = e.target;
    if (subjIdx !== undefined) {
      setForm(f => {
        const subjects = [...f.subjects];
        if (assessIdx !== undefined) {
          subjects[subjIdx].assessments[assessIdx] = value;
        } else {
          subjects[subjIdx][name] = value;
        }
        return { ...f, subjects };
      });
    } else {
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const addSubjectRow = () => {
    setForm(f => ({ ...f, subjects: [...f.subjects, { name: '', assessments: ['', '', '', ''], exam: '', termAverage: '', summary: '', grade: '', remark: '', teacherInitial: '' }] }));
  };

  const removeSubjectRow = idx => {
    setForm(f => ({ ...f, subjects: f.subjects.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newResult = {
      ...form,
      age: Number(form.age),
      numberInClass: Number(form.numberInClass),
      overallAverage: Number(form.overallAverage),
      position: Number(form.position),
      subjects: form.subjects.map(s => ({
        ...s,
        assessments: s.assessments.map(a => Number(a)),
        exam: Number(s.exam),
        termAverage: Number(s.termAverage),
      })),
    };
    if (editIdx === null) {
      setResults(r => [...r, { ...newResult, id: Date.now() }]);
    } else {
      setResults(r => r.map((res, i) => i === editIdx ? { ...newResult, id: res.id } : res));
    }
    setModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Result Management</h2>
      <div className="flex gap-4 mb-6 bg-white rounded-lg shadow p-4">
        <select className="input" value={filter.session} onChange={e => setFilter(f => ({ ...f, session: e.target.value }))}>
          <option value="">All Sessions</option>
          {sessions.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="input" value={filter.term} onChange={e => setFilter(f => ({ ...f, term: e.target.value }))}>
          <option value="">All Terms</option>
          {terms.map(t => <option key={t}>{t}</option>)}
        </select>
        <button className="btn btn-primary ml-auto flex items-center" onClick={openAddModal}><FaPlus className="mr-2" />Add Result</button>
        <button className="btn btn-primary" onClick={handleDownloadPDF}><FaDownload className="mr-2" />Download PDF</button>
      </div>
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setModalOpen(false)}>&times;</button>
              <h3 className="text-lg font-bold mb-4">{editIdx === null ? 'Add Result' : 'Edit Result'}</h3>
              <form onSubmit={handleSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <input className="input" name="studentName" value={form.studentName} onChange={handleFormChange} placeholder="Student Name" required />
                  <input className="input" name="age" value={form.age} onChange={handleFormChange} placeholder="Age" type="number" required />
                  <input className="input" name="numberInClass" value={form.numberInClass} onChange={handleFormChange} placeholder="Number in Class" type="number" required />
                  <input className="input" name="house" value={form.house} onChange={handleFormChange} placeholder="House" />
                  <input className="input" name="overallAverage" value={form.overallAverage} onChange={handleFormChange} placeholder="Overall Average" type="number" />
                  <input className="input" name="position" value={form.position} onChange={handleFormChange} placeholder="Position" type="number" />
                  <input className="input" name="resumptionDate" value={form.resumptionDate} onChange={handleFormChange} placeholder="Resumption Date" type="date" />
                  <input className="input" name="vacationDate" value={form.vacationDate} onChange={handleFormChange} placeholder="Vacation Date" type="date" />
                  <input className="input col-span-2" name="resultType" value={form.resultType} onChange={handleFormChange} placeholder="Result Type (e.g. JSS1 First Term Terminal Report)" />
                  <select className="input" name="session" value={form.session} onChange={handleFormChange} required>
                    {sessions.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <select className="input" name="term" value={form.term} onChange={handleFormChange} required>
                    {terms.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <label className="flex items-center gap-2 col-span-2">
                    <input type="checkbox" name="scratchCardValidated" checked={form.scratchCardValidated} onChange={handleFormChange} /> Scratch Card Validated
                  </label>
                </div>
                <div>
                  <div className="font-semibold mb-2">Subjects</div>
                  {form.subjects.map((subj, subjIdx) => (
                    <div key={subjIdx} className="grid grid-cols-10 gap-2 mb-2 items-center">
                      <input className="input col-span-2" placeholder="Subject Name" name="name" value={subj.name} onChange={e => handleFormChange(e, subjIdx)} required />
                      {subj.assessments.map((a, assessIdx) => (
                        <input key={assessIdx} className="input col-span-1" placeholder={`A${assessIdx+1}`} value={a} onChange={e => handleFormChange(e, subjIdx, assessIdx)} type="number" />
                      ))}
                      <input className="input col-span-1" placeholder="Exam" name="exam" value={subj.exam} onChange={e => handleFormChange(e, subjIdx)} type="number" />
                      <input className="input col-span-1" placeholder="Term Avg" name="termAverage" value={subj.termAverage} onChange={e => handleFormChange(e, subjIdx)} type="number" />
                      <input className="input col-span-1" placeholder="Summary" name="summary" value={subj.summary} onChange={e => handleFormChange(e, subjIdx)} />
                      <input className="input col-span-1" placeholder="Grade" name="grade" value={subj.grade} onChange={e => handleFormChange(e, subjIdx)} />
                      <input className="input col-span-1" placeholder="Remark" name="remark" value={subj.remark} onChange={e => handleFormChange(e, subjIdx)} />
                      <input className="input col-span-1" placeholder="Teacher" name="teacherInitial" value={subj.teacherInitial} onChange={e => handleFormChange(e, subjIdx)} />
                      <button type="button" className="text-red-500 ml-1" onClick={() => removeSubjectRow(subjIdx)} disabled={form.subjects.length === 1}>×</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-sm btn-secondary mt-1" onClick={addSubjectRow}>+ Add Subject</button>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editIdx === null ? 'Add Result' : 'Save Changes'}</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {filteredResults.map((result, idx) => (
        <motion.div key={result.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} className="bg-white rounded shadow mb-8 p-6">
          {/* Header */}
          <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <div className="font-bold text-lg">{result.studentName}</div>
              <div className="text-sm text-gray-500">Age: {result.age} | No in Class: {result.numberInClass} | House: {result.house} | Position: {result.position}</div>
              <div className="text-sm text-gray-500">Session: {result.session} | Term: {result.term} | Average: {result.overallAverage}</div>
              <div className="text-sm text-gray-500">Resumption: {result.resumptionDate} | Vacation: {result.vacationDate}</div>
            </div>
            <div className="text-right flex flex-col gap-2 items-end">
              <div className="font-semibold text-primary-700">{result.resultType}</div>
              <button className="btn btn-xs btn-outline flex items-center gap-1" onClick={() => openEditModal(idx)}><FaEdit />Edit</button>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">1st</th>
                  <th className="px-4 py-2">2nd</th>
                  <th className="px-4 py-2">3rd</th>
                  <th className="px-4 py-2">4th</th>
                  <th className="px-4 py-2">Exam</th>
                  <th className="px-4 py-2">Term Avg</th>
                  <th className="px-4 py-2">Summary</th>
                  <th className="px-4 py-2">Grade</th>
                  <th className="px-4 py-2">Remark</th>
                  <th className="px-4 py-2">Teacher</th>
                </tr>
              </thead>
              <tbody>
                {result.subjects.map((subj, i) => (
                  <tr key={subj.name} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-semibold">{subj.name}</td>
                    {subj.assessments.map((a, j) => <td className="px-2 py-2" key={j}>{a}</td>)}
                    <td className="px-2 py-2">{subj.exam}</td>
                    <td className="px-2 py-2">{subj.termAverage}</td>
                    <td className="px-2 py-2">{subj.summary}</td>
                    <td className="px-2 py-2">{subj.grade}</td>
                    <td className="px-2 py-2">{subj.remark}</td>
                    <td className="px-2 py-2">{subj.teacherInitial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Access Mode Info */}
          <div className="mt-4 text-xs text-gray-500">
            Access Mode: {result.scratchCardValidated ? 'Scratch Card' : 'Auto/Subscription'}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
