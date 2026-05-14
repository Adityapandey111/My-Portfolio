import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'experience', title: 'Experience' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'education', title: 'Education' },
  { id: 'contact', title: 'Contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ===== Scroll-based active section detection ===== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedLink = navLinks.find((link) => link.id === entry.target.id);
          if (matchedLink) {
            setActive(matchedLink.title);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setToggle(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#151030]/80 backdrop-blur-xl shadow-lg shadow-purple-900/10 border-b border-purple-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#915eff] to-[#00cea8] flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow duration-300">
              <span className="text-white font-bold text-lg font-['Outfit']">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold text-lg font-['Outfit'] tracking-wide">
                Aditya
              </span>
              <span className="text-[#915eff] font-semibold text-lg font-['Outfit']"> Pandey</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => setActive(link.title)}
                  className="relative px-4 py-2 text-sm font-medium font-['Inter'] group"
                >
                  {/* Link text */}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      active === link.title
                        ? 'text-white'
                        : 'text-[#aaa6c3] group-hover:text-white'
                    }`}
                  >
                    {link.title}
                  </span>

                  {/* Active indicator — small underline dot/bar */}
                  {active === link.title && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full bg-gradient-to-r from-[#915eff] to-[#00cea8]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover glow (subtle, only on inactive items) */}
                  {active !== link.title && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-[#915eff]/50 group-hover:w-4 transition-all duration-300" />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setToggle(!toggle)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[#915eff]/10 border border-[#915eff]/20 text-[#915eff]"
            aria-label="Toggle navigation menu"
          >
            {toggle ? <FaTimes size={18} /> : <FaBars size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#151030]/95 backdrop-blur-xl border-t border-purple-500/10 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => {
                      setActive(link.title);
                      setToggle(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-['Inter'] transition-all duration-300 ${
                      active === link.title
                        ? 'text-white'
                        : 'text-[#aaa6c3] hover:text-white'
                    }`}
                  >
                    {/* Active dot indicator */}
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                        active === link.title
                          ? 'bg-gradient-to-r from-[#915eff] to-[#00cea8] shadow-md shadow-purple-500/50 scale-100'
                          : 'bg-[#aaa6c3]/20 scale-75'
                      }`}
                    />
                    {link.title}

                    {/* Active right accent bar */}
                    {active === link.title && (
                      <motion.span
                        layoutId="mobileActiveIndicator"
                        className="ml-auto w-8 h-[3px] rounded-full bg-gradient-to-r from-[#915eff] to-[#00cea8]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
