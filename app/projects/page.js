// pages/projects.js
"use client";

import { useState, useEffect } from "react";
import AddProjectForm from "@/components/AddProjectsForm";

export default function Projects() {
  // Sample projects data - replace with real API data later
  const sampleProjects = [
    {
      _id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.',
      link: 'https://github.com',
      technologies: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      image: '/project1.jpg',
      status: 'Completed'
    },
    {
      _id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      link: 'https://github.com',
      technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
      image: '/project2.jpg',
      status: 'Completed'
    },
    {
      _id: '3',
      title: 'Weather Dashboard',
      description: 'A responsive weather application that provides real-time weather data, forecasts, and interactive maps using external APIs.',
      link: 'https://github.com',
      technologies: ['React', 'Weather API', 'Chart.js', 'CSS3'],
      image: '/project3.jpg',
      status: 'Completed'
    },
    {
      _id: '4',
      title: 'Social Media Platform',
      description: 'A modern social media platform with posts, comments, likes, and real-time messaging functionality.',
      link: 'https://github.com',
      technologies: ['MERN Stack', 'Socket.io', 'AWS S3', 'JWT'],
      image: '/project4.jpg',
      status: 'In Progress'
    },
    {
      _id: '5',
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and modern UI design.',
      link: 'https://github.com',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      image: '/project5.jpg',
      status: 'Completed'
    },
    {
      _id: '6',
      title: 'Learning Management System',
      description: 'An educational platform for online courses with video streaming, progress tracking, and interactive quizzes.',
      link: 'https://github.com',
      technologies: ['Next.js', 'MongoDB', 'Video.js', 'Stripe'],
      image: '/project6.jpg',
      status: 'In Progress'
    }
  ];

  const [projects, setProjects] = useState(sampleProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const ADMIN_PASSWORD = 'password';

  useEffect(() => {
    // This will be replaced with actual API call later
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (error) {
        // For now, use sample data
        console.log('Using sample data');
      }
    };

    // fetchProjects();
  }, []);

  const handleProjectAdded = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
    setShowAddForm(false);
  };

  const handleAddProjectClick = () => {
    if (isAuthenticated) {
      setShowAddForm(true);
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setShowAddForm(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.status === selectedFilter);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-slate-100 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-300 sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">
            Janith S Viduranga
          </h1>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium">Home</a>
            <a href="/projects" className="text-blue-700 font-semibold border-b-2 border-blue-700">Projects</a>
            <a href="/skills" className="text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium">Skills</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium">Contact</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              My <span className="bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and projects. Each project represents a unique challenge 
              and demonstrates different aspects of modern web development.
            </p>
          </div>

          {/* Filter and Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['All', 'Completed', 'In Progress'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-slate-700 to-blue-700 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-300 hover:shadow-md hover:scale-105'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Add Project Button */}
            <button
              onClick={handleAddProjectClick}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              {isAuthenticated && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
              + Add Project
            </button>
          </div>

          {/* Password Modal */}
          {showPasswordModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-sm w-full shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h3>
                  <p className="text-gray-600">Enter the admin password to add new projects</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      autoFocus
                      required
                    />
                  </div>

                  {passwordError && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                      {passwordError}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePasswordModalClose}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-slate-700 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Access
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Add Project Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Add New Project</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <AddProjectForm onProjectAdded={handleProjectAdded} />
              </div>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:-translate-y-2 group border border-gray-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-slate-500 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-orange-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/80 text-6xl">🚀</div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-slate-700 to-blue-700 text-white py-2 px-4 rounded-xl font-medium text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      View Project
                    </a>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Projects Found</h3>
              <p className="text-gray-600 mb-6">No projects match the current filter. Try a different filter or add a new project.</p>
              <button
                onClick={handleAddProjectClick}
                className="bg-gradient-to-r from-slate-700 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Your First Project
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto text-center px-6">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Janith S Viduranga. All Rights Reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
