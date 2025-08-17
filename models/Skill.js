import mongoose from 'mongoose';

const SkillItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot be more than 50 characters'],
  },
  color: {
    type: String,
    required: [true, 'Skill color is required'],
    default: 'bg-blue-500',
    trim: true,
  }
}, { _id: false });

const SkillCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot be more than 100 characters'],
  },
  items: [SkillItemSchema],
  order: {
    type: Number,
    default: 0,
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
SkillCategorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure category names are unique
SkillCategorySchema.index({ category: 1 }, { unique: true });

export default mongoose.models.SkillCategory || mongoose.model('SkillCategory', SkillCategorySchema);