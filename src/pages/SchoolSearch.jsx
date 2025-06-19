import React, { useState } from 'react';

const schools = [
  { name: 'Stella Maris', url: '/stellamaris' },
  { name: 'Bright Future', url: '/brightfuture' },
  { name: 'Unity College', url: '/unitycollege' },
  { name: 'Royal Academy', url: '/royalacademy' },
];

export default function SchoolSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = e => {
    e.preventDefault();
    const found = schools.find(s => s.name.toLowerCase().includes(query.toLowerCase()));
    setResult(found || { name: '', url: '' });
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold mb-4 text-primary-700">Find Your School Portal</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          className="input flex-1"
          placeholder="Type your school name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>
      {result && (
        result.url ? (
          <div className="bg-green-100 text-green-700 p-4 rounded">Redirecting to <a href={result.url} className="underline font-semibold">{result.name}</a>...</div>
        ) : (
          <div className="bg-red-100 text-red-700 p-4 rounded">No school found with that name.</div>
        )
      )}
    </div>
  );
}
