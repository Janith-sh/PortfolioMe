"use client";

import { useState, useEffect } from 'react';
import { skillsAPI } from '@/utils/api';

export default function Skills() {
    // Remove initial skills since we'll fetch from API
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showAddSkillForm, setShowAddSkillForm] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Form states
    const [newCategory, setNewCategory] = useState('');
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillColor, setNewSkillColor] = useState('bg-blue-500');

    const ADMIN_PASSWORD = 'password';

    const colorOptions = [
      { name: 'Blue', value: 'bg-blue-500' },
      { name: 'Green', value: 'bg-green-500' },
      { name: 'Red', value: 'bg-red-500' },
      { name: 'Yellow', value: 'bg-yellow-500' },
      { name: 'Purple', value: 'bg-purple-500' },
      { name: 'Pink', value: 'bg-pink-500' },
      { name: 'Indigo', value: 'bg-indigo-500' },
      { name: 'Teal', value: 'bg-teal-500' },
      { name: 'Orange', value: 'bg-orange-500' },
      { name: 'Cyan', value: 'bg-cyan-500' },
      { name: 'Gray', value: 'bg-gray-600' },
      { name: 'Emerald', value: 'bg-emerald-500' }
    ];

    // Fetch skills from API
    useEffect(() => {
      const fetchSkills = async () => {
        try {
          setLoading(true);
          const data = await skillsAPI.getAll();
          setSkills(data.skillCategories);
        } catch (error) {
          console.error('Error fetching skills:', error);
          // Set empty array if API fails
          setSkills([]);
        } finally {
          setLoading(false);
        }
      };

      fetchSkills();
    }, []);

    const handleAdminClick = () => {
      if (isAuthenticated) {
        setShowAddCategoryForm(true);
      } else {
        setShowPasswordModal(true);
      }
    };

    const handlePasswordSubmit = (e) => {
      e.preventDefault();
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setShowPasswordModal(false);
        setShowAddCategoryForm(true);
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

    const handleAddCategory = async (e) => {
      e.preventDefault();
      if (newCategory.trim()) {
        try {
          const newSkillCategory = await skillsAPI.createCategory({
            category: newCategory.trim(),
            order: skills.length + 1
          });
          setSkills([...skills, newSkillCategory.category]);
          setNewCategory('');
          setShowAddCategoryForm(false);
        } catch (error) {
          console.error('Error adding category:', error);
          // Handle error (you could show a toast notification here)
        }
      }
    };

    const handleAddSkill = async (e) => {
      e.preventDefault();
      if (newSkillName.trim() && selectedCategoryId) {
        try {
          const updatedCategory = await skillsAPI.addSkill(selectedCategoryId, {
            name: newSkillName.trim(),
            color: newSkillColor
          });
          
          // Update the local state
          const updatedSkills = skills.map(skillCategory => {
            if (skillCategory._id === selectedCategoryId) {
              return updatedCategory.category;
            }
            return skillCategory;
          });
          
          setSkills(updatedSkills);
          setNewSkillName('');
          setNewSkillColor('bg-blue-500');
          setShowAddSkillForm(false);
          setSelectedCategoryId(null);
        } catch (error) {
          console.error('Error adding skill:', error);
          // Handle error (you could show a toast notification here)
        }
      }
    };

    const handleAddSkillToCategory = (categoryId) => {
      setSelectedCategoryId(categoryId);
      setShowAddSkillForm(true);
    };

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-md">
          <nav className="container mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Janith S Viduranga
            </h1>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Home</a>
              <a href="/projects" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Projects</a>
              <a href="/skills" className="text-indigo-600 font-semibold border-b-2 border-indigo-600">Skills</a>
              <a href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Contact</a>
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
          <div className="container mx-auto max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Passionate about creating exceptional digital experiences through modern web technologies 
                and innovative solutions that bring ideas to life.
              </p>
              
              {/* Add Category Button */}
              <div className="mt-8">
                <button
                  onClick={handleAdminClick}
                  className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  {isAuthenticated && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                  + Add Skill Category
                </button>
              </div>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-4 text-slate-600">Loading skills...</span>
              </div>
            ) : (
              <>
                {/* Skills Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                  {skills.map((skillCategory, categoryIndex) => (
                    <div 
                      key={skillCategory._id}
                      className="group relative bg-gradient-to-br from-white/90 via-white/85 to-gray-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-blue-200/50 hover:transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden skill-card-float"
                      style={{
                        animationDelay: `${categoryIndex * 150}ms`,
                        animation: 'fadeInUp 0.8s ease-out both'
                      }}
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-purple-50/20 to-teal-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse delay-1000"></div>
                        <div className="absolute top-8 left-6 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse delay-2000"></div>
                        <div className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-teal-400/30 rounded-full animate-pulse delay-500"></div>
                      </div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-8">
                          <div className="flex items-center gap-3">
                            {/* Category icon */}
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                              {skillCategory.category}
                            </h3>
                          </div>
                          {isAuthenticated && (
                            <button
                              onClick={() => handleAddSkillToCategory(skillCategory._id)}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group/btn"
                              title="Add skill to this category"
                            >
                              <svg className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          )}
                        </div>
                        
                        {/* Skills count indicator */}
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-slate-600">
                            {skillCategory.items.length} skill{skillCategory.items.length !== 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                          {skillCategory.items.map((skill, skillIndex) => (
                            <div 
                              key={skillIndex} 
                              className={`${skill.color} text-white px-4 py-2.5 rounded-2xl font-semibold text-sm hover:shadow-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden group/skill`}
                              style={{
                                animationDelay: `${(categoryIndex * 150) + (skillIndex * 100)}ms`,
                                animation: 'slideInUp 0.6s ease-out both'
                              }}
                            >
                              {/* Shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700"></div>
                              <span className="relative z-10">{skill.name}</span>
                            </div>
                          ))}
                        </div>

                        {/* Progress bar animation */}
                        <div className="mt-6 h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 delay-300"
                            style={{
                              width: `${Math.min((skillCategory.items.length / 10) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Skills Section */}
                <div className="mt-16 text-center">
                  <div className="group relative bg-gradient-to-br from-white/90 via-white/85 to-gray-50/90 backdrop-blur-xl rounded-3xl p-10 shadow-xl hover:shadow-2xl border border-white/20 hover:border-blue-200/50 transition-all duration-500 overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-6 right-10 w-3 h-3 bg-indigo-400/20 rounded-full animate-pulse delay-1000"></div>
                      <div className="absolute top-12 left-8 w-2 h-2 bg-purple-400/20 rounded-full animate-pulse delay-2000"></div>
                      <div className="absolute bottom-8 right-12 w-2.5 h-2.5 bg-teal-400/20 rounded-full animate-pulse delay-500"></div>
                      <div className="absolute bottom-12 left-10 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-pulse delay-1500"></div>
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>

                      <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-teal-600 to-purple-600 bg-clip-text text-transparent mb-6 group-hover:scale-105 transition-transform duration-300">
                        Always Learning
                      </h3>
                      <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                        Technology evolves rapidly, and I'm committed to continuous learning and staying updated with the latest trends and best practices in web development.
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-4">
                        {["TypeScript", "Docker", "AWS", "GraphQL", "Testing", "UI/UX Design"].map((tech, index) => (
                          <span 
                            key={index}
                            className="group/tech relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-sm font-semibold hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer overflow-hidden"
                            style={{
                              animationDelay: `${index * 100}ms`,
                              animation: 'slideInUp 0.6s ease-out both'
                            }}
                          >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-700"></div>
                            <span className="relative z-10">{tech}</span>
                          </span>
                        ))}
                      </div>

                      {/* Progress indicator */}
                      <div className="mt-8 flex justify-center">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((dot, index) => (
                            <div
                              key={index}
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-purple-500"
                              style={{
                                animationDelay: `${index * 200}ms`,
                                animation: 'pulse 2s ease-in-out infinite'
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

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
                <p className="text-slate-600">Enter the admin password to manage skills</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500"
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

        {/* Add Category Form Modal */}
        {showAddCategoryForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Add New Skill Category</h3>
                <button
                  onClick={() => setShowAddCategoryForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleAddCategory} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Frontend Development, Backend Development"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Add Category
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Skill Form Modal */}
        {showAddSkillForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">Add New Skill</h3>
                <button
                  onClick={() => setShowAddSkillForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleAddSkill} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React.js, TypeScript, Docker"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Badge Color
                  </label>
                  <select
                    value={newSkillColor}
                    onChange={(e) => setNewSkillColor(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-800"
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Color Preview */}
                  <div className="mt-3">
                    <span className="text-sm text-slate-600">Preview: </span>
                    <span className={`${newSkillColor} text-white px-3 py-1 rounded-full text-sm font-medium inline-block`}>
                      {newSkillName || 'Sample Skill'}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Add Skill
                </button>
              </form>
            </div>
          </div>
        )}
  
        {/* Footer */}
        <footer className="bg-slate-900 text-white py-8 border-t border-slate-800">
          <div className="container mx-auto text-center px-6">
            <p className="text-slate-400">
              &copy; 2025 Janith S Viduranga. All Rights Reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  