import React, { useState } from 'react';
import { FaDownload, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

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
          // Format: SCH001-STU-0001
          const studentId = `SCH001-STU-${id.toString().padStart(4, '0')}`;
          students.push({
            id: id++,
            studentId,
            name: realStudentNames[i % realStudentNames.length],
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
        name: 'English Language',
        assessments: [14, 15, 13, 14],
        exam: 28,
        termAverage: 84,
        summary: 'Grammar, Comprehension',
        grade: 'B',
        remark: 'Very Good',
        teacherInitial: 'JJ',
      },
      {
        name: 'English Language',
        assessments: [14, 15, 13, 14],
        exam: 28,
        termAverage: 84,
        summary: 'Grammar, Comprehension',
        grade: 'B',
        remark: 'Very Good',
        teacherInitial: 'JJ',
      },
      {
        name: 'English Language',
        assessments: [14, 15, 13, 14],
        exam: 28,
        termAverage: 84,
        summary: 'Grammar, Comprehension',
        grade: 'B',
        remark: 'Very Good',
        teacherInitial: 'JJ',
      },
      {
        name: 'English Language',
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

// --- Assessment Count Handling ---
// When saving a result, always store the assessment count used for that class/level at the time of entry.
// When displaying or editing a result, use the stored count (result.assessmentCount) to render assessment fields.
// This ensures old results are not affected by later changes to assessment config.

export default function ResultManagement() {
  // Use optional chaining to avoid TypeError if state.school is undefined
  const assessmentMap = useSelector(state => state.school?.assessmentMap) || {
    'JSS1-Art Class': 4,
    'JSS1-Science Class': 3,
    // ...other combinations
  };

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

  // --- Promotion Modal State ---
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionStudent, setPromotionStudent] = useState(null);
  const [singlePromotion, setSinglePromotion] = useState({ action: 'Promote', newLevel: '', newClass: '' });
  const [promotionWarning, setPromotionWarning] = useState('');
  const [promotionError, setPromotionError] = useState(''); // NEW: for blocking errors

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

  // Helper: students who already have results for the selected session/term (for filtering dropdown)
  const studentsWithResult = results
    .filter(r => r.session === form.session && r.term === form.term)
    .map(r => r.studentName);

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
    // Determine assessment count for this class/level
    const key = `${form.academicLevel}-${form.academicClass}`;
    const assessmentCount = assessmentMap[key] || 4;
    setResults(r => [
      ...r,
      {
        ...form,
        id: Date.now(),
        age: Number(form.age),
        numberInClass: Number(form.numberInClass),
        overallAverage: Number(form.overallAverage),
        position: Number(form.position),
        assessmentCount, // <-- store assessment count used
        subjects: form.subjects.map(s => ({
          ...s,
          assessments: s.assessments.slice(0, assessmentCount).map(a => Number(a)),
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

  // Helper: Academic levels/classes for dropdowns
  const academicLevelOptions = academicLevels.map(level => ({ value: level, label: level }));
  const academicClassOptions = academicClasses.map(cls => ({ value: cls, label: cls }));

  // --- Promotion Modal Handlers ---
  const openPromotionModal = (student) => {
    setPromotionStudent(student);
    setSinglePromotion({
      action: 'Promote',
      newLevel: student.academicLevel,
      newClass: student.academicClass,
    });
    setShowPromotionModal(true);
    setPromotionWarning('');
  };

  // Helper to check for mismatch between action and new level
  const getPromotionWarning = (action, oldLevel, newLevel) => {
    if (!action || !oldLevel || !newLevel) return '';
    const levelOrder = academicLevels;
    const oldIdx = levelOrder.indexOf(oldLevel);
    const newIdx = levelOrder.indexOf(newLevel);
    if (action === 'Promote' && newIdx <= oldIdx) return 'Warning: You selected "Promote" but chose a same or lower level.';
    if (action === 'Demote' && newIdx >= oldIdx) return 'Warning: You selected "Demote" but chose a same or higher level.';
    if (action === 'Retain' && newIdx !== oldIdx) return 'Warning: You selected "Retain" but chose a different level.';
    return '';
  };

  // Helper: check if all results for all terms in the session are completed for a student
  const allResultsCompleted = (student) => {
    const termsForSession = mockAcademicCalendar[selectedSession] || [];
    return termsForSession.every(term => hasResult(student.name, term));
  };

  // NEW: Validate promotion/demotion/retention/graduation
  const validatePromotion = (student, action, newLevel, newClass) => {
    // 1. Block if results for all terms in session are not completed
    if (!allResultsCompleted(student)) {
      return 'Cannot proceed: All results for this session must be completed before promotion/demotion/retention.';
    }
    // 2. Block if academic history already has entry for this session
    if (hasSessionHistory(student)) {
      return 'Cannot proceed: This student already has a promotion/retention record for this session.';
    }
    // 3. Graduation only from final level
    if (action === 'Graduate' && student.academicLevel !== finalLevel) {
      return `Cannot graduate: Only students in the final level (${finalLevel}) can graduate.`;
    }
    // 4. Retention only if level/class unchanged
    if (action === 'Retain' && (student.academicLevel !== newLevel || student.academicClass !== newClass)) {
      return 'Cannot retain: Retention requires the same level and class.';
    }
    // 5. Promotion must be to a higher level
    if (action === 'Promote') {
      const oldIdx = academicLevels.indexOf(student.academicLevel);
      const newIdx = academicLevels.indexOf(newLevel);
      if (newIdx <= oldIdx) {
        return 'Cannot promote: New level must be higher than current.';
      }
    }
    // 6. Demotion must be to a lower level
    if (action === 'Demote') {
      const oldIdx = academicLevels.indexOf(student.academicLevel);
      const newIdx = academicLevels.indexOf(newLevel);
      if (newIdx >= oldIdx) {
        return 'Cannot demote: New level must be lower than current.';
      }
    }
    // 7. Graduation must move to a special status (could be handled in backend)
    // 8. Validate new level/class are not empty
    if (!newLevel || !newClass) {
      return 'Please select both new level and new class.';
    }
    // 9. Prevent duplicate academic history entries (
    // 10. UI warning for mismatched action/placement (already handled as warning)
    return '';
  };

  const handlePromotionFieldChange = (field, value) => {
    setSinglePromotion(sp => {
      const updated = { ...sp, [field]: value };
      if (promotionStudent) {
        setPromotionWarning(getPromotionWarning(
          updated.action,
          promotionStudent.academicLevel,
          updated.newLevel
        ));
        setPromotionError(validatePromotion(
          promotionStudent,
          updated.action,
          updated.newLevel,
          updated.newClass
        ));
      }
      return updated;
    });
  };

  const confirmSinglePromotion = () => {
    // Validate before proceeding
    const error = validatePromotion(
      promotionStudent,
      singlePromotion.action,
      singlePromotion.newLevel,
      singlePromotion.newClass
    );
    if (error) {
      setPromotionError(error);
      return;
    }
    // Find and update the student in mockStudents
    const updatedStudents = mockStudents.map(s => {
      if (s.id !== promotionStudent.id) return s;
      // Add to academicHistory for the selected session
      const newHistory = [
        ...(s.academicHistory || []),
        {
          session: selectedSession,
          level: singlePromotion.newLevel,
          class: singlePromotion.newClass,
          status: singlePromotion.action === 'Promote' ? 'Promoted' : singlePromotion.action === 'Demote' ? 'Demoted' : singlePromotion.action === 'Retain' ? 'Retained' : 'Graduated',
          action: singlePromotion.action,
          performedBy: 'admin', // TODO: Replace with real user info
          performedAt: new Date().toISOString(),
        },
      ];
      return {
        ...s,
        academicLevel: singlePromotion.newLevel,
        academicClass: singlePromotion.newClass,
        academicHistory: newHistory,
      };
    });
    // This only updates the local array; in a real app, update backend/global state
    setPromotionStudent(null);
    setShowPromotionModal(false);
    setPromotionWarning('');
    setPromotionError('');
  };

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
                  <th className="px-4 py-2">Student ID</th>
                  <th className="px-4 py-2">Student</th>
                  {termsForSession.map(term => (
                    <th key={term} className="px-4 py-2">{term}</th>
                  ))}
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsInSelection.map(student => {
                  // Check if student has academicHistory for the selected session
                  const sessionHistory = (student.academicHistory || []).find(h => h.session === selectedSession);
                  const actionTaken = sessionHistory ? sessionHistory.status : null;
                  return (
                    <tr key={student.id} className="border-b">
                      <td className="px-4 py-2 font-mono">{student.studentId}</td>
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
                      <td className="px-4 py-2 text-center flex items-center gap-2 justify-center">
                        {actionTaken ? (
                          <>
                            <button
                              className={`btn btn-xs btn-disabled cursor-not-allowed ${actionTaken === 'Promoted' ? 'bg-green-100 text-green-700' : actionTaken === 'Retained' ? 'bg-yellow-100 text-yellow-700' : actionTaken === 'Graduated' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                              disabled
                            >
                              {actionTaken}
                            </button>
                            <button
                              className="btn btn-xs btn-outline ml-1"
                              title="Edit Promotion Action"
                              onClick={() => {
                                setPromotionStudent(student);
                                setSinglePromotion({
                                  action: sessionHistory.action || 'Promote',
                                  newLevel: sessionHistory.level,
                                  newClass: sessionHistory.class,
                                });
                                setShowPromotionModal(true);
                                setPromotionWarning('');
                                setPromotionError('');
                              }}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-xs btn-primary"
                            onClick={() => openPromotionModal(student)}
                          >
                            Promote/Move
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Modal for viewing result status */}
      {viewResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <motion.div initial={{ scale: 0.97, y: 30 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-3xl relative max-h-[95vh] overflow-y-auto border border-blue-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-t-2xl px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between shadow">
              <div>
                <div className="text-lg font-bold tracking-wide">{viewResult.student.name} <span className='font-normal text-blue-100'>({viewResult.student.studentId})</span></div>
                <div className="flex flex-wrap gap-4 mt-1 text-sm text-blue-100">
                  <span>Session: <span className="font-semibold text-white">{viewResult.session}</span></span>
                  {/* Class removed as per user request */}
                </div>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0">
                <button className="btn btn-sm btn-outline-white" onClick={handleDownloadPDF} type="button"><FaDownload className="inline mr-1" /> PDF</button>
                <button className="btn btn-sm btn-outline-white" onClick={() => setViewResult(null)} type="button">Close</button>
              </div>
            </div>
            {/* Centered Result Type */}
            {(() => {
              const result = getResult(viewResult.student.name, viewResult.term);
              if (!result) return null;
              return (
                <div className="w-full flex flex-col items-center justify-center mt-2 mb-2">
                  <div className="text-xl md:text-2xl font-bold text-blue-800 text-center">{result.resultType}</div>
                </div>
              );
            })()}
            {/* Academic Summary Bar */}
            {(() => {
              const result = getResult(viewResult.student.name, viewResult.term);
              if (!result) return null;
              return (
                <div className="flex flex-wrap gap-x-8 gap-y-2 px-8 py-3 bg-blue-50/80 border-b border-blue-200 text-blue-900 text-xs md:text-sm font-medium justify-between">
                  <span>Age: <span className="font-semibold">{result.age}</span></span>
                  <span>House: <span className="inline-block bg-blue-100 text-blue-800 font-bold rounded shadow-sm">{result.house}</span></span>
                  <span>Category: <span className="font-semibold">{result.category}Art Class</span></span>
                  <span>Number in Class: <span className="font-semibold">{result.numberInClass}</span></span>
                  <span>Position: <span className="inline-block bg-green-100 text-green-800 font-bold rounded px-2 py-1 shadow-sm">{result.position}</span></span>
                  <span>Overall Avg: <span className="inline-block bg-blue-100 text-blue-800 font-bold rounded px-2 py-1 shadow-sm">{result.overallAverage}</span></span>
                  <span>Vacation: <span className="font-semibold">{result.vacationDate}</span></span>
                  <span>Resumption: <span className="font-semibold">{result.resumptionDate}</span></span>
                </div>
              );
            })()}
            {/* Content */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-blue-50/60 to-white">
              {(() => {
                const result = getResult(viewResult.student.name, viewResult.term);
                if (!result) {
                  return <div className="text-red-600 font-bold">No Result Uploaded</div>;
                }
                const key = `${result.academicLevel}-${result.academicClass}`;
                const assessmentCount = result.assessmentCount || assessmentMap[key] || 4;
                return (
                  <div className="space-y-8">
                    {/* Subjects Table - MAIN FOCUS */}
                    <div>
                      <div className="font-bold text-blue-800 mb-2 text-base">Subjects & Scores</div>
                      <div className="rounded-xl shadow border-2 border-blue-400 bg-white/95 overflow-x-auto ring-2 ring-blue-200">
                        <table className="min-w-full table-auto text-xs md:text-sm">
                          <thead>
                            <tr className="bg-blue-100 text-blue-900">
                              <th className="px-2 py-2 border">Subject</th>
                              {[...Array(assessmentCount)].map((_, i) => (
                                <th key={i} className="px-2 py-2 border">A{i+1}</th>
                              ))}
                              <th className="px-2 py-2 border">Exam</th>
                              <th className="px-2 py-2 border">Total</th>
                              <th className="px-2 py-2 border">Grade</th>
                              <th className="px-2 py-2 border">Remark</th>
                              <th className="px-2 py-2 border">Teacher</th>
                              <th className="px-2 py-2 border">Summary</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.subjects.map((subj, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50/60' : 'bg-white'}>
                                <td className="px-2 py-2 border font-semibold text-blue-900">{subj.name}</td>
                                {[...Array(assessmentCount)].map((_, i) => (
                                  <td key={i} className="px-2 py-2 border text-center">{subj.assessments && subj.assessments[i] !== undefined ? subj.assessments[i] : ''}</td>
                                ))}
                                <td className="px-2 py-2 border text-center">{subj.exam}</td>
                                <td className="px-2 py-2 border text-center font-bold">{subj.termAverage}</td>
                                <td className="px-2 py-2 border text-center">{subj.grade}</td>
                                <td className="px-2 py-2 border text-center">{subj.remark}</td>
                                <td className="px-2 py-2 border text-center">{subj.teacherInitial}</td>
                                <td className="px-2 py-2 border text-center">{subj.summary}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Notes Section */}
                    {result.description && (
                      <div className="mt-2 rounded-xl bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-900 shadow-sm">
                        <span className="font-semibold">Notes:</span> {result.description}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Modal for adding result */}
      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <motion.form initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="text-lg font-bold mb-4">Add Student Result</h3>
            {formError && <div className="text-red-500 mb-2">{formError}</div>}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Only show search/dropdown if no student is pre-selected */}
              {!selectedStudentId && (
                <>
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
                </>
              )}
              {/* Student info fields (always shown, always read-only) */}
              <input
                className="input"
                name="studentId"
                placeholder="Student ID"
                value={(() => {
                  if (selectedStudentId) {
                    const student = mockStudents.find(s => s.id === Number(selectedStudentId));
                    return student ? student.studentId : '';
                  }
                  return '';
                })()}
                readOnly
              />
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
            {/* Description field below uneditable fields */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="input w-full min-h-[60px]"
                placeholder="Enter any additional notes or description..."
                value={form.description || ''}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Subjects</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {form.subjects.map((subj, idx) => {
                  // Determine the number of assessments for this subject based on assessmentMap and current session/level/class
                  const key = `${form.academicLevel}-${form.academicClass}`;
                  const count = assessmentMap[key] || 4;
                  return (
                    <div key={idx} className="border rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
                      <div className="font-semibold mb-2">{subj.name}</div>
                      <div className="flex flex-wrap gap-2 items-center">
                        {[...Array(count)].map((_, aIdx) => (
                          <input
                            key={aIdx}
                            className="input w-20"
                            placeholder={`A${aIdx+1}`}
                            type="number"
                            value={subj.assessments[aIdx]}
                            onChange={e => handleSubjectChange(idx, `assessment${aIdx}`, e.target.value)}
                          />
                        ))}
                        <input
                          className="input w-24"
                          placeholder="Exam"
                          type="number"
                          value={subj.exam}
                          onChange={e => handleSubjectChange(idx, 'exam', e.target.value)}
                        />
                        <input
                          className="input w-24"
                          placeholder="Term Avg"
                          type="number"
                          value={subj.termAverage}
                          onChange={e => handleSubjectChange(idx, 'termAverage', e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 mt-2">
                        <input
                          className="input flex-1"
                          placeholder="Grade"
                          value={subj.grade}
                          onChange={e => handleSubjectChange(idx, 'grade', e.target.value)}
                        />
                        <input
                          className="input flex-1"
                          placeholder="Remark"
                          value={subj.remark}
                          onChange={e => handleSubjectChange(idx, 'remark', e.target.value)}
                        />
                        <input
                          className="input flex-1"
                          placeholder="Teacher"
                          value={subj.teacherInitial}
                          onChange={e => handleSubjectChange(idx, 'teacherInitial', e.target.value)}
                        />
                      </div>
                      <input
                        className="input mt-2"
                        placeholder="Summary"
                        value={subj.summary}
                        onChange={e => handleSubjectChange(idx, 'summary', e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Result</button>
            </div>
          </motion.form>
        </motion.div>
      )}
      {/* Promotion Modal */}
      {showPromotionModal && promotionStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Promote/Move Student</h3>
            <div className="mb-2 font-semibold">{promotionStudent.name} ({promotionStudent.studentId})</div>
            <div className="mb-2">Current Level: <span className="font-semibold">{promotionStudent.academicLevel}</span></div>
            <div className="mb-2">Current Class: <span className="font-semibold">{promotionStudent.academicClass}</span></div>
            {promotionWarning && (
              <div className="mb-2 text-yellow-700 bg-yellow-100 border border-yellow-300 rounded p-2">
                {promotionWarning}
              </div>
            )}
            {promotionError && (
              <div className="mb-2 text-red-700 bg-red-100 border border-red-300 rounded p-2">
                {promotionError}
              </div>
            )}
            <form onSubmit={e => { e.preventDefault(); confirmSinglePromotion(); }} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Action</label>
                <select className="input w-full" value={singlePromotion.action} onChange={e => handlePromotionFieldChange('action', e.target.value)}>
                  <option value="Promote">Promote</option>
                  <option value="Demote">Demote</option>
                  <option value="Retain">Retain</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">New Level</label>
                <select className="input w-full" value={singlePromotion.newLevel} onChange={e => handlePromotionFieldChange('newLevel', e.target.value)}>
                  {academicLevels.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">New Class</label>
                <select className="input w-full" value={singlePromotion.newClass} onChange={e => handlePromotionFieldChange('newClass', e.target.value)}>
                  {academicClasses.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="btn" onClick={() => { setShowPromotionModal(false); setPromotionWarning(''); setPromotionError(''); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={!!promotionError}>Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
