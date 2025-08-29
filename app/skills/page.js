"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { skillsAPI } from '@/utils/api';

export default function Skills() {
    // Remove initial skills since we'll fetch from API
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
              <Link href="/" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Home</Link>
              <Link href="/projects" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Projects</Link>
              <Link href="/skills" className="text-indigo-600 font-semibold border-b-2 border-indigo-600">Skills</Link>
              <Link href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Contact</Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="text-slate-600 hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200">
              <div className="container mx-auto px-6 py-4 space-y-4">
                <Link href="/" className="block text-slate-600 hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/projects" className="block text-slate-600 hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
                <Link href="/skills" className="block text-indigo-600 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Skills</Link>
                <Link href="/contact" className="block text-slate-600 hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </div>
            </div>
          )}
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
                {/* Add Skill Category Button - Hidden/Minimal for portfolio viewers */}
                <button
                  onClick={handleAdminClick}
                  className="fixed top-20 right-6 bg-slate-400/60 hover:bg-indigo-500/80 text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-50 opacity-30 hover:opacity-100"
                  title="Admin: Add Skill Category"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
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
                              className="bg-slate-400/60 hover:bg-indigo-500/80 text-white p-1.5 rounded-lg hover:shadow-md transition-all duration-300 opacity-50 hover:opacity-100"
                              title="Add skill to this category"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        Technology evolves rapidly, and I&apos;m committed to continuous learning and staying updated with the latest trends and best practices in web development.
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
  