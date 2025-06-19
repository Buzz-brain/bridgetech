import React, { useState } from 'react';

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
  const [results] = useState(initialResults);
  const [filter, setFilter] = useState({ session: '', term: '' });

  const filteredResults = results.filter(r =>
    (!filter.session || r.session === filter.session) &&
    (!filter.term || r.term === filter.term)
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Result Management</h2>
      <div className="flex gap-4 mb-6">
        <select className="input" value={filter.session} onChange={e => setFilter(f => ({ ...f, session: e.target.value }))}>
          <option value="">All Sessions</option>
          {sessions.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="input" value={filter.term} onChange={e => setFilter(f => ({ ...f, term: e.target.value }))}>
          <option value="">All Terms</option>
          {terms.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      {filteredResults.map(result => (
        <div key={result.id} className="bg-white rounded shadow p-6 mb-8">
          <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div>
              <h3 className="font-semibold text-lg">{result.resultType}</h3>
              <p className="text-sm text-gray-600">Session: {result.session} | Term: {result.term}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-xs btn-secondary">Download Result</button>
              <button className="btn btn-xs btn-secondary">Download Transcript</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div><span className="font-medium">Student:</span> {result.studentName}</div>
            <div><span className="font-medium">Age:</span> {result.age}</div>
            <div><span className="font-medium">No. in Class:</span> {result.numberInClass}</div>
            <div><span className="font-medium">House:</span> {result.house}</div>
            <div><span className="font-medium">Overall Avg:</span> {result.overallAverage}</div>
            <div><span className="font-medium">Position:</span> {result.position}</div>
            <div><span className="font-medium">Resumption:</span> {result.resumptionDate}</div>
            <div><span className="font-medium">Vacation:</span> {result.vacationDate}</div>
          </div>
          <table className="min-w-full bg-gray-50 rounded mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4">Subject</th>
                <th className="py-2 px-4">1st</th>
                <th className="py-2 px-4">2nd</th>
                <th className="py-2 px-4">3rd</th>
                <th className="py-2 px-4">4th</th>
                <th className="py-2 px-4">Exam</th>
                <th className="py-2 px-4">Term Avg</th>
                <th className="py-2 px-4">Summary</th>
                <th className="py-2 px-4">Grade</th>
                <th className="py-2 px-4">Remark</th>
                <th className="py-2 px-4">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subj, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{subj.name}</td>
                  {subj.assessments.map((a, i) => <td key={i} className="py-2 px-4">{a}</td>)}
                  <td className="py-2 px-4">{subj.exam}</td>
                  <td className="py-2 px-4">{subj.termAverage}</td>
                  <td className="py-2 px-4">{subj.summary}</td>
                  <td className="py-2 px-4">{subj.grade}</td>
                  <td className="py-2 px-4">{subj.remark}</td>
                  <td className="py-2 px-4">{subj.teacherInitial}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-4">
            <span className="font-medium">Scratch Card Validation:</span>
            <span className={result.scratchCardValidated ? 'text-green-600' : 'text-red-600'}>
              {result.scratchCardValidated ? 'Validated' : 'Not Validated'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
