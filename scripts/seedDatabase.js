// scripts/seedDatabase.js
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create schema directly in this file
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  link: {
    type: String,
    required: [true, 'Project link is required'],
    trim: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
    default: '/project-placeholder.jpg',
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'On Hold'],
    default: 'In Progress',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.',
    link: 'https://github.com',
    technologies: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    image: '/project1.jpg',
    status: 'Completed',
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    link: 'https://github.com',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    image: '/project2.jpg',
    status: 'Completed',
    featured: false,
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather application that provides real-time weather data, forecasts, and interactive maps using external APIs.',
    link: 'https://github.com',
    technologies: ['React', 'Weather API', 'Chart.js', 'CSS3'],
    image: '/project3.jpg',
    status: 'Completed',
    featured: false,
  },
  {
    title: 'Social Media Platform',
    description: 'A modern social media platform with posts, comments, likes, and real-time messaging functionality.',
    link: 'https://github.com',
    technologies: ['MERN Stack', 'Socket.io', 'AWS S3', 'JWT'],
    image: '/project4.jpg',
    status: 'In Progress',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and modern UI design.',
    link: 'https://github.com',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/project5.jpg',
    status: 'Completed',
    featured: false,
  },
  {
    title: 'Learning Management System',
    description: 'An educational platform for online courses with video streaming, progress tracking, and interactive quizzes.',
    link: 'https://github.com',
    technologies: ['Next.js', 'MongoDB', 'Video.js', 'Stripe'],
    image: '/project6.jpg',
    status: 'In Progress',
    featured: false,
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('Inserted sample projects');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
