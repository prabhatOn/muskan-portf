import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  category: string;
  link?: string;
  github?: string;
  image: string;
}

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const projects: Project[] = [
    {
      title: 'Hotel Booking Website',
      description: 'A full-stack hotel booking platform with features for room exploration, real-time availability, and secure booking management.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      features: [
        'Responsive and intuitive front-end interface',
        'Real-time room availability checking',
        'Secure booking management system',
        'RESTful API integration',
        'User authentication and authorization'
      ],
      category: 'Full Stack',
      image: '🏨',
      link: '#',
      github: '#'
    },
    {
      title: 'E-Commerce Website',
      description: 'A responsive and user-friendly e-commerce platform with secure authentication and admin functionality.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      features: [
        'Responsive product display interface',
        'Secure user authentication and validation',
        'Shopping cart and checkout functionality',
        'Admin panel for product management',
        'Customer data management'
      ],
      category: 'Full Stack',
      image: '🛒',
      link: '#',
      github: '#'
    },
    {
      title: 'Social Media Dashboard',
      description: 'An intuitive social media dashboard for managing profiles and posting content with tweet-like interactions.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
      features: [
        'Profile management (edit, update, delete)',
        'Text and image-based content posting',
        'Tweet-like interactions system',
        'Profile photo upload functionality',
        'Real-time user engagement'
      ],
      category: 'Full Stack',
      image: '📱',
      link: '#',
      github: '#'
    },
    {
      title: 'Personal Portfolio',
      description: 'A modern and responsive portfolio website showcasing education, skills, projects, and contact information.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Responsive design across all devices',
        'Interactive UI elements',
        'Skills and education showcase',
        'Project gallery with descriptions',
        'Contact form integration'
      ],
      category: 'Frontend',
      image: '💼',
      link: '#',
      github: '#'    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend'];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      rotateX: -15,
      y: 50
    },
    visible: (index: number) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15
      }
    }),
    hover: {
      y: -10,
      rotateX: 5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-sm uppercase tracking-wider text-blue-400 mb-4"
            variants={itemVariants}
          >
            Portfolio
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h3>
          <motion.p 
            className="text-lg text-slate-300 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            A collection of projects that showcase my skills in full-stack development, 
            from concept to deployment.
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group relative"
                variants={cardVariants}
                custom={index}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="glass-morphism rounded-2xl overflow-hidden h-full relative">
                  {/* Project Image/Icon Section */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center overflow-hidden">
                    <motion.div 
                      className="text-8xl"
                      animate={{
                        scale: hoveredProject === index ? 1.2 : 1,
                        rotate: hoveredProject === index ? 5 : 0,
                        y: hoveredProject === index ? -10 : 0
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {project.image}
                    </motion.div>
                    
                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <span className="px-4 py-2 glass-morphism text-white text-sm rounded-full font-medium">
                        {project.category}
                      </span>
                    </motion.div>

                    {/* Overlay with Action Buttons */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent flex items-end justify-center pb-8"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredProject === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="flex space-x-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: hoveredProject === index ? 0 : 20,
                          opacity: hoveredProject === index ? 1 : 0
                        }}
                        transition={{ delay: 0.1 }}
                      >
                        <motion.button 
                          className="btn-gradient text-white px-6 py-3 rounded-xl flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>View Live</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.button>
                        <motion.button 
                          className="px-6 py-3 glass-morphism text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          GitHub
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Floating Particles */}
                    {hoveredProject === index && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full"
                            initial={{
                              x: Math.random() * 100 + "%",
                              y: Math.random() * 100 + "%",
                              opacity: 0
                            }}
                            animate={{
                              y: "-100%",
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    {/* Title */}
                    <motion.h4 
                      className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300"
                      animate={{
                        x: hoveredProject === index ? 5 : 0
                      }}
                    >
                      {project.title}
                    </motion.h4>

                    {/* Description */}
                    <motion.p 
                      className="text-slate-300 mb-6 leading-relaxed"
                      animate={{
                        color: hoveredProject === index ? "#e2e8f0" : "#cbd5e1"
                      }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Features */}
                    <div className="mb-6">
                      <h5 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Key Features</h5>
                      <ul className="space-y-2">
                        {project.features.slice(0, 3).map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="text-slate-400 text-sm flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                          >
                            <motion.div 
                              className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"
                              animate={{
                                scale: hoveredProject === index ? [1, 1.3, 1] : 1,
                                backgroundColor: hoveredProject === index ? "#8b5cf6" : "#3b82f6"
                              }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                            <span className={hoveredProject === index ? "text-slate-300" : ""}>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Tech Stack</h5>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            className="px-3 py-2 glass-morphism text-blue-300 rounded-lg text-sm cursor-default"
                            whileHover={{ 
                              scale: 1.1,
                              y: -2,
                              backgroundColor: "rgba(59, 130, 246, 0.2)"
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl pointer-events-none"
                    animate={{
                      opacity: hoveredProject === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 pointer-events-none"
                    animate={{
                      opacity: hoveredProject === index ? 1 : 0,
                      scale: hoveredProject === index ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button 
            className="btn-gradient text-white px-8 py-4 rounded-xl flex items-center space-x-3 mx-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">View All Projects</span>
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
