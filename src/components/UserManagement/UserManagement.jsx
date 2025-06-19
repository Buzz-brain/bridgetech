import React, { useState } from 'react';

const initialUsers = [
  {
    id: 1,
    firstName: 'John',
    phone: '08012345678',
    role: 'Admin Officer',
    userId: 'admin01',
    enabled: true,
  },
  {
    id: 2,
    firstName: 'Jane',
    phone: '08087654321',
    role: 'Accounting Officer',
    userId: 'acct01',
    enabled: false,
  },
];

const roles = ['Admin Officer', 'Accounting Officer', 'Result Recorder', 'Input Officer'];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ firstName: '', phone: '', role: roles[0], userId: '', password: '' });
  const [editing, setEditing] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing !== null) {
      setUsers(users.map(u => (u.id === editing ? { ...u, ...form } : u)));
      setEditing(null);
    } else {
      setUsers([
        ...users,
        { ...form, id: Date.now(), enabled: true },
      ]);
    }
    setForm({ firstName: '', phone: '', role: roles[0], userId: '', password: '' });
  };

  const handleEdit = user => {
    setForm(user);
    setEditing(user.id);
  };

  const handleEnable = id => {
    setUsers(users.map(u => (u.id === id ? { ...u, enabled: !u.enabled } : u)));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" required />
        <select name="role" value={form.role} onChange={handleChange} className="input">
          {roles.map(r => <option key={r}>{r}</option>)}
        </select>
        <input name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" className="input" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="input" type="password" required />
        <button type="submit" className="btn btn-primary col-span-1 md:col-span-2">{editing ? 'Update User' : 'Add User'}</button>
      </form>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4">First Name</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">User ID</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="py-2 px-4">{user.firstName}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.userId}</td>
              <td className="py-2 px-4">
                <span className={user.enabled ? 'text-green-600' : 'text-red-600'}>
                  {user.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </td>
              <td className="py-2 px-4 flex gap-2">
                <button className="btn btn-xs btn-secondary" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-xs" onClick={() => handleEnable(user.id)}>
                  {user.enabled ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
