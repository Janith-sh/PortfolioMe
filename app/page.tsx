// pages/index.js
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TypingText from "@/components/TypingText";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Janith S Viduranga
          </h1>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-indigo-600 font-semibold border-b-2 border-indigo-600">Home</Link>
            <Link href="/projects" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Projects</Link>
            <Link href="/skills" className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">Skills</Link>
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
              <Link href="/" className="block text-indigo-600 font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/projects" className="block text-slate-600 hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link href="/skills" className="block text-slate-600 hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>Skills</Link>
              <Link href="/contact" className="block text-slate-600 hover:text-indigo-600 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Section: Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-indigo-600 font-medium animate-fade-in-up">
                  Hello! Welcome to my portfolio
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  I&apos;M{" "}
                    <span className="text-slate-800">
                    JANITH SHAN
                    </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <TypingText 
                    text="Full Stack Developer who creates modern web applications with clean code and beautiful designs."
                    speed={60}
                    delay={800}
                    className="text-xl text-slate-600"
                  />
                </p>
              </div>

              {/* Skills Preview */}
              <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"].map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium border border-slate-200 hover:shadow-md hover:scale-105 transition-all duration-300 hover:bg-indigo-50 hover:border-indigo-300"
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
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 text-center"
                >
                  Contact Me
                </a>
                <a 
                  href="/projects"
                  className="bg-white/80 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-2xl font-semibold border border-slate-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center hover:scale-105 hover:bg-indigo-50 hover:border-indigo-300"
                >
                  View My Work
                </a>
              </div>
            </div>

            {/* Right Section: Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group border border-slate-200">
                  <Image
                    src="/profile3.jpg"
                    alt="Janith S Viduranga - Full Stack Developer"
                    width={400}
                    height={400}
                    className="rounded-2xl w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Subtle floating indicator */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-600 rounded-full animate-pulse shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
