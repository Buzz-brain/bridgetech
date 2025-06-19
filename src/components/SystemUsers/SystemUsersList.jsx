import React from "react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@admin.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2025-06-18 10:23",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@school.com",
    role: "School Admin",
    status: "Inactive",
    lastLogin: "2025-06-17 14:10",
  },
];

const SystemUsersList = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>{user.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.lastLogin}</td>
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

export default SystemUsersList;
