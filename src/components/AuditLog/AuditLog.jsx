import React, { useState } from 'react';

const initialLogs = [
  {
    id: 1,
    userId: 'admin01',
    role: 'Admin Officer',
    operation: 'edit',
    url: '/student-management',
    timestamp: '2025-06-19 10:15:00',
    params: '{"studentId":"SCH001-STU-0001"}'
  },
  {
    id: 2,
    userId: 'acct01',
    role: 'Accounting Officer',
    operation: 'new',
    url: '/user-management',
    timestamp: '2025-06-19 09:45:00',
    params: '{"userId":"input01"}'
  }
];

export default function AuditLog() {
  const [logs] = useState(initialLogs);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">System Audit Log</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4">User ID</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Operation</th>
            <th className="py-2 px-4">URL</th>
            <th className="py-2 px-4">Timestamp</th>
            <th className="py-2 px-4">Parameters</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className="border-t">
              <td className="py-2 px-4">{log.userId}</td>
              <td className="py-2 px-4">{log.role}</td>
              <td className="py-2 px-4">{log.operation}</td>
              <td className="py-2 px-4">{log.url}</td>
              <td className="py-2 px-4">{log.timestamp}</td>
              <td className="py-2 px-4 whitespace-pre-wrap text-xs text-gray-700">{log.params}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
