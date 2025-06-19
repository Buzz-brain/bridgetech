import React, { useState } from 'react';

const initialTables = {
  "Academic Ratings": ["Excellent", "Very Good", "Good", "Average", "Poor"],
  "Grades": ["A", "B", "C", "D", "E", "F"],
  "Subjects": ["Mathematics", "English", "Biology"],
  "Levels": ["JSS1", "JSS2", "SS1", "SS2", "SS3"],
  "Classes": ["Gold", "Silver", "Bronze"],
  "Blood Groups": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "Genotypes": ["AA", "AS", "SS", "SC", "Others"],
  "Marital Status": ["Single", "Married", "Divorced", "Widowed"],
  "Nationalities": ["Nigerian", "Ghanaian", "Other"],
  "Religions": ["Christianity", "Islam", "Traditional", "Other"],
  "Expense Categories": ["Salaries", "Utilities", "Maintenance"],
  "Income Categories": ["Fees", "Donations", "Grants"],
  "Domains": ["Cognitive", "Affective", "Psychomotor"],
};

export default function ParameterTables() {
  const [tables, setTables] = useState(initialTables);
  const [editKey, setEditKey] = useState(null);
  const [newValue, setNewValue] = useState('');

  const handleAdd = (key) => {
    if (!newValue.trim()) return;
    setTables({
      ...tables,
      [key]: [...tables[key], newValue.trim()]
    });
    setNewValue('');
  };

  const handleDelete = (key, idx) => {
    setTables({
      ...tables,
      [key]: tables[key].filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Code Parameter Tables</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(tables).map(key => (
          <div key={key} className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{key}</h3>
            </div>
            <ul className="mb-2">
              {tables[key].map((item, idx) => (
                <li key={idx} className="flex items-center justify-between py-1 border-b last:border-b-0">
                  <span>{item}</span>
                  <button className="btn btn-xs btn-danger" onClick={() => handleDelete(key, idx)}>Delete</button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-2">
              <input
                className="input flex-1"
                placeholder={`Add to ${key}`}
                value={editKey === key ? newValue : ''}
                onFocus={() => setEditKey(key)}
                onChange={e => setNewValue(e.target.value)}
              />
              <button className="btn btn-xs btn-primary" onClick={() => { handleAdd(key); setEditKey(key); }}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
