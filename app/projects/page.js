// pages/projects.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AddProjectForm from "@/components/AddProjectsForm";
import { projectAPI } from "@/utils/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const ADMIN_PASSWORD = 'password';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectAPI.getAll();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Set empty array if API fails
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Janith S Viduranga
          </h1>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Home</Link>
            <Link href="/projects" className="text-indigo-600 font-semibold border-b-2 border-indigo-600">Projects</Link>
            <Link href="/skills" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Skills</Link>
            <Link href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Contact</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-slate-600 hover:text-indigo-600">
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
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and projects. Each project represents a unique challenge 
              and demonstrates different aspects of modern web development.
            </p>
          </div>

          {/* Filter and Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            {/* Filter Buttons */}
            <div className="flex gap-3">
              {['All', 'Completed', 'In Progress'].map((filter, index) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`group relative px-8 py-3 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-105'
                      : 'bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 hover:shadow-lg hover:scale-105 hover:border-indigo-300'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInDown 0.6s ease-out both'
                  }}
                >
                  {/* Shimmer effect for active button */}
                  {selectedFilter === filter && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {selectedFilter === filter && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                    {filter}
                  </span>
                </button>
              ))}
            </div>

            {/* Add Project Button - Hidden/Minimal for portfolio viewers */}
            <button
              onClick={handleAddProjectClick}
              className="group fixed bottom-6 right-6 bg-slate-400/60 hover:bg-indigo-500/80 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-50 opacity-30 hover:opacity-100"
              title="Admin: Add Project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          {/* Password Modal */}
          {showPasswordModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-sm w-full shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Admin Access Required</h3>
                  <p className="text-slate-600">Enter the admin password to add new projects</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
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
                      className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
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
                  <h3 className="text-2xl font-bold text-slate-800">Add New Project</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-slate-500 hover:text-slate-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <AddProjectForm onProjectAdded={handleProjectAdded} />
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4 absolute top-2 left-1/2 transform -translate-x-1/2" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <p className="text-slate-600 font-medium animate-pulse">Loading amazing projects...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
              {filteredProjects.map((project, index) => (
              <div 
                key={project._id}
                className="group relative bg-gradient-to-br from-white/90 via-white/85 to-gray-50/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-3 hover:scale-[1.02] border border-white/20 hover:border-blue-200/50 project-card"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.8s ease-out both'
                }}
              >
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Decorative particles removed for cleaner look */}
                </div>

                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-teal-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Project Image Section */}
                <div className="relative h-52 bg-gradient-to-br from-slate-600 via-blue-600 to-purple-700 overflow-hidden">
                  {/* Animated mesh background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-4 py-2 rounded-2xl text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 ${
                      project.status === 'Completed' 
                        ? 'bg-emerald-500/90 text-white border border-emerald-300/50' 
                        : 'bg-amber-500/90 text-white border border-amber-300/50'
                    }`}>
                      <div className="flex items-center gap-2">
                        {project.status === 'Completed' ? (
                          <svg className="w-3 h-3 text-emerald-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <path strokeWidth="2" d="m12 6 0 6 4 2" />
                          </svg>
                        )}
                        {project.status}
                      </div>
                    </span>
                  </div>

                  {/* Project icon with animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white/90 text-7xl filter drop-shadow-lg group-hover:animate-bounce">🚀</div>
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Project Content */}
                <div className="relative z-10 p-8">
                  <div className="flex items-start gap-3 mb-4">
                    {/* Project type icon */}
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-600">
                          {project.technologies.length} technolog{project.technologies.length !== 1 ? 'ies' : 'y'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Technologies with enhanced styling */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="group/tech px-3 py-2 bg-gradient-to-r from-slate-50 to-indigo-50 text-slate-700 text-xs rounded-xl font-semibold border border-slate-200 hover:shadow-md hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        style={{
                          animationDelay: `${(index * 150) + (techIndex * 50)}ms`,
                          animation: 'slideInUp 0.6s ease-out both'
                        }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-500"></div>
                        <span className="relative z-10">{tech}</span>
                      </span>
                    ))}
                  </div>

                  
                            <div className="flex gap-3">
                            <a 
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                            >
                              {/* Button shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                              <div className="relative z-10 flex items-center justify-center gap-2">
                              <span>View Project</span>
                              <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              </div>
                            </a>
                            <button className="group/fav p-3 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 rounded-2xl hover:from-teal-50 hover:to-purple-50 hover:text-purple-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-lg">
                              <svg className="w-5 h-5 group-hover/fav:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            </div>

                            {/* Progress indicator */}
                  <div className="mt-6 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 delay-300"
                      style={{
                        width: project.status === 'Completed' ? '100%' : '70%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="relative mb-8">
                {/* Animated empty state illustration */}
                <div className="text-8xl mb-6 animate-bounce">📝</div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full animate-pulse"></div>
              </div>
              
              <div className="max-w-md mx-auto">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
                  No Projects Found
                </h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  {selectedFilter === 'All' 
                    ? "It looks like there are no projects yet. Start by adding your first amazing project!"
                    : `No projects match the "${selectedFilter}" filter. Try a different filter or add a new project.`
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handleAddProjectClick}
                    className="bg-slate-400/60 hover:bg-indigo-500/80 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 opacity-60 hover:opacity-100"
                    title="Admin: Add First Project"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Project
                    </span>
                  </button>
                  
                  {selectedFilter !== 'All' && (
                    <button
                      onClick={() => setSelectedFilter('All')}
                      className="px-6 py-3 bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      View All Projects
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

        <div className="relative container mx-auto px-6 py-12">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Brand section */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                Janith S Viduranga
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Full Stack Developer creating modern web applications with clean code and beautiful designs.
              </p>
            </div>

            {/* Social links */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com" 
                  className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 transition-all duration-300 hover:transform hover:-translate-y-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 transition-all duration-300 hover:transform hover:-translate-y-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-blue-400 transition-colors">LinkedIn</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 transition-all duration-300 hover:transform hover:-translate-y-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-pink-400 transition-colors">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 md:mb-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for new opportunities</span>
            </div>
            <div className="text-slate-400 text-sm">
              &copy; <span className="text-white">2025</span> Janith S Viduranga. Made with ❤️ using Next.js
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
