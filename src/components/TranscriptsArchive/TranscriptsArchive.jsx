import React, { useState } from 'react';

const initialTranscripts = [
  {
    id: 1,
    studentName: 'John Doe',
    classLevel: 'JSS1A',
    session: '2024/2025',
    transcriptUrl: '#',
    printUrl: '#',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    classLevel: 'JSS3B',
    session: '2024/2025',
    transcriptUrl: '#',
    printUrl: '#',
  },
];

const sessions = ['2024/2025', '2025/2026'];

export default function TranscriptsArchive() {
  const [transcripts] = useState(initialTranscripts);
  const [filter, setFilter] = useState({ session: '' });

  const filteredTranscripts = transcripts.filter(t =>
    !filter.session || t.session === filter.session
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Transcripts & Archive</h2>
      <div className="flex gap-4 mb-6">
        <select className="input" value={filter.session} onChange={e => setFilter(f => ({ ...f, session: e.target.value }))}>
          <option value="">All Academic Years</option>
          {sessions.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4">Student Name</th>
            <th className="py-2 px-4">Class</th>
            <th className="py-2 px-4">Session</th>
            <th className="py-2 px-4">Transcript</th>
            <th className="py-2 px-4">Print</th>
          </tr>
        </thead>
        <tbody>
          {filteredTranscripts.map(t => (
            <tr key={t.id} className="border-t">
              <td className="py-2 px-4">{t.studentName}</td>
              <td className="py-2 px-4">{t.classLevel}</td>
              <td className="py-2 px-4">{t.session}</td>
              <td className="py-2 px-4">
                <a href={t.transcriptUrl} className="btn btn-xs btn-secondary" download>
                  Download
                </a>
              </td>
              <td className="py-2 px-4">
                <a href={t.printUrl} className="btn btn-xs btn-primary" target="_blank" rel="noopener noreferrer">
                  Print
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
