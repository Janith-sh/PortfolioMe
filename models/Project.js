import mongoose from 'mongoose';

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

// Update the updatedAt field before saving
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
