import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative border-t border-[#915eff]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#915eff] to-[#00cea8] flex items-center justify-center">
              <span className="text-white font-bold text-lg font-['Outfit']">A</span>
            </div>
            <div>
              <span className="text-white font-semibold font-['Outfit']">Aditya</span>
              <span className="text-[#915eff] font-semibold font-['Outfit']"> Pandey</span>
            </div>
          </div>

          {/* Center - Copyright */}
          <p className="text-[#aaa6c3] font-['Inter'] text-sm flex items-center gap-1.5">
            © 2024 Made with <FaHeart className="text-[#915eff] text-xs" /> by Aditya Pandey
          </p>

          {/* Right - Social */}
          <div className="flex gap-3">
            {[
              { icon: FaLinkedin, href: 'https://linkedin.com/in/aditya-pandey' },
              { icon: FaGithub, href: 'https://github.com/Adityapandey111' },
              { icon: FaEnvelope, href: 'mailto:aditya80904900@gmail.com' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-[#1a1040] border border-[#915eff]/10 flex items-center justify-center hover:border-[#915eff]/30 hover:bg-[#915eff]/10 transition-all duration-300"
              >
                <social.icon className="text-[#aaa6c3] text-sm hover:text-white" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
