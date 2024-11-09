import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projects = [
    { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with React and Node.js', icon: '🛍️' },
    { id: 2, title: 'Task Management App', description: 'A responsive web app for managing tasks and projects', icon: '📋' },
    { id: 3, title: 'Portfolio Website', description: 'A customizable portfolio template for developers', icon: '🌐' },
  ];

  const skills = [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'JavaScript', level: 85, icon: '🟨' },
    { name: 'HTML/CSS', level: 95, icon: '🎨' },
    { name: 'Node.js', level: 80, icon: '🟩' },
    { name: 'Express', level: 75, icon: '🚂' },
    { name: 'MongoDB', level: 70, icon: '🍃' },
    { name: 'Git', level: 85, icon: '🔀' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateRotation = (element) => {
    if (!element) return '';
    const rect = element.getBoundingClientRect();
    const x = (mousePosition.y - rect.top) / rect.height - 0.5;
    const y = (mousePosition.x - rect.left) / rect.width - 0.5;
    return `perspective(1000px) rotateX(${-x * 10}deg) rotateY(${y * 10}deg)`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-4xl font-bold text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Vishrut</h1>
          <nav>
            <ul className="flex space-x-4">
              {['about', 'projects', 'skills', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`${
                      activeSection === section ? 'font-bold border-b-2 border-blue-400' : ''
                    } hover:text-blue-300 transition-all duration-200 transform hover:scale-110`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-20 p-4">
        <section className={`transition-all duration-500 ${activeSection === 'about' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Vishrut</h2>
              <h3 className="text-3xl font-semibold mb-4 text-blue-200">Full Stack Developer</h3>
              <p className="text-xl leading-relaxed text-gray-300">
                Passionate about crafting beautiful, functional, and user-friendly web experiences. 
                With a strong foundation in both front-end and back-end technologies, 
                I bring ideas to life through clean code and intuitive design.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg transform hover:scale-105 transition-all duration-300" style={{ transform: calculateRotation(document.querySelector('.profile-image')) }}>
                <img src="/api/placeholder/400/400" alt="Vishrut" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">My Journey</h3>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-blue-500 transform -translate-x-1/2"></div>
              {[
                { year: '2018', event: 'Started learning web development', icon: '🚀' },
                { year: '2020', event: 'Graduated with a degree in Computer Science', icon: '🎓' },
                { year: '2021', event: 'Landed first job as a Junior Web Developer', icon: '💼' },
                { year: 'Now', event: 'Working as a Full Stack Developer', icon: '💻' }
              ].map((item, index) => (
                <div key={index} className="relative mb-12">
                  <div className={`absolute top-0 ${index % 2 === 0 ? 'left-1/2 pl-8' : 'right-1/2 pr-8'} w-1/2`}>
                    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300" style={{ transform: calculateRotation(document.querySelector(`.journey-card-${index}`)) }}>
                      <div className="flex items-center mb-2">
                        <span className="text-3xl mr-4">{item.icon}</span>
                        <span className="text-2xl font-bold text-blue-300">{item.year}</span>
                      </div>
                      <p className="text-lg">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`transition-all duration-500 ${activeSection === 'projects' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300" style={{ transform: calculateRotation(document.querySelector(`.project-card-${index}`)) }}>
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 text-blue-300">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <a href="#" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">View Project</a>
              </div>
            ))}
          </div>
        </section>

        <section className={`transition-all duration-500 ${activeSection === 'skills' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300" style={{ transform: calculateRotation(document.querySelector(`.skill-card-${index}`)) }}>
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 text-blue-300">{skill.name}</h3>
                <div className="relative w-full h-2 bg-gray-300 rounded-full">
                  <div className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`transition-all duration-500 ${activeSection === 'contact' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Contact Me</h2>
          <form className="max-w-lg mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 rounded-md bg-gray-900 text-white focus:outline-none" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 rounded-md bg-gray-900 text-white focus:outline-none" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea id="message" className="w-full px-4 py-2 rounded-md bg-gray-900 text-white focus:outline-none"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg text-center py-4">
        <p className="text-gray-400">&copy; 2024 Vishrut. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
