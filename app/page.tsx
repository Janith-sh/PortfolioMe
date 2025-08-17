// pages/index.js
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-slate-100 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-300 sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">
            Janith S Viduranga
          </h1>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-blue-700 font-semibold border-b-2 border-blue-700">Home</a>
            <a href="/projects" className="text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium">Projects</a>
            <a href="/skills" className="text-gray-600 hover:text-blue-700 transition-colors duration-300 font-medium">Skills</a>
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
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Section: Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-blue-700 font-medium animate-fade-in-up">
                  Hello! Welcome to my portfolio
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  I'M{" "}
                    <span className="text-black">
                    JANITH SHAN
                    </span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Full Stack Developer who creates modern web applications with clean code and beautiful designs.
                </p>
              </div>

              {/* Skills Preview */}
              <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"].map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium border border-gray-300 hover:shadow-md hover:scale-105 transition-all duration-300 hover:bg-slate-100 hover:border-blue-400"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
                <a 
                  href="/contact"
                  className="bg-gradient-to-r from-slate-700 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 text-center"
                >
                  Contact Me
                </a>
                <a 
                  href="/projects"
                  className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center hover:scale-105 hover:bg-slate-100 hover:border-blue-400"
                >
                  View My Work
                </a>
              </div>
            </div>

            {/* Right Section: Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group border border-gray-300">
                  <Image
                    src="/profile3.jpg"
                    alt="Janith S Viduranga - Full Stack Developer"
                    width={400}
                    height={400}
                    className="rounded-2xl w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Subtle floating indicator */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 rounded-full animate-pulse shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto text-center px-6">
          <p className="text-gray-400">
            &copy; 2025 Janith S Viduranga. All Rights Reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
