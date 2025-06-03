import React, { useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
  color: string;
  description: string;
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = useMemo(() => [
    // Frontend
    { 
      name: 'HTML5', 
      level: 90, 
      icon: '🌐', 
      category: 'Frontend',
      color: 'from-orange-500 to-red-500',
      description: 'Semantic markup and modern web standards'
    },
    { 
      name: 'CSS3', 
      level: 85, 
      icon: '🎨', 
      category: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      description: 'Advanced styling and responsive design'
    },
    { 
      name: 'JavaScript', 
      level: 88, 
      icon: '⚡', 
      category: 'Frontend',
      color: 'from-yellow-500 to-orange-500',
      description: 'Modern ES6+ and asynchronous programming'
    },
    { 
      name: 'React JS', 
      level: 85, 
      icon: '⚛️', 
      category: 'Frontend',
      color: 'from-cyan-500 to-blue-500',
      description: 'Component-based UI development'
    },
    { 
      name: 'Tailwind CSS', 
      level: 80, 
      icon: '🎯', 
      category: 'Frontend',
      color: 'from-teal-500 to-cyan-500',
      description: 'Utility-first CSS framework'
    },
    { 
      name: 'Bootstrap', 
      level: 75, 
      icon: '📱', 
      category: 'Frontend',
      color: 'from-purple-500 to-pink-500',
      description: 'Responsive web design framework'
    },
    { 
      name: 'jQuery', 
      level: 70, 
      icon: '💫', 
      category: 'Frontend',
      color: 'from-blue-600 to-indigo-600',
      description: 'DOM manipulation and AJAX'
    },

    // Backend
    { 
      name: 'Node.js', 
      level: 80, 
      icon: '🚀', 
      category: 'Backend',
      color: 'from-green-500 to-emerald-500',
      description: 'Server-side JavaScript runtime'
    },
    { 
      name: 'MongoDB', 
      level: 75, 
      icon: '🍃', 
      category: 'Backend',
      color: 'from-green-600 to-lime-600',
      description: 'NoSQL database management'
    },
    { 
      name: 'MySQL', 
      level: 70, 
      icon: '🗄️', 
      category: 'Backend',
      color: 'from-blue-700 to-cyan-700',
      description: 'Relational database design'
    },

    // Languages
    { 
      name: 'C', 
      level: 85, 
      icon: '🔧', 
      category: 'Languages',
      color: 'from-gray-600 to-slate-600',
      description: 'System programming and algorithms'
    },
    { 
      name: 'C++', 
      level: 80, 
      icon: '⚙️', 
      category: 'Languages',
      color: 'from-blue-800 to-indigo-800',
      description: 'Object-oriented programming'
    },
    { 
      name: 'Python', 
      level: 75, 
      icon: '🐍', 
      category: 'Languages',
      color: 'from-yellow-600 to-blue-600',
      description: 'Scripting and automation'
    },
  ], []);

  const categories = ['All', 'Frontend', 'Backend', 'Languages'];  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const skillCardVariants = {
    hidden: { 
      opacity: 0,
      rotateY: -90,
      scale: 0.8
    },
    visible: (index: number) => ({
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1
      }
    }),
    hover: {
      y: -10,
      rotateY: 5,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const progressVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (level: number) => ({
      pathLength: level / 100,
      opacity: 1,
      transition: {
        pathLength: { 
          type: "spring", 
          duration: 2, 
          bounce: 0.2,
          delay: 0.5
        },
        opacity: { duration: 0.3, delay: 0.3 }
      }
    })
  };

  // Circular progress component
  const CircularProgress = ({ level, color }: { level: number; color: string }) => {
    const circumference = 2 * Math.PI * 40;
    
    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={progressVariants}
            custom={level}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-sm font-bold text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            {level}%
          </motion.span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 0.8, 1]
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
            Technical Skills
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            My <span className="gradient-text">Expertise</span>
          </motion.h3>
          <motion.p 
            className="text-lg text-slate-300 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Proficient in modern web technologies and programming languages, 
            constantly learning and adapting to new frameworks and tools.
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
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

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative group"
                variants={skillCardVariants}
                custom={index}
                whileHover="hover"
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <div className="glass-morphism rounded-2xl p-6 h-full relative overflow-hidden">
                  {/* Floating Icon */}
                  <motion.div 
                    className="text-5xl mb-4 relative z-10"
                    animate={{
                      y: hoveredSkill === skill.name ? -5 : 0,
                      rotate: hoveredSkill === skill.name ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Skill Name */}
                  <motion.h4 
                    className="text-xl font-bold text-white mb-2 relative z-10"
                    animate={{
                      color: hoveredSkill === skill.name ? "#3b82f6" : "#ffffff"
                    }}
                  >
                    {skill.name}
                  </motion.h4>

                  {/* Description */}
                  <motion.p 
                    className="text-sm text-slate-400 mb-6 relative z-10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredSkill === skill.name ? 1 : 0.7,
                      height: "auto"
                    }}
                  >
                    {skill.description}
                  </motion.p>

                  {/* Circular Progress */}
                  <div className="flex justify-center mb-4">
                    <CircularProgress level={skill.level} color={skill.color} />
                  </div>

                  {/* Skill Level Badge */}
                  <div className="flex justify-center">
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} text-white text-sm font-semibold`}>
                      {skill.level >= 80 ? 'Expert' : skill.level >= 70 ? 'Advanced' : 'Intermediate'}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 rounded-2xl pointer-events-none`}
                    animate={{
                      opacity: hoveredSkill === skill.name ? 0.1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating Particles */}
                  {hoveredSkill === skill.name && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
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
                            delay: i * 0.4
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="text-center glass-morphism rounded-xl p-6"
            variants={itemVariants}
          >
            <motion.div 
              className="text-3xl font-bold gradient-text mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {skills.length}+
            </motion.div>
            <div className="text-slate-300">Technologies</div>
          </motion.div>

          <motion.div 
            className="text-center glass-morphism rounded-xl p-6"
            variants={itemVariants}
          >
            <motion.div 
              className="text-3xl font-bold gradient-text mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              3+
            </motion.div>
            <div className="text-slate-300">Years Experience</div>
          </motion.div>

          <motion.div 
            className="text-center glass-morphism rounded-xl p-6"
            variants={itemVariants}
          >
            <motion.div 
              className="text-3xl font-bold gradient-text mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
            </motion.div>
            <div className="text-slate-300">Average Proficiency</div>
          </motion.div>
        </motion.div>

        {/* Learning Status */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-4 glass-morphism rounded-full px-8 py-4">
            <motion.div 
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            />
            <span className="text-slate-300">
              Always learning and exploring new technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
