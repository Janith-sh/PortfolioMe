"use client";

import { useState } from 'react';

export default function Skills() {
    const initialSkills = [
      {
        id: 1,
        category: "Frontend Development",
        items: [
          { name: "HTML5", color: "bg-orange-500" },
          { name: "CSS3", color: "bg-blue-500" },
          { name: "JavaScript", color: "bg-yellow-500" },
          { name: "React.js", color: "bg-cyan-500" },
          { name: "Next.js", color: "bg-gray-800" },
          { name: "Tailwind CSS", color: "bg-teal-500" }
        ]
      },
      {
        id: 2,
        category: "Backend Development",
        items: [
          { name: "Node.js", color: "bg-green-600" },
          { name: "MongoDB", color: "bg-green-500" },
          { name: "Express.js", color: "bg-gray-700" },
          { name: "API Development", color: "bg-purple-500" }
        ]
      },
      {
        id: 3,
        category: "Tools & Technologies",
        items: [
          { name: "Git", color: "bg-red-500" },
          { name: "GitHub", color: "bg-gray-800" },
          { name: "VS Code", color: "bg-blue-600" },
          { name: "Responsive Design", color: "bg-pink-500" }
        ]
      }
    ];

    const [skills, setSkills] = useState(initialSkills);
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

    const handleAddCategory = (e) => {
      e.preventDefault();
      if (newCategory.trim()) {
        const newSkillCategory = {
          id: Date.now(),
          category: newCategory.trim(),
          items: []
        };
        setSkills([...skills, newSkillCategory]);
        setNewCategory('');
        setShowAddCategoryForm(false);
      }
    };

    const handleAddSkill = (e) => {
      e.preventDefault();
      if (newSkillName.trim() && selectedCategoryId) {
        const updatedSkills = skills.map(skillCategory => {
          if (skillCategory.id === selectedCategoryId) {
            return {
              ...skillCategory,
              items: [...skillCategory.items, { name: newSkillName.trim(), color: newSkillColor }]
            };
          }
          return skillCategory;
        });
        setSkills(updatedSkills);
        setNewSkillName('');
        setNewSkillColor('bg-blue-500');
        setShowAddSkillForm(false);
        setSelectedCategoryId(null);
      }
    };

    const handleAddSkillToCategory = (categoryId) => {
      setSelectedCategoryId(categoryId);
      setShowAddSkillForm(true);
    };

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
              <a href="/projects" className="text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium">Projects</a>
              <a href="/skills" className="text-blue-700 font-semibold border-b-2 border-blue-700">Skills</a>
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
          <div className="container mx-auto max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                My <span className="bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">Skills</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Passionate about creating exceptional digital experiences through modern web technologies 
                and innovative solutions that bring ideas to life.
              </p>
              
              {/* Add Category Button */}
              <div className="mt-8">
                <button
                  onClick={handleAdminClick}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
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

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {skills.map((skillCategory, categoryIndex) => (
                <div 
                  key={skillCategory.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 hover:transform hover:-translate-y-2"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {skillCategory.category}
                    </h3>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleAddSkillToCategory(skillCategory.id)}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                        title="Add skill to this category"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex} 
                        className={`${skill.color} text-white px-4 py-2 rounded-full font-medium text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                      >
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Skills Section */}
            <div className="mt-16 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Always Learning</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Technology evolves rapidly, and I'm committed to continuous learning and staying updated with the latest trends and best practices in web development.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["TypeScript", "Docker", "AWS", "GraphQL", "Testing", "UI/UX Design"].map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-slate-600 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

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
                <p className="text-gray-600">Enter the admin password to manage skills</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
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

        {/* Add Category Form Modal */}
        {showAddCategoryForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add New Skill Category</h3>
                <button
                  onClick={() => setShowAddCategoryForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleAddCategory} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Frontend Development, Backend Development"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-slate-700 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
                <h3 className="text-2xl font-bold text-gray-900">Add New Skill</h3>
                <button
                  onClick={() => setShowAddSkillForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleAddSkill} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React.js, TypeScript, Docker"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge Color
                  </label>
                  <select
                    value={newSkillColor}
                    onChange={(e) => setNewSkillColor(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Color Preview */}
                  <div className="mt-3">
                    <span className="text-sm text-gray-600">Preview: </span>
                    <span className={`${newSkillColor} text-white px-3 py-1 rounded-full text-sm font-medium inline-block`}>
                      {newSkillName || 'Sample Skill'}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-slate-700 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Add Skill
                </button>
              </form>
            </div>
          </div>
        )}
  
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
  