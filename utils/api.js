// utils/api.js
export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api' 
  : '/api';

export async function apiCall(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Project API functions
export const projectAPI = {
  // Get all projects
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiCall(`/projects?${searchParams}`);
  },

  // Get single project
  getById: (id) => apiCall(`/projects/${id}`),

  // Create new project
  create: (projectData) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  }),

  // Update project
  update: (id, projectData) => apiCall(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  }),

  // Delete project
  delete: (id) => apiCall(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Contact API functions
export const contactAPI = {
  // Submit contact form
  submit: (contactData) => apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  }),

  // Get all contacts (admin)
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiCall(`/contact?${searchParams}`);
  },
};

// Skills API functions
export const skillsAPI = {
  // Get all skill categories
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiCall(`/skills?${searchParams}`);
  },

  // Get all categories (simplified)
  getCategories: () => apiCall('/skills/categories'),

  // Create new category
  createCategory: (categoryData) => apiCall('/skills/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  }),

  // Get specific category
  getCategory: (id) => apiCall(`/skills/categories/${id}`),

  // Update category
  updateCategory: (id, categoryData) => apiCall(`/skills/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  }),

  // Add skill to category
  addSkill: (categoryId, skillData) => apiCall(`/skills/categories/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify({
      action: 'add-skill',
      skill: skillData,
    }),
  }),

  // Remove skill from category
  removeSkill: (categoryId, skillName) => apiCall(`/skills/categories/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify({
      action: 'remove-skill',
      skill: { name: skillName },
    }),
  }),

  // Delete category
  deleteCategory: (id) => apiCall(`/skills/categories/${id}`, {
    method: 'DELETE',
  }),
};
