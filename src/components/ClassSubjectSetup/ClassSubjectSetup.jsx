import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBook, FaChalkboardTeacher, FaCheck, FaTimes } from 'react-icons/fa';
import { Filter, Layers, Users, BadgeCheck, BookOpen, UserCheck } from 'lucide-react';

// Mock data
const initialSubjects = [
  { id: 1, subject: 'Mathematics', category: 'Science', class: 'JSS1A', teacher: 'Mr. John', status: 'Active' },
  { id: 2, subject: 'English', category: 'Arts', class: 'JSS1A', teacher: 'Ms. Jane', status: 'Active' },
  { id: 3, subject: 'Biology', category: 'Science', class: 'JSS3B', teacher: 'Dr. Smith', status: 'Disabled' },
];
const allTeachers = ['Mr. John', 'Ms. Jane', 'Dr. Smith', 'Mrs. Doe'];
const allStatus = ['Active', 'Disabled'];

export default function ClassSubjectSetup() {
  const [data, setData] = useState(initialSubjects);
  const [filter, setFilter] = useState({ category: '', class: '', teacher: '', status: '' });
  const [modal, setModal] = useState({ open: false, mode: 'add', entry: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, entry: null });
  // Dynamic state for classes, subjects, categories
  const [classList, setClassList] = useState(['JSS1A', 'JSS3B', 'SS1A', 'SS2B']);
  const [subjectList, setSubjectList] = useState(['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics']);
  const [categoryList, setCategoryList] = useState(['Science', 'Arts', 'Commercial', 'Technology']);
  const [newClass, setNewClass] = useState('');
  const [editClassIdx, setEditClassIdx] = useState(null);
  const [editClassValue, setEditClassValue] = useState('');
  // New state for subject/category management
  const [newSubject, setNewSubject] = useState('');
  const [editSubjectIdx, setEditSubjectIdx] = useState(null);
  const [editSubjectValue, setEditSubjectValue] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryIdx, setEditCategoryIdx] = useState(null);
  const [editCategoryValue, setEditCategoryValue] = useState('');

  // Filtering
  const filteredData = data.filter(row =>
    (!filter.category || row.category === filter.category) &&
    (!filter.class || row.class === filter.class) &&
    (!filter.teacher || row.teacher === filter.teacher) &&
    (!filter.status || row.status === filter.status)
  );

  // Modal form state
  const [form, setForm] = useState({
    subject: subjectList[0],
    category: categoryList[0],
    class: classList[0],
    teacher: allTeachers[0],
    status: allStatus[0],
  });

  const openAddModal = () => {
    setForm({ subject: subjectList[0], category: categoryList[0], class: classList[0], teacher: allTeachers[0], status: allStatus[0] });
    setModal({ open: true, mode: 'add', entry: null });
  };
  const openEditModal = (entry) => {
    setForm({ ...entry });
    setModal({ open: true, mode: 'edit', entry });
  };
  const closeModal = () => setModal({ open: false, mode: 'add', entry: null });

  const handleFormChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (modal.mode === 'add') {
      setData([...data, { ...form, id: Date.now() }]);
    } else if (modal.mode === 'edit') {
      setData(data.map(d => d.id === modal.entry.id ? { ...form, id: d.id } : d));
    }
    closeModal();
  };

  const openDeleteModal = entry => setDeleteModal({ open: true, entry });
  const closeDeleteModal = () => setDeleteModal({ open: false, entry: null });
  const handleDelete = () => {
    setData(data.filter(d => d.id !== deleteModal.entry.id));
    closeDeleteModal();
  };
  // Add class
  const handleAddClass = e => {
    e.preventDefault();
    if (newClass && !classList.includes(newClass)) {
      setClassList([...classList, newClass]);
      setNewClass('');
    }
  };
  // Edit class
  const handleEditClass = idx => {
    setEditClassIdx(idx);
    setEditClassValue(classList[idx]);
  };
  const handleSaveEditClass = idx => {
    if (editClassValue && !classList.includes(editClassValue)) {
      const updated = [...classList];
      updated[idx] = editClassValue;
      setClassList(updated);
      setEditClassIdx(null);
      setEditClassValue('');
    }
  };
  // Delete class
  const handleDeleteClass = idx => {
    const updated = classList.filter((_, i) => i !== idx);
    setClassList(updated);
  };
  // Add subject
  const handleAddSubject = e => {
    e.preventDefault();
    if (newSubject && !subjectList.includes(newSubject)) {
      setSubjectList([...subjectList, newSubject]);
      setNewSubject('');
    }
  };
  // Edit subject
  const handleEditSubject = idx => {
    setEditSubjectIdx(idx);
    setEditSubjectValue(subjectList[idx]);
  };
  const handleSaveEditSubject = idx => {
    if (editSubjectValue && !subjectList.includes(editSubjectValue)) {
      const updated = [...subjectList];
      updated[idx] = editSubjectValue;
      setSubjectList(updated);
      setEditSubjectIdx(null);
      setEditSubjectValue('');
    }
  };
  // Delete subject
  const handleDeleteSubject = idx => {
    const updated = subjectList.filter((_, i) => i !== idx);
    setSubjectList(updated);
  };
  // Add category
  const handleAddCategory = e => {
    e.preventDefault();
    if (newCategory && !categoryList.includes(newCategory)) {
      setCategoryList([...categoryList, newCategory]);
      setNewCategory('');
    }
  };
  // Edit category
  const handleEditCategory = idx => {
    setEditCategoryIdx(idx);
    setEditCategoryValue(categoryList[idx]);
  };
  const handleSaveEditCategory = idx => {
    if (editCategoryValue && !categoryList.includes(editCategoryValue)) {
      const updated = [...categoryList];
      updated[idx] = editCategoryValue;
      setCategoryList(updated);
      setEditCategoryIdx(null);
      setEditCategoryValue('');
    }
  };
  // Delete category
  const handleDeleteCategory = idx => {
    const updated = categoryList.filter((_, i) => i !== idx);
    setCategoryList(updated);
  };

  // Update form fields when lists change
  React.useEffect(() => {
    setForm(f => ({ ...f, class: classList[0] || '', subject: subjectList[0] || '', category: categoryList[0] || '' }));
  }, [classList, subjectList, categoryList]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-8">Class & Subject Setup</h2>
      {/* Management Panels: Classes, Subjects, Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Manage Classes */}
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold mb-2">Manage Classes</h4>
          <form className="flex gap-2 mb-4" onSubmit={handleAddClass}>
            <input className="input w-full" placeholder="Add new class (e.g. JSS1A)" value={newClass} onChange={e => setNewClass(e.target.value)} />
            <button className="btn btn-primary" type="submit">Add</button>
          </form>
          <ul className="flex flex-wrap gap-2">
            {classList.map((cls, idx) => (
              <li key={cls} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded">
                {editClassIdx === idx ? (
                  <>
                    <input className="input w-20" value={editClassValue} onChange={e => setEditClassValue(e.target.value)} />
                    <button className="btn btn-xs btn-success" onClick={() => handleSaveEditClass(idx)}><FaCheck /></button>
                    <button className="btn btn-xs" onClick={() => setEditClassIdx(null)}><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <span>{cls}</span>
                    <button className="btn btn-xs btn-secondary" onClick={() => handleEditClass(idx)}><FaEdit /></button>
                    <button className="btn btn-xs btn-error" onClick={() => handleDeleteClass(idx)}><FaTrash /></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Manage Subjects */}
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold mb-2">Manage Subjects</h4>
          <form className="flex gap-2 mb-4" onSubmit={handleAddSubject}>
            <input className="input w-full" placeholder="Add new subject (e.g. Mathematics)" value={newSubject} onChange={e => setNewSubject(e.target.value)} />
            <button className="btn btn-primary" type="submit">Add</button>
          </form>
          <ul className="flex flex-wrap gap-2">
            {subjectList.map((subj, idx) => (
              <li key={subj} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded">
                {editSubjectIdx === idx ? (
                  <>
                    <input className="input w-20" value={editSubjectValue} onChange={e => setEditSubjectValue(e.target.value)} />
                    <button className="btn btn-xs btn-success" onClick={() => handleSaveEditSubject(idx)}><FaCheck /></button>
                    <button className="btn btn-xs" onClick={() => setEditSubjectIdx(null)}><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <span>{subj}</span>
                    <button className="btn btn-xs btn-secondary" onClick={() => handleEditSubject(idx)}><FaEdit /></button>
                    <button className="btn btn-xs btn-error" onClick={() => handleDeleteSubject(idx)}><FaTrash /></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Manage Categories */}
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold mb-2">Manage Categories</h4>
          <form className="flex gap-2 mb-4" onSubmit={handleAddCategory}>
            <input className="input w-full" placeholder="Add new category (e.g. Science)" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
            <button className="btn btn-primary" type="submit">Add</button>
          </form>
          <ul className="flex flex-wrap gap-2">
            {categoryList.map((cat, idx) => (
              <li key={cat} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded">
                {editCategoryIdx === idx ? (
                  <>
                    <input className="input w-20" value={editCategoryValue} onChange={e => setEditCategoryValue(e.target.value)} />
                    <button className="btn btn-xs btn-success" onClick={() => handleSaveEditCategory(idx)}><FaCheck /></button>
                    <button className="btn btn-xs" onClick={() => setEditCategoryIdx(null)}><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <span>{cat}</span>
                    <button className="btn btn-xs btn-secondary" onClick={() => handleEditCategory(idx)}><FaEdit /></button>
                    <button className="btn btn-xs btn-error" onClick={() => handleDeleteCategory(idx)}><FaTrash /></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Assignment Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-bold">Assign Subject to Class</h3>
          <button className="btn btn-primary flex items-center gap-2" onClick={openAddModal}><FaPlus /> Assign Subject</button>
        </div>
        {/* Filters with icons, horizontal row */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="flex items-center gap-2 text-primary-700 font-semibold text-base"><Filter className="w-4 h-4" /> Filters:</span>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <select className="input w-36" value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}>
              <option value="">All Categories</option>
              {categoryList.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-400" />
            <select className="input w-36" value={filter.class} onChange={e => setFilter({ ...filter, class: e.target.value })}>
              <option value="">All Classes</option>
              {classList.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-gray-400" />
            <select className="input w-36" value={filter.teacher} onChange={e => setFilter({ ...filter, teacher: e.target.value })}>
              <option value="">All Teachers</option>
              {allTeachers.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-gray-400" />
            <select className="input w-36" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
              <option value="">All Status</option>
              {allStatus.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2"><FaBook className="inline mr-1" />Subject</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2"><FaChalkboardTeacher className="inline mr-1" />Teacher</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 && (
                <tr><td colSpan={7} className="text-center py-6 text-gray-400">No records found.</td></tr>
              )}
              {filteredData.map((row, idx) => (
                <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{row.subject}</td>
                  <td className="px-4 py-2">{row.category}</td>
                  <td className="px-4 py-2">{row.class}</td>
                  <td className="px-4 py-2">{row.teacher}</td>
                  <td className="px-4 py-2">
                    {row.status === 'Active' ? <span className="text-green-600 flex items-center gap-1"><FaCheck /> Active</span> : <span className="text-red-500 flex items-center gap-1"><FaTimes /> Disabled</span>}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="btn btn-xs btn-secondary flex items-center gap-1" onClick={() => openEditModal(row)}><FaEdit /> Edit</button>
                    <button className="btn btn-xs btn-error flex items-center gap-1" onClick={() => openDeleteModal(row)}><FaTrash /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">{modal.mode === 'add' ? 'Assign Subject to Class' : 'Edit Subject Assignment'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Subject</label>
                <select name="subject" className="input w-full" value={form.subject} onChange={handleFormChange} required>
                  {subjectList.map(s => <option key={s}>{s}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select the subject to assign.</p>
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select name="category" className="input w-full" value={form.category} onChange={handleFormChange} required>
                  {categoryList.map(c => <option key={c}>{c}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">Choose the subject category.</p>
              </div>
              <div>
                <label className="block font-semibold mb-1">Class</label>
                <select name="class" className="input w-full" value={form.class} onChange={handleFormChange} required>
                  {classList.map(c => <option key={c}>{c}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select the class for this subject.</p>
              </div>
              <div>
                <label className="block font-semibold mb-1">Teacher</label>
                <select name="teacher" className="input w-full" value={form.teacher} onChange={handleFormChange} required>
                  {allTeachers.map(t => <option key={t}>{t}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">Assign a teacher to this subject.</p>
              </div>
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select name="status" className="input w-full" value={form.status} onChange={handleFormChange} required>
                  {allStatus.map(s => <option key={s}>{s}</option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">Set the status for this assignment.</p>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" className="btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{modal.mode === 'add' ? 'Add' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm animate-fadeIn">
            <h3 className="text-lg font-bold mb-4 text-red-600">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete <span className="font-semibold">{deleteModal.entry.subject}</span> for <span className="font-semibold">{deleteModal.entry.class}</span>?</p>
            <div className="flex justify-end gap-2">
              <button className="btn" onClick={closeDeleteModal}>Cancel</button>
              <button className="btn btn-error" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
