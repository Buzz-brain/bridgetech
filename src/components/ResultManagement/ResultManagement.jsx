import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

  const handleDownloadPDF = () => {
    alert('Download as PDF (to be implemented)');
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
        <button className="btn btn-primary ml-auto" onClick={handleDownloadPDF}><FaDownload className="mr-2" />Download PDF</button>
      </div>
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
            <div className="text-right">
              <div className="font-semibold text-primary-700">{result.resultType}</div>
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
