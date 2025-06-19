import React from "react";

const SchoolsList = () => {
  // Placeholder data
  const schools = [
    {
      id: 1,
      name: "Springfield High",
      email: "info@springfield.edu",
      logo: "https://via.placeholder.com/40x40",
      signature: "Principal John Doe",
      url: "https://springfield.edu",
      smsConfig: "Twilio",
      students: 1200,
      status: "Active",
    },
    {
      id: 2,
      name: "Shelbyville College",
      email: "contact@shelbyville.edu",
      logo: "https://via.placeholder.com/40x40",
      signature: "Principal Jane Smith",
      url: "https://shelbyville.edu",
      smsConfig: "Nexmo",
      students: 950,
      status: "Inactive",
    },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signature</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SMS Config</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {schools.map((school) => (
            <tr key={school.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={school.logo} alt={school.name} className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{school.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{school.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{school.signature}</td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600 underline"><a href={school.url} target="_blank" rel="noopener noreferrer">{school.url}</a></td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{school.smsConfig}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{school.students}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${school.status === 'Active' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>{school.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right flex gap-2 justify-end">
                <button className="btn btn-secondary btn-sm">View</button>
                <button className="btn btn-primary btn-sm">Edit</button>
                <button className="btn btn-error btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolsList;
