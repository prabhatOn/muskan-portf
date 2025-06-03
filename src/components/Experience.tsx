import React, { useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: 'internship' | 'project' | 'education';
}

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const experiences: ExperienceItem[] = [
    {
      role: 'MERN Stack Development Trainee',
      company: 'Infynas Learning Solutions',
      location: 'Chhattisgarh',
      period: '2024 - 2025',
      type: 'internship',
      description: [
        'Trained in MERN stack development under the guidance of a senior developer',
        'Built a full-stack Hotel Rooms Booking website using React.js, Node.js and MongoDB',
        'Designed responsive front-end using HTML, CSS, and React JS',
        'Developed RESTful APIs and handled data storage/retrieval with MongoDB',
        'Gained practical experience in version control (Git), teamwork, and agile development practices'
      ],
      technologies: ['React.js', 'Node.js', 'MongoDB', 'HTML5', 'CSS3', 'Git']
    },
    {
      role: 'Masters of Computer Application',
      company: 'Mount Carmel College',
      location: 'Bengaluru',
      period: '2023 - 2025',
      type: 'education',
      description: [
        'Currently pursuing MCA with focus on advanced programming concepts',
        'Maintaining 84% academic performance',
        'Specializing in full-stack web development and modern technologies',
        'Working on various academic and personal projects'
      ],
      technologies: ['Advanced Programming', 'Database Management', 'Software Engineering', 'Web Technologies']
    },
    {
      role: 'Bachelor of Science (Computer Science)',
      company: 'Nagarjuna Post Graduated College',
      location: 'Chhattisgarh',
      period: '2021 - 2023',
      type: 'education',
      description: [
        'Completed BSc in Computer Science with 70% marks',
        'Built strong foundation in programming fundamentals',
        'Learned core programming languages and computer science concepts',
        'Participated in various coding competitions and technical events'
      ],
      technologies: ['C', 'C++', 'Python', 'Data Structures', 'Algorithms', 'Database Systems']
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const timelineItemVariants = {
    hidden: (isEven: boolean) => ({
      opacity: 0,
      x: isEven ? -100 : 100,
      scale: 0.8,
      rotateY: isEven ? -15 : 15
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'internship':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      default:
        return '⭐';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship':
        return 'from-green-500 to-emerald-500';
      case 'education':
        return 'from-blue-500 to-cyan-500';
      case 'project':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
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
            Journey
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            My <span className="gradient-text">Experience</span>
          </motion.h3>
          <motion.p 
            className="text-lg text-slate-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A timeline of my educational journey and professional development in technology.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Animated Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-700">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
              style={{ height: timelineHeight }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Timeline Items */}
          <motion.div 
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? 'justify-start' : 'justify-end'
                  }`}
                  variants={timelineItemVariants}
                  custom={isEven}
                  whileHover="hover"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* Animated Timeline Node */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ 
                      delay: index * 0.3 + 0.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${getTypeColor(exp.type)} rounded-full flex items-center justify-center text-2xl shadow-xl relative`}>
                      <motion.span
                        animate={hoveredIndex === index ? { scale: 1.2 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getTypeIcon(exp.type)}
                      </motion.span>
                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(exp.type)} rounded-full opacity-30`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div 
                    className={`w-full md:w-5/12 ${isEven ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
                    whileHover={{
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <div className="glass-morphism rounded-2xl p-8 relative overflow-hidden group">
                      {/* Animated Header */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <motion.span 
                            className={`px-4 py-2 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(exp.type)} text-white shadow-lg`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                          </motion.span>
                          <motion.span 
                            className="text-blue-400 font-medium text-sm"
                            animate={hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }}
                          >
                            {exp.period}
                          </motion.span>
                        </div>
                        
                        <motion.h4 
                          className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300"
                          animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                        >
                          {exp.role}
                        </motion.h4>
                        
                        <div className="flex items-center text-slate-300 mb-4">
                          <span className="font-medium">{exp.company}</span>
                          <span className="mx-2">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description with staggered animation */}
                      <div className="mb-6">
                        <motion.ul className="space-y-3">
                          {exp.description.map((desc, i) => (
                            <motion.li 
                              key={i} 
                              className="text-slate-300 leading-relaxed flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={hoveredIndex === index ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <motion.span 
                                className="text-blue-400 mr-3 mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"
                                animate={{
                                  scale: hoveredIndex === index ? [1, 1.5, 1] : 1
                                }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                              />
                              {desc}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      {/* Technologies with floating animation */}
                      <div>
                        <h5 className="text-white font-medium mb-3">Technologies & Skills:</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={i}
                              className="px-3 py-2 bg-white/10 text-blue-300 rounded-full text-sm hover:bg-blue-500/20 transition-colors duration-300 cursor-pointer"
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

                      {/* Hover Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(exp.type)} opacity-0 rounded-2xl pointer-events-none`}
                        animate={{
                          opacity: hoveredIndex === index ? 0.05 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Floating Particles */}
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-blue-400 rounded-full"
                              initial={{
                                x: Math.random() * 100 + "%",
                                y: "100%",
                                opacity: 0
                              }}
                              animate={{
                                y: "-100%",
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* NCC Achievement with enhanced animation */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
        >
          <motion.div 
            className="inline-block glass-morphism rounded-2xl p-8 max-w-md mx-auto relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div 
              className="text-5xl mb-4"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🏅
            </motion.div>
            <h4 className="text-xl font-bold text-white mb-3">Special Achievement</h4>
            <p className="text-slate-300 leading-relaxed">
              <span className="text-blue-400 font-medium">NCC Cadet Award</span> - 
              Received a medal for outstanding performance and discipline at NCC Camp
            </p>

            {/* Sparkle effect */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
                repeatDelay: 1
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
