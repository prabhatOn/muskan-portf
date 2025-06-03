import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Start animations after component mount
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: 0.3
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="body-small text-green-400">Available for Work</span>
        </motion.div>

        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-4">
          <p className="body-small">Hello, I'm</p>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="heading-1 gradient-text mb-6"
        >
          MUSKAN SINGH
        </motion.h1>

        {/* Role with Typewriter Effect */}
        <motion.div variants={textVariants} className="mb-8">
          <motion.p 
            className="heading-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
              className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-blue-400"
            >
              MERN Stack Developer
            </motion.span>
          </motion.p>
          <motion.p 
            className="heading-3 text-purple-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            & UI/UX Designer
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="body-large max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Crafting beautiful, functional, and user-centered digital experiences with modern technologies. 
          Currently pursuing Masters in Computer Application with expertise in full-stack development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            onClick={() => scrollToSection('#projects')}
            className="btn btn-primary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View My Work</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="btn btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Location */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center text-gray-400"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>Bengaluru, India</span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center cursor-pointer"
          onClick={() => scrollToSection('#about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-3 bg-white/40 rounded-full mt-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>    </section>
  );
};

export default Hero;
