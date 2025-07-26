export default function Skills() {
    const skills = [
      {
        category: "Frontend Development",
        items: [
          { name: "HTML5", level: 95, color: "bg-orange-500" },
          { name: "CSS3", level: 90, color: "bg-blue-500" },
          { name: "JavaScript", level: 88, color: "bg-yellow-500" },
          { name: "React.js", level: 85, color: "bg-cyan-500" },
          { name: "Next.js", level: 82, color: "bg-gray-800" },
          { name: "Tailwind CSS", level: 90, color: "bg-teal-500" }
        ]
      },
      {
        category: "Backend Development",
        items: [
          { name: "Node.js", level: 80, color: "bg-green-600" },
          { name: "MongoDB", level: 75, color: "bg-green-500" },
          { name: "Express.js", level: 78, color: "bg-gray-700" },
          { name: "API Development", level: 82, color: "bg-purple-500" }
        ]
      },
      {
        category: "Tools & Technologies",
        items: [
          { name: "Git", level: 85, color: "bg-red-500" },
          { name: "GitHub", level: 88, color: "bg-gray-800" },
          { name: "VS Code", level: 92, color: "bg-blue-600" },
          { name: "Responsive Design", level: 90, color: "bg-pink-500" }
        ]
      }
    ];

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
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {skills.map((skillCategory, categoryIndex) => (
                <div 
                  key={categoryIndex}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 hover:transform hover:-translate-y-2"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {skillCategory.category}
                  </h3>
                  <div className="space-y-6">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-sm font-medium text-gray-600">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full ${skill.color} rounded-full transform origin-left animate-progress-fill`}
                            style={{ 
                              width: `${skill.level}%`,
                              animationDelay: `${skillIndex * 0.1}s`
                            }}
                          ></div>
                        </div>
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
  