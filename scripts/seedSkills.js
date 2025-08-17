// scripts/seedSkills.js - Populate skills database with initial data
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shanjanith52:qgPqs3SmWfNhH05L@cluster0.lqehf3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create skill schemas directly in this file
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

// Create or get the model
const SkillCategory = mongoose.models.SkillCategory || mongoose.model('SkillCategory', SkillCategorySchema);

const initialSkills = [
  {
    category: "Frontend Development",
    items: [
      { name: "HTML5", color: "bg-orange-500" },
      { name: "CSS3", color: "bg-blue-500" },
      { name: "JavaScript", color: "bg-yellow-500" },
      { name: "React.js", color: "bg-cyan-500" },
      { name: "Next.js", color: "bg-gray-800" },
      { name: "Tailwind CSS", color: "bg-teal-500" }
    ],
    order: 1
  },
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", color: "bg-green-600" },
      { name: "MongoDB", color: "bg-green-500" },
      { name: "Express.js", color: "bg-gray-700" },
      { name: "API Development", color: "bg-purple-500" }
    ],
    order: 2
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git", color: "bg-red-500" },
      { name: "GitHub", color: "bg-gray-800" },
      { name: "VS Code", color: "bg-blue-600" },
      { name: "Responsive Design", color: "bg-pink-500" }
    ],
    order: 3
  }
];

async function seedSkills() {
  try {
    console.log('🌱 Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Clearing existing skills...');
    await SkillCategory.deleteMany({});

    console.log('📝 Seeding skills...');
    const seededSkills = await SkillCategory.insertMany(initialSkills);

    console.log('✅ Skills seeded successfully!');
    console.log(`📊 Created ${seededSkills.length} skill categories:`);
    
    seededSkills.forEach((category, index) => {
      console.log(`   ${index + 1}. ${category.category} (${category.items.length} skills)`);
    });

    await mongoose.connection.close();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding skills:', error);
    process.exit(1);
  }
}

// Run the seeder
seedSkills();
