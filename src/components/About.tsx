import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 80, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0 
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background Elements with Parallax */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        style={{ y: y2 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Content */}
          <motion.div ref={contentRef} className="space-y-8" variants={itemVariants}>
            <div>
              <motion.p 
                className="body-small mb-4"
                variants={itemVariants}
              >
                About Me
              </motion.p>
              <motion.h2 
                className="heading-2 mb-6"
                variants={itemVariants}
              >
                Passionate Developer & 
                <span className="gradient-text block">Creative Thinker</span>
              </motion.h2>
            </div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <p className="body-large">
                I'm a dedicated MERN Stack Developer and UI/UX Designer currently pursuing 
                my Masters in Computer Application at Mount Carmel College, Bengaluru. 
                With a passion for creating beautiful and functional digital experiences, 
                I bring ideas to life through code.
              </p>

              <p className="body-base text-gray-300">
                My journey in technology started with a Bachelor's in Computer Science, 
                where I built a strong foundation in programming languages like C, C++, 
                and Python. I've since expanded my expertise to modern web technologies 
                including React.js, Node.js, and MongoDB.
              </p>

              <p className="body-base text-gray-300">
                I believe in continuous learning and staying updated with the latest 
                industry trends. My goal is to create innovative solutions that not only 
                meet user needs but also provide exceptional user experiences.
              </p>
            </motion.div>

            {/* Education Highlights */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h4 className="heading-4 mb-4">Education</h4>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start space-x-4 p-4 glass rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 className="body-medium text-white">Masters of Computer Application</h5>
                    <p className="body-small text-gray-400">Mount Carmel College, Bengaluru (2023-2025)</p>
                    <p className="body-small text-blue-400">84% - Current CGPA</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4 p-4 glass rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h5 className="body-medium text-white">Bachelor of Science (Computer Science)</h5>
                    <p className="body-small text-gray-400">Nagarjuna Post Graduated College, Chhattisgarh (2021-2023)</p>
                    <p className="body-small text-purple-400">70%</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Achievement */}
            <motion.div 
              className="p-6 glass rounded-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="body-medium mb-2">Recent Achievement</h4>
              <p className="body-small text-gray-300">
                🏅 <span className="text-blue-400">NCC Cadet Award</span> - 
                Received a medal for outstanding performance and discipline at NCC Camp
              </p>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div 
            ref={imageRef} 
            className="relative"
            variants={imageVariants}
          >
            <div className="relative z-10">
              {/* Profile Image Placeholder */}
              <motion.div 
                className="w-full max-w-md mx-auto aspect-square glass rounded-3xl flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"></div>
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(59, 130, 246, 0.4)',
                        '0 0 40px rgba(59, 130, 246, 0.6)',
                        '0 0 20px rgba(59, 130, 246, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-4xl font-bold text-white">MS</span>
                  </motion.div>
                  <h4 className="heading-4 mb-2">Muskan Singh</h4>
                  <p className="body-base text-blue-400">MERN Stack Developer</p>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.8, 0.5, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute top-1/4 -right-8 glass p-4 rounded-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-2xl mb-2">💻</div>
              <p className="body-small">Full Stack Development</p>
            </motion.div>

            <motion.div 
              className="absolute bottom-1/4 -left-8 glass p-4 rounded-lg"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <div className="text-2xl mb-2">🎨</div>
              <p className="body-small">UI/UX Design</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;