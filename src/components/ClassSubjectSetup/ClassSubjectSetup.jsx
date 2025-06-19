import React, { useState } from 'react';

const initialClasses = [
  { name: 'JSS1A', subjects: [
    { name: 'Mathematics', teacher: 'Mr. John', enabled: true },
    { name: 'English', teacher: 'Ms. Jane', enabled: true },
  ] },
  { name: 'JSS3B', subjects: [
    { name: 'Biology', teacher: 'Dr. Smith', enabled: false },
  ] },
];

const allSubjects = ['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics'];
const allTeachers = ['Mr. John', 'Ms. Jane', 'Dr. Smith', 'Mrs. Doe'];

export default function ClassSubjectSetup() {
  const [classes, setClasses] = useState(initialClasses);
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState(allSubjects[0]);
  const [teacher, setTeacher] = useState(allTeachers[0]);
  const [selectedClass, setSelectedClass] = useState('');

  const addClass = () => {
    if (!className.trim()) return;
    setClasses([...classes, { name: className.trim(), subjects: [] }]);
    setClassName('');
  };

  const addSubjectToClass = () => {
    if (!selectedClass || !subject) return;
    setClasses(classes.map(cls =>
      cls.name === selectedClass
        ? { ...cls, subjects: [...cls.subjects, { name: subject, teacher, enabled: true }] }
        : cls
    ));
  };

  const toggleSubject = (clsName, subjIdx) => {
    setClasses(classes.map(cls =>
      cls.name === clsName
        ? { ...cls, subjects: cls.subjects.map((s, i) => i === subjIdx ? { ...s, enabled: !s.enabled } : s) }
        : cls
    ));
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Class & Subject Setup</h2>
      <div className="bg-white p-6 rounded shadow mb-8">
        <div className="flex gap-4 mb-4">
          <input
            className="input"
            placeholder="Add Class (e.g. JSS1A)"
            value={className}
            onChange={e => setClassName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addClass}>Add Class</button>
        </div>
        <div className="flex gap-4 mb-4">
          <select className="input" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
            <option value="">Select Class</option>
            {classes.map(cls => <option key={cls.name}>{cls.name}</option>)}
          </select>
          <select className="input" value={subject} onChange={e => setSubject(e.target.value)}>
            {allSubjects.map(subj => <option key={subj}>{subj}</option>)}
          </select>
          <select className="input" value={teacher} onChange={e => setTeacher(e.target.value)}>
            {allTeachers.map(t => <option key={t}>{t}</option>)}
          </select>
          <button className="btn btn-secondary" onClick={addSubjectToClass}>Assign Subject</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map(cls => (
          <div key={cls.name} className="bg-white rounded shadow p-4">
            <h3 className="font-semibold text-lg mb-2">{cls.name}</h3>
            <ul>
              {cls.subjects.map((subj, idx) => (
                <li key={idx} className="flex items-center justify-between py-1 border-b last:border-b-0">
                  <span>{subj.name} <span className="text-xs text-gray-500">({subj.teacher})</span></span>
                  <button
                    className={`btn btn-xs ${subj.enabled ? 'btn-success' : 'btn-danger'}`}
                    onClick={() => toggleSubject(cls.name, idx)}
                  >
                    {subj.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
