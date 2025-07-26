// components/AddProjectForm.js
import { useState } from 'react';

export default function AddProjectForm({ onProjectAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [status, setStatus] = useState('In Progress');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create new project object
    const newProject = {
      _id: Date.now().toString(), // Temporary ID
      title,
      description,
      link,
      technologies: technologies.split(',').map(tech => tech.trim()),
      status,
      image: '/project-placeholder.jpg'
    };

    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const data = await response.json();
        onProjectAdded(data.project);
      } else {
        // For now, just add to local state
        onProjectAdded(newProject);
      }
    } catch (error) {
      // Fallback: add to local state
      onProjectAdded(newProject);
    }

    // Reset form
    setTitle('');
    setDescription('');
    setLink('');
    setTechnologies('');
    setStatus('In Progress');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Title
        </label>
        <input
          type="text"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          placeholder="Describe your project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Link
        </label>
        <input
          type="url"
          placeholder="https://github.com/username/project"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technologies (comma separated)
        </label>
        <input
          type="text"
          placeholder="React, Node.js, MongoDB, Tailwind CSS"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-slate-700 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        Add Project
      </button>
    </form>
  );
}
