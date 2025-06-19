import React, { useState } from "react";

const initialBatches = [
  {
    id: 1,
    batchNumber: "BATCH-001",
    value: 500,
    totalCards: 100,
    distributed: 60,
    status: "Active",
    cards: [
      { code: "SCR-123456", used: false },
      { code: "SCR-654321", used: true },
    ],
  },
];

const ScratchCardManagement = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [newBatch, setNewBatch] = useState({ batchNumber: '', value: '', totalCards: '', status: 'Active' });
  const [showAdd, setShowAdd] = useState(false);

  const handleGenerateBatch = () => {
    if (!newBatch.batchNumber || !newBatch.value || !newBatch.totalCards) return;
    setBatches([
      ...batches,
      {
        ...newBatch,
        id: Date.now(),
        distributed: 0,
        cards: Array.from({ length: Number(newBatch.totalCards) }, (_, i) => ({ code: `SCR-${Math.floor(100000 + Math.random() * 900000)}`, used: false })),
      },
    ]);
    setNewBatch({ batchNumber: '', value: '', totalCards: '', status: 'Active' });
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Scratch Card Management</h2>
      <div className="mb-6 flex gap-2">
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : 'Generate New Batch'}
        </button>
      </div>
      {showAdd && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
            <input
              className="input"
              placeholder="Batch Number"
              value={newBatch.batchNumber}
              onChange={e => setNewBatch({ ...newBatch, batchNumber: e.target.value })}
            />
            <input
              className="input"
              type="number"
              placeholder="Card Value"
              value={newBatch.value}
              onChange={e => setNewBatch({ ...newBatch, value: e.target.value })}
            />
            <input
              className="input"
              type="number"
              placeholder="Number of Cards"
              value={newBatch.totalCards}
              onChange={e => setNewBatch({ ...newBatch, totalCards: e.target.value })}
            />
            <select
              className="input"
              value={newBatch.status}
              onChange={e => setNewBatch({ ...newBatch, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleGenerateBatch}>Generate Batch</button>
        </div>
      )}
      <div className="space-y-6">
        {batches.map(batch => (
          <div key={batch.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Batch: {batch.batchNumber}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${batch.status === 'Active' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>{batch.status}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div><span className="font-medium">Value:</span> ₦{batch.value}</div>
              <div><span className="font-medium">Total Cards:</span> {batch.totalCards}</div>
              <div><span className="font-medium">Distributed:</span> {batch.distributed}</div>
              <div><span className="font-medium">Unused:</span> {batch.totalCards - batch.distributed}</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto mb-2">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Card Code</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-gray-500 uppercase">Used</th>
                  </tr>
                </thead>
                <tbody>
                  {batch.cards.slice(0, 10).map((card, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-2 px-2 font-mono text-gray-900">{card.code}</td>
                      <td className="py-2 px-2 text-gray-700">{card.used ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {batch.cards.length > 10 && (
                <div className="text-xs text-gray-500">Showing first 10 of {batch.cards.length} cards...</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScratchCardManagement;
