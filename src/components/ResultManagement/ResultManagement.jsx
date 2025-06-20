import React, { useState } from 'react';
import { FaDownload, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Use 30 real-like mock student names (from student management)
const realStudentNames = [
  'John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis', 'David Brown', 'Sarah Wilson',
  'Daniel Miller', 'Jessica Taylor', 'Matthew Anderson', 'Ashley Thomas',
  'Joshua Jackson', 'Amanda White', 'Christopher Harris', 'Brittany Martin', 'Andrew Thompson',
  'Megan Garcia', 'Ryan Martinez', 'Lauren Robinson', 'Brandon Clark', 'Samantha Rodriguez',
  'Tyler Lewis', 'Rachel Lee', 'Nicholas Walker', 'Hannah Hall', 'Zachary Allen',
  'Olivia Young', 'Jacob King', 'Alyssa Wright', 'Ethan Scott', 'Madison Green',
];

const academicLevels = ['JSS1', 'JSS2', 'JSS3'];
const academicClasses = [
  'Art Class', 'Commercial Class', 'General Class', 'Science Class', 'Technology Class',
];
const studentCategories = ['Boarding student', 'Day student'];

// Generate 30 students per level/class/category, cycling through names
const generateMockStudents = () => {
  const students = [];
  let id = 1;
  academicLevels.forEach(level => {
    academicClasses.forEach(cls => {
      studentCategories.forEach(cat => {
        for (let i = 0; i < 30; i++) {
          students.push({
            id: id++,
            name: realStudentNames[i % realStudentNames.length] + ` ${level} ${cls} ${cat}`,
            age: 12 + (i % 6),
            academicLevel: level,
            academicClass: cls,
            category: cat,
            numberInClass: 30,
            house: ['Red', 'Blue', 'Green', 'Yellow'][i % 4],
            session: '2024/2025',
            term: 'First Term',
            subjects: ['Mathematics', 'English', 'Basic Science'],
          });
        }
      });
    });
  });
  return students;
};
const mockStudents = generateMockStudents();

// Example mock subjects
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
  const [selectedAcademicLevel, setSelectedAcademicLevel] = useState('');
  const [selectedAcademicClass, setSelectedAcademicClass] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSession, setSelectedSession] = useState(sessions[0]);
  const [viewResult, setViewResult] = useState(null); // {student, term, session}

  // Filter classes and categories for selected academic level
  const availableClasses = academicClasses;
  const availableCategories = studentCategories;

  // Filter students for selected academic level/class/category
  const studentsInSelection = mockStudents.filter(
    s =>
      (!selectedAcademicLevel || s.academicLevel === selectedAcademicLevel) &&
      (!selectedAcademicClass || s.academicClass === selectedAcademicClass) &&
      (!selectedCategory || s.category === selectedCategory)
  );
  // Terms for selected session
  const termsForSession = mockAcademicCalendar[selectedSession] || [];

  // Helper: for a student, does result exist for term/session?
  const hasResult = (studentName, term) =>
    results.some(r => r.studentName === studentName && r.session === selectedSession && r.term === term);

  // Helper: get result for modal view
  const getResult = (studentName, term) =>
    results.find(r => r.studentName === studentName && r.session === selectedSession && r.term === term);

  // Filter students for dropdown: search + exclude those with result for session/term
  const filteredStudents = mockStudents.filter(s => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.academicLevel && s.academicLevel.toLowerCase().includes(search.toLowerCase()));
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
        academicLevel: student.academicLevel,
        academicClass: student.academicClass,
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
        academicLevel: '',
        academicClass: '',
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
      {/* Step 1: Academic Level Selection */}
      <div className="mb-6">
        <div className="font-semibold mb-2">Select Academic Level</div>
        <div className="flex gap-2 flex-wrap">
          {academicLevels.map(level => (
            <button
              key={level}
              className={`btn ${selectedAcademicLevel === level ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => {
                setSelectedAcademicLevel(level);
                setSelectedAcademicClass('');
                setSelectedCategory('');
              }}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      {/* Step 2: Academic Class Selection */}
      {selectedAcademicLevel && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Select Academic Class</div>
          <div className="flex gap-2 flex-wrap">
            {availableClasses.map(cls => (
              <button
                key={cls}
                className={`btn ${selectedAcademicClass === cls ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => {
                  setSelectedAcademicClass(cls);
                  setSelectedCategory('');
                }}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Step 3: Student Category Selection */}
      {selectedAcademicLevel && selectedAcademicClass && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Select Student Category</div>
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
      {/* Step 4: Session Selection */}
      {selectedAcademicLevel && selectedAcademicClass && selectedCategory && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Select Session</div>
          <select className="input" value={selectedSession} onChange={e => setSelectedSession(e.target.value)}>
            {sessions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      )}
      {/* Step 5: Student List with Term Status */}
      {selectedAcademicLevel && selectedAcademicClass && selectedCategory && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Students in {selectedAcademicLevel} - {selectedAcademicClass} - {selectedCategory}</div>
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
                {studentsInSelection.map(student => (
                  <tr key={student.id} className="border-b">
                    <td className="px-4 py-2 font-semibold">{student.name}</td>
                    {termsForSession.map(term => (
                      <td key={term} className="px-4 py-2 text-center">
                        {hasResult(student.name, term) ? (
                          <button
                            className="btn btn-xs btn-outline text-green-700 border-green-400"
                            onClick={() => setViewResult({ student, term, session: selectedSession })}
                          >
                            View
                          </button>
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
                            Upload
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
      {/* Modal for viewing result status */}
      {viewResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => setViewResult(null)}>&times;</button>
            <h3 className="text-lg font-bold mb-4">Result Status</h3>
            <div className="mb-2 font-semibold">{viewResult.student.name} - {viewResult.term} ({viewResult.session})</div>
            {getResult(viewResult.student.name, viewResult.term) ? (
              <div className="text-green-700 font-bold">Result Uploaded</div>
            ) : (
              <div className="text-red-600 font-bold">No Result Uploaded</div>
            )}
            <div className="flex justify-end mt-4">
              <button className="btn" onClick={() => setViewResult(null)}>Close</button>
            </div>
          </motion.div>
        </motion.div>
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
                  <option key={s.id} value={s.id}>{s.name} ({s.academicLevel})</option>
                ))}
                {search && filteredStudents.length === 0 && (
                  <option disabled>No students found or all have results for this term/session</option>
                )}
              </select>
              <input className="input" name="studentName" placeholder="Student Name" value={form.studentName} readOnly />
              <input className="input" name="age" placeholder="Age" type="number" value={form.age} readOnly />
              <input className="input" name="numberInClass" placeholder="Number in Class" type="number" value={form.numberInClass} readOnly />
              <input className="input" name="house" placeholder="House" value={form.house} readOnly />
              <input className="input" name="academicLevel" placeholder="Academic Level" value={form.academicLevel || ''} readOnly />
              <input className="input" name="academicClass" placeholder="Academic Class" value={form.academicClass || ''} readOnly />
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
    </motion.div>
  );
}
