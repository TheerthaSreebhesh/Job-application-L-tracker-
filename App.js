import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ company: '', position: '', status: '', appliedDate: '' });

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/jobs', formData);
    fetchJobs();
    setFormData({ company: '', position: '', status: '', appliedDate: '' });
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required className="border p-2 mr-2" />
        <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required className="border p-2 mr-2" />
        <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} required className="border p-2 mr-2" />
        <input name="appliedDate" type="date" value={formData.appliedDate} onChange={handleChange} required className="border p-2 mr-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>
      <ul>
        {jobs.map((job) => (
          <li key={job._id} className="mb-2 border p-2">
            <strong>{job.position}</strong> at {job.company} — {job.status} on {new Date(job.appliedDate).toLocaleDateString()}
            <button onClick={() => deleteJob(job._id)} className="ml-4 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
