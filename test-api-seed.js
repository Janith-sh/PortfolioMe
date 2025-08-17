// Simple test to populate skills via API
const skillsData = [
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

async function seedSkillsViaAPI() {
  const baseURL = 'http://localhost:3000/api';
  
  console.log('🌱 Starting API seeding...');
  
  try {
    for (const skillCategory of skillsData) {
      console.log(`📝 Creating category: ${skillCategory.category}`);
      
      const response = await fetch(`${baseURL}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillCategory)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created category: ${result.skillCategory.category} with ${result.skillCategory.items.length} skills`);
      } else {
        const error = await response.json();
        console.error(`❌ Failed to create category ${skillCategory.category}:`, error);
      }
    }
    
    console.log('🎉 API seeding completed!');
    
  } catch (error) {
    console.error('❌ Error during API seeding:', error);
  }
}

// Run the seeding
seedSkillsViaAPI();
