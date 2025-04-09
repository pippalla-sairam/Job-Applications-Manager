import React, { useState, useEffect } from 'react';

const statusColors = {
  Applied: 'bg-gray-300 text-black',
  Interview: 'bg-blue-300 text-black',
  Offer: 'bg-green-400 text-black',
  Rejected: 'bg-red-400 text-black',
};

const API_URL = 'http://localhost:5000/api/applications';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: ''
  });

  // Fetch all applications on mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setApplications(data);
  };

  const handleFilterClick = (status) => setFilter(status);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }

    fetchApplications(); // Refresh list
    setFormData({ company: '', role: '', status: 'Applied', date: '' });
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (app) => {
    setFormData(app);
    setIsEditing(true);
    setEditId(app._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchApplications();
  };

  const filteredApps = applications
    .filter(app => filter === 'All' || app.status === filter)
    .filter(app =>
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between px-6 py-5 items-center">
        <div className="font-bold text-xl">Your Applications</div>
        <div>
          <button
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setFormData({ company: '', role: '', status: 'Applied', date: '' });
            }}
            className="bg-cyan-500 text-white px-5 py-2 rounded-xl hover:bg-cyan-600 flex items-center gap-2 cursor-pointer"
          >
            <img
              src="src/assets/more.png"
              alt="plus"
              className="w-5 h-5 cursor-pointer"
            />
            Add New Application
          </button>
        </div>
      </div>

      <div className='flex flex-wrap items-center px-6 py-4 gap-4'>
        <div className='font-medium'>Filter by:</div>
        {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
          <button
            key={status}
            onClick={() => handleFilterClick(status)}
            className={`border px-4 py-1 cursor-pointer rounded-lg ${filter === status ? 'bg-cyan-500 text-white' : 'text-white border-gray-500'
              }`}
          >
            {status}
          </button>
        ))}
        <input
          type='text'
          placeholder='Search by company or role'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-600 bg-gray-800 text-white p-2 rounded-lg ml-auto w-full sm:w-64'
        />
      </div>

      {/* Application Cards */}
      <div className='px-6'>
        {filteredApps.length > 0 ? (
          filteredApps.map(app => (
            <div
              key={app._id}
              className='border border-gray-700 p-4 mb-4 rounded-lg shadow-md bg-gray-800 flex justify-between items-center'
            >
              <div>
                <h2 className='text-lg font-semibold'>
                  {app.role} @ {app.company}
                </h2>
                <div className={`inline-block px-3 py-1 mt-1 rounded-full text-sm ${statusColors[app.status]}`}>
                  {app.status}
                </div>
                <p className='text-sm text-gray-400 mt-1'>Applied on: {app.date}</p>
              </div>
              <div className='flex gap-3'>
                <button
                  onClick={() => handleEdit(app)}
                  className='bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 cursor-pointer'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(app._id)}
                  className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 cursor-pointer'
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No applications found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-10'>
          <div className='bg-gray-800 p-6 rounded-xl w-96 shadow-lg'>
            <h2 className='text-xl font-bold mb-4'>
              {isEditing ? 'Edit Application' : 'Add New Application'}
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='text'
                name='company'
                placeholder='Company Name'
                value={formData.company}
                onChange={handleChange}
                className='border border-gray-600 bg-gray-900 text-white p-2 rounded-md'
                required
              />
              <input
                type='text'
                name='role'
                placeholder='Job Role'
                value={formData.role}
                onChange={handleChange}
                className='border border-gray-600 bg-gray-900 text-white p-2 rounded-md'
                required
              />
              <select
                name='status'
                value={formData.status}
                onChange={handleChange}
                className='border border-gray-600 bg-gray-900 text-white p-2 rounded-md'
              >
                <option value='Applied'>Applied</option>
                <option value='Interview'>Interview</option>
                <option value='Offer'>Offer</option>
                <option value='Rejected'>Rejected</option>
              </select>
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className='border border-gray-600 bg-gray-900 text-white p-2 rounded-md'
                required
              />
              <div className='flex justify-end gap-2 mt-4'>
                <button
                  type='button'
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setFormData({ company: '', role: '', status: 'Applied', date: '' });
                  }}
                  className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 cursor-pointer'
                >
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
