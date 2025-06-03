import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.2]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];
  useEffect(() => {
    const handleScroll = () => {
      // Scroll handler for future use
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: 0.5
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-xl"
          style={{ 
            backgroundColor: `rgba(10, 10, 10, ${backgroundOpacity})`,
            borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})`
          }}
        />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="text-2xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#home')}
            >
              MS
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 py-2 px-3"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Resume Button */}
            <motion.button
              className="hidden md:block btn btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-6 h-0.5 bg-white absolute"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -4
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-white absolute"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-white absolute"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 4
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <motion.div
          className="absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-xl border-l border-white/10"
          variants={mobileMenuVariants}
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
        >
          <div className="p-6 pt-24">
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-xl text-gray-300 hover:text-white transition-colors duration-300 py-2"
                  variants={menuItemVariants}
                  custom={index}
                  initial="closed"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                className="btn btn-primary w-full mt-8"
                variants={menuItemVariants}
                custom={navItems.length}
                initial="closed"
                animate={isMobileMenuOpen ? "open" : "closed"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Resume
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;
