import React, { useState } from 'react';
import { FaDownload, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Mock student, class, and subject data
const mockStudents = [
  {
    id: 1,
    name: 'John Doe',
    age: 13,
    classLevel: 'JSS1',
    category: 'Junior',
    numberInClass: 25,
    house: 'Red',
    session: '2024/2025',
    term: 'First Term',
    subjects: ['Mathematics', 'English', 'Basic Science'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 14,
    classLevel: 'JSS2',
    category: 'Junior',
    numberInClass: 28,
    house: 'Blue',
    session: '2024/2025',
    term: 'First Term',
    subjects: ['Mathematics', 'English', 'Social Studies'],
  },
];
const mockSubjects = {
  JSS1: ['Mathematics', 'English', 'Basic Science'],
  JSS2: ['Mathematics', 'English', 'Social Studies'],
};

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

// Mock class levels, categories, and academic calendar terms
const mockClassLevels = ['JSS1', 'JSS2', 'JSS3'];
const mockCategories = {
  JSS1: ['Junior'],
  JSS2: ['Junior'],
  JSS3: ['Junior'],
};
const mockAcademicCalendar = {
  '2024/2025': ['First Term', 'Second Term', 'Third Term'],
  '2025/2026': ['First Term', 'Second Term', 'Third Term'],
};

export default function ResultManagement() {
  const [results, setResults] = useState(initialResults);
  const [filter, setFilter] = useState({ session: '', term: '' });
  const [showModal, setShowModal] = useState(false);
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
    session: '',
    term: '',
    subjects: [
      { name: '', assessments: ['', '', '', ''], exam: '', termAverage: '', summary: '', grade: '', remark: '', teacherInitial: '' },
    ],
    scratchCardValidated: false,
  });
  const [formError, setFormError] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [search, setSearch] = useState('');
  const [selectedClassLevel, setSelectedClassLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSession, setSelectedSession] = useState(sessions[0]);

  // Filter categories for selected class level
  const availableCategories = selectedClassLevel ? mockCategories[selectedClassLevel] : [];
  // Filter students for selected class level/category
  const studentsInCategory = mockStudents.filter(
    s => s.classLevel === selectedClassLevel && s.category === selectedCategory
  );
  // Terms for selected session
  const termsForSession = mockAcademicCalendar[selectedSession] || [];

  // Helper: for a student, does result exist for term/session?
  const hasResult = (studentName, term) =>
    results.some(r => r.studentName === studentName && r.session === selectedSession && r.term === term);

  // Filter students for dropdown: search + exclude those with result for session/term
  const filteredStudents = mockStudents.filter(s => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.classLevel && s.classLevel.toLowerCase().includes(search.toLowerCase()));
    const alreadyHasResult =
      form.session && form.term && studentsWithResult.includes(s.name);
    return matchesSearch && !alreadyHasResult;
  });

  const filteredResults = results.filter(r =>
    (!filter.session || r.session === filter.session) &&
    (!filter.term || r.term === filter.term)
  );

  const handleDownloadPDF = () => {
    alert('Download as PDF (to be implemented)');
  };

  const handleAddResult = () => {
    setSelectedStudentId('');
    setFormError('');
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubjectChange = (idx, field, value) => {
    setForm(f => {
      const subjects = [...f.subjects];
      if (field.startsWith('assessment')) {
        const aIdx = parseInt(field.replace('assessment', ''));
        subjects[idx].assessments[aIdx] = value;
      } else {
        subjects[idx][field] = value;
      }
      return { ...f, subjects };
    });
  };

  const handleAddSubject = () => {
    setForm(f => ({
      ...f,
      subjects: [
        ...f.subjects,
        { name: '', assessments: ['', '', '', ''], exam: '', termAverage: '', summary: '', grade: '', remark: '', teacherInitial: '' },
      ],
    }));
  };

  const handleRemoveSubject = (idx) => {
    setForm(f => ({
      ...f,
      subjects: f.subjects.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.studentName || !form.session || !form.term) {
      setFormError('Student name, session, and term are required.');
      return;
    }
    setResults(r => [
      ...r,
      {
        ...form,
        id: Date.now(),
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
      },
    ]);
    setShowModal(false);
  };

  // When a student is selected, auto-fill form fields
  React.useEffect(() => {
    if (!showModal) return;
    const student = mockStudents.find(s => s.id === Number(selectedStudentId));
    if (student) {
      setForm(f => ({
        ...f,
        studentName: student.name,
        age: student.age,
        numberInClass: student.numberInClass,
        house: student.house,
        session: student.session,
        term: student.term,
        classLevel: student.classLevel,
        category: student.category,
        subjects: student.subjects.map(subj => ({
          name: subj,
          assessments: ['', '', '', ''],
          exam: '',
          termAverage: '',
          summary: '',
          grade: '',
          remark: '',
          teacherInitial: '',
        })),
      }));
    } else {
      setForm(f => ({
        ...f,
        studentName: '',
        age: '',
        numberInClass: '',
        house: '',
        session: '',
        term: '',
        classLevel: '',
        category: '',
        subjects: [
          { name: '', assessments: ['', '', '', ''], exam: '', termAverage: '', summary: '', grade: '', remark: '', teacherInitial: '' },
        ],
      }));
    }
  }, [selectedStudentId, showModal]);

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Result Management</h2>
      {/* Step 1: Class Level Selection */}
      <div className="mb-6">
        <div className="font-semibold mb-2">Select Class Level</div>
        <div className="flex gap-2 flex-wrap">
          {mockClassLevels.map(cl => (
            <button
              key={cl}
              className={`btn ${selectedClassLevel === cl ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => {
                setSelectedClassLevel(cl);
                setSelectedCategory('');
              }}
            >
              {cl}
            </button>
          ))}
        </div>
      </div>
      {/* Step 2: Category Selection */}
      {selectedClassLevel && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Select Category</div>
          <div className="flex gap-2 flex-wrap">
            {availableCategories.map(cat => (
              <button
                key={cat}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Step 3: Session Selection */}
      {selectedClassLevel && selectedCategory && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Select Session</div>
          <select className="input" value={selectedSession} onChange={e => setSelectedSession(e.target.value)}>
            {sessions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      )}
      {/* Step 4: Student List with Term Indicators */}
      {selectedClassLevel && selectedCategory && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Students in {selectedClassLevel} - {selectedCategory}</div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Student</th>
                  {termsForSession.map(term => (
                    <th key={term} className="px-4 py-2">{term}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentsInCategory.map(student => (
                  <tr key={student.id} className="border-b">
                    <td className="px-4 py-2 font-semibold">{student.name}</td>
                    {termsForSession.map(term => (
                      <td key={term} className="px-4 py-2 text-center">
                        {hasResult(student.name, term) ? (
                          <span className="inline-flex items-center text-green-600 font-bold">&#10003; Uploaded</span>
                        ) : (
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => {
                              setSelectedStudentId(student.id.toString());
                              setFormError('');
                              setShowModal(true);
                              setForm(f => ({ ...f, session: selectedSession, term }));
                            }}
                          >
                            Upload Result
                          </button>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Modal for adding result */}
      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <motion.form initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="text-lg font-bold mb-4">Add Student Result</h3>
            {formError && <div className="text-red-500 mb-2">{formError}</div>}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                className="input col-span-2"
                placeholder="Search student by name or class..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select className="input col-span-2" value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} required>
                <option value="">Select Student</option>
                {filteredStudents.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.classLevel})</option>
                ))}
                {search && filteredStudents.length === 0 && (
                  <option disabled>No students found or all have results for this term/session</option>
                )}
              </select>
              <input className="input" name="studentName" placeholder="Student Name" value={form.studentName} readOnly />
              <input className="input" name="age" placeholder="Age" type="number" value={form.age} readOnly />
              <input className="input" name="numberInClass" placeholder="Number in Class" type="number" value={form.numberInClass} readOnly />
              <input className="input" name="house" placeholder="House" value={form.house} readOnly />
              <input className="input" name="classLevel" placeholder="Class Level" value={form.classLevel || ''} readOnly />
              <input className="input" name="category" placeholder="Category" value={form.category || ''} readOnly />
              <input className="input" name="session" placeholder="Session" value={form.session} readOnly />
              <input className="input" name="term" placeholder="Term" value={form.term} readOnly />
              <input className="input col-span-2" name="resultType" placeholder="Result Type (e.g. JSS1 First Term Terminal Report)" value={form.resultType} onChange={handleFormChange} />
              <label className="flex items-center col-span-2">
                <input type="checkbox" name="scratchCardValidated" checked={form.scratchCardValidated} onChange={handleFormChange} className="mr-2" /> Scratch Card Validated
              </label>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Subjects</div>
              {form.subjects.map((subj, idx) => (
                <div key={idx} className="grid grid-cols-10 gap-2 mb-2 items-center">
                  <input className="input col-span-2" placeholder="Subject Name" value={subj.name} readOnly />
                  {[0,1,2,3].map(aIdx => (
                    <input key={aIdx} className="input" placeholder={`${aIdx+1}st`} type="number" value={subj.assessments[aIdx]} onChange={e => handleSubjectChange(idx, `assessment${aIdx}`, e.target.value)} />
                  ))}
                  <input className="input" placeholder="Exam" type="number" value={subj.exam} onChange={e => handleSubjectChange(idx, 'exam', e.target.value)} />
                  <input className="input" placeholder="Term Avg" type="number" value={subj.termAverage} onChange={e => handleSubjectChange(idx, 'termAverage', e.target.value)} />
                  <input className="input" placeholder="Grade" value={subj.grade} onChange={e => handleSubjectChange(idx, 'grade', e.target.value)} />
                  <input className="input" placeholder="Remark" value={subj.remark} onChange={e => handleSubjectChange(idx, 'remark', e.target.value)} />
                  <input className="input" placeholder="Teacher" value={subj.teacherInitial} onChange={e => handleSubjectChange(idx, 'teacherInitial', e.target.value)} />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Result</button>
            </div>
          </motion.form>
        </motion.div>
      )}
      <AnimatePresence>
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
      </AnimatePresence>
    </motion.div>
  );
}
