import React, { useState } from "react";

const initialData = [
  {
    id: 1,
    session: "2024/2025",
    terms: [
      {
        id: 1,
        name: "First Term",
        resumption: "2024-09-10",
        vacation: "2024-12-15",
        status: "Active",
      },
      {
        id: 2,
        name: "Second Term",
        resumption: "2025-01-10",
        vacation: "2025-04-15",
        status: "Disabled",
      },
    ],
  },
];

const AcademicCalendarSetup = () => {
  const [sessions, setSessions] = useState(initialData);
  const [showAdd, setShowAdd] = useState(false);
  const [newSession, setNewSession] = useState({ session: '', terms: [] });
  const [newTerm, setNewTerm] = useState({ name: '', resumption: '', vacation: '', status: 'Active' });
  const [selectedSession, setSelectedSession] = useState(null);

  const handleAddSession = () => {
    if (!newSession.session) return;
    setSessions([...sessions, { ...newSession, id: Date.now(), terms: [] }]);
    setNewSession({ session: '', terms: [] });
    setShowAdd(false);
  };

  const handleAddTerm = (sessionId) => {
    if (!newTerm.name || !newTerm.resumption || !newTerm.vacation) return;
    setSessions(sessions.map(s =>
      s.id === sessionId
        ? { ...s, terms: [...s.terms, { ...newTerm, id: Date.now() }] }
        : s
    ));
    setNewTerm({ name: '', resumption: '', vacation: '', status: 'Active' });
    setSelectedSession(null);
  };

  const handleDeleteTerm = (sessionId, termId) => {
    setSessions(sessions.map(s =>
      s.id === sessionId
        ? { ...s, terms: s.terms.filter(t => t.id !== termId) }
        : s
    ));
  };

  const handleStatusChange = (sessionId, termId, status) => {
    setSessions(sessions.map(s =>
      s.id === sessionId
        ? { ...s, terms: s.terms.map(t => t.id === termId ? { ...t, status } : t) }
        : s
    ));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Calendar Setup</h2>
      <div className="mb-6 flex gap-2">
        <input
          className="input"
          placeholder="New Session (e.g., 2024/2025)"
          value={newSession.session}
          onChange={e => setNewSession({ ...newSession, session: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAddSession}>Add Session</button>
      </div>
      <div className="space-y-6">
        {sessions.map(session => (
          <div key={session.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Session: {session.session}</h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedSession(session.id)}
              >
                Add Term
              </button>
            </div>
            <table className="w-full table-auto mb-2">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Term</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Resumption</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Vacation</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-right py-2 px-2 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {session.terms.map(term => (
                  <tr key={term.id} className="border-b border-gray-100">
                    <td className="py-2 px-2 font-medium text-gray-900">{term.name}</td>
                    <td className="py-2 px-2 text-gray-700">{term.resumption}</td>
                    <td className="py-2 px-2 text-gray-700">{term.vacation}</td>
                    <td className="py-2 px-2">
                      <select
                        className="input"
                        value={term.status}
                        onChange={e => handleStatusChange(session.id, term.id, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDeleteTerm(session.id, term.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedSession === session.id && (
              <div className="bg-gray-50 p-4 rounded-lg mb-2">
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                  <input
                    className="input"
                    placeholder="Term Name (e.g., First Term)"
                    value={newTerm.name}
                    onChange={e => setNewTerm({ ...newTerm, name: e.target.value })}
                  />
                  <input
                    className="input"
                    type="date"
                    placeholder="Resumption Date"
                    value={newTerm.resumption}
                    onChange={e => setNewTerm({ ...newTerm, resumption: e.target.value })}
                  />
                  <input
                    className="input"
                    type="date"
                    placeholder="Vacation Date"
                    value={newTerm.vacation}
                    onChange={e => setNewTerm({ ...newTerm, vacation: e.target.value })}
                  />
                  <select
                    className="input"
                    value={newTerm.status}
                    onChange={e => setNewTerm({ ...newTerm, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddTerm(session.id)}
                  >
                    Save Term
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedSession(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicCalendarSetup;
