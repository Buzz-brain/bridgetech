import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

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

const periodOptions = ["First Term", "Second Term", "Third Term"];
const statusOptions = ["Active", "Disabled"];

const AcademicCalendarSetup = () => {
  const [sessions, setSessions] = useState(initialData);
  const [showAdd, setShowAdd] = useState(false);
  const [newSession, setNewSession] = useState({ session: '', terms: [] });
  const [showTermModal, setShowTermModal] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);
  const [termForm, setTermForm] = useState({ name: '', resumption: '', vacation: '', status: 'Active' });
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ sessionId: null, termId: null });

  const handleAddSession = () => {
    if (!newSession.session) return;
    setSessions([...sessions, { ...newSession, id: Date.now(), terms: [] }]);
    setNewSession({ session: '', terms: [] });
    setShowAdd(false);
  };

  const openAddTermModal = (sessionId) => {
    setEditingTerm(null);
    setTermForm({ name: '', resumption: '', vacation: '', status: 'Active' });
    setSelectedSessionId(sessionId);
    setShowTermModal(true);
  };

  const openEditTermModal = (sessionId, term) => {
    setEditingTerm(term.id);
    setTermForm({ ...term });
    setSelectedSessionId(sessionId);
    setShowTermModal(true);
  };

  const handleSaveTerm = () => {
    if (!termForm.name || !termForm.resumption || !termForm.vacation) return;
    setSessions(sessions.map(s =>
      s.id === selectedSessionId
        ? {
            ...s,
            terms: editingTerm
              ? s.terms.map(t => t.id === editingTerm ? { ...termForm, id: editingTerm } : t)
              : [...s.terms, { ...termForm, id: Date.now() }]
          }
        : s
    ));
    setShowTermModal(false);
    setEditingTerm(null);
    setTermForm({ name: '', resumption: '', vacation: '', status: 'Active' });
    setSelectedSessionId(null);
  };

  const handleDeleteTerm = (sessionId, termId) => {
    setDeleteTarget({ sessionId, termId });
    setShowDeleteModal(true);
  };

  const confirmDeleteTerm = () => {
    setSessions(sessions.map(s =>
      s.id === deleteTarget.sessionId
        ? { ...s, terms: s.terms.filter(t => t.id !== deleteTarget.termId) }
        : s
    ));
    setShowDeleteModal(false);
    setDeleteTarget({ sessionId: null, termId: null });
  };

  const handleStatusChange = (sessionId, termId, status) => {
    setSessions(sessions.map(s =>
      s.id === sessionId
        ? { ...s, terms: s.terms.map(t => t.id === termId ? { ...t, status } : t) }
        : s
    ));
  };

  return (
    <motion.div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8 mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-primary-700 mb-6 flex items-center gap-2">📅 Academic Calendar Setup</h2>
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
                onClick={() => openAddTermModal(session.id)}
              >
                Add Term
              </button>
            </div>
            <table className="w-full table-auto mb-2">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">S/N</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Term</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Resumption</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Vacation</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-right py-2 px-2 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {session.terms.map((term, idx) => (
                  <tr key={term.id} className="border-b border-gray-100">
                    <td className="py-2 px-2 font-bold text-gray-500">{idx + 1}</td>
                    <td className="py-2 px-2 font-medium text-gray-900">{term.name}</td>
                    <td className="py-2 px-2 text-gray-700">{term.resumption}</td>
                    <td className="py-2 px-2 text-gray-700">{term.vacation}</td>
                    <td className="py-2 px-2">
                      <select
                        className="input"
                        value={term.status}
                        onChange={e => handleStatusChange(session.id, term.id, e.target.value)}
                      >
                        {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </td>
                    <td className="py-2 px-2 text-right flex gap-2 justify-end">
                      <button
                        className="btn btn-secondary btn-xs"
                        onClick={() => openEditTermModal(session.id, term)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() => handleDeleteTerm(session.id, term.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {/* Modal for Add/Edit Term */}
      <AnimatePresence>
        {showTermModal && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{editingTerm ? 'Edit Term' : 'Add Term'}</h3>
              <form onSubmit={e => { e.preventDefault(); handleSaveTerm(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Term Name</label>
                  <select className="input w-full" value={termForm.name} onChange={e => setTermForm({ ...termForm, name: e.target.value })}>
                    <option value="">Select Term</option>
                    {periodOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resumption Date</label>
                  <input className="input w-full" type="date" value={termForm.resumption} onChange={e => setTermForm({ ...termForm, resumption: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vacation Date</label>
                  <input className="input w-full" type="date" value={termForm.vacation} onChange={e => setTermForm({ ...termForm, vacation: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="input w-full" value={termForm.status} onChange={e => setTermForm({ ...termForm, status: e.target.value })}>
                    {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowTermModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingTerm ? 'Update' : 'Save'}</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p>Are you sure you want to delete this term?</p>
              <div className="flex gap-4 mt-6">
                <button className="btn btn-error flex-1" onClick={confirmDeleteTerm}>Yes, Delete</button>
                <button className="btn btn-secondary flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AcademicCalendarSetup;
