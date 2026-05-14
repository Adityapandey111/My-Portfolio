import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'aditya80904900@gmail.com', href: 'mailto:aditya80904900@gmail.com' },
  { icon: FaPhone, label: 'Phone', value: '+91-6307343564', href: 'tel:+916307343564' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Gonda, Uttar Pradesh, India', href: '#' },
];

const socialLinks = [
  { icon: FaLinkedin, href: 'https://linkedin.com/in/aditya-pandey', label: 'LinkedIn', color: '#0077b5' },
  { icon: FaGithub, href: 'https://github.com/Adityapandey111', label: 'GitHub', color: '#ffffff' },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:aditya80904900@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
  };

  return (
    <section id="contact" className="relative section-padding">
      <span className="hash-span">&nbsp;</span>
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <p className="text-[#915eff] font-['Inter'] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Get in touch</p>
          <h2 className="text-white font-['Outfit'] text-4xl sm:text-5xl font-bold">Contact <span className="gradient-text">Me</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="space-y-6">
            <p className="text-[#aaa6c3] font-['Inter'] text-base leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
            </p>

            {contactInfo.map((info, i) => (
              <motion.a key={i} href={info.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="glass-card glass-card-hover p-5 flex items-center gap-4 group block">
                <div className="w-12 h-12 rounded-xl bg-[#915eff]/10 border border-[#915eff]/20 flex items-center justify-center group-hover:bg-[#915eff]/20 transition-all duration-300">
                  <info.icon className="text-[#915eff] text-lg" />
                </div>
                <div>
                  <p className="text-[#aaa6c3] font-['Inter'] text-xs uppercase tracking-wider">{info.label}</p>
                  <p className="text-white font-['Inter'] text-sm font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social, i) => (
                <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1, type: 'spring' }} viewport={{ once: true }}
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:bg-[#915eff]/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <social.icon className="text-[#aaa6c3] text-lg group-hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
            className="glass-card p-8 space-y-6">
            {['name', 'email'].map((field) => (
              <div key={field} className="relative">
                <label className="block text-[#aaa6c3] font-['Inter'] text-xs uppercase tracking-wider mb-2 capitalize">{field === 'name' ? 'Your Name' : 'Your Email'}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field)}
                  onBlur={() => setFocused('')}
                  required
                  placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                  className={`w-full bg-[#1a1040] border rounded-xl px-5 py-3.5 text-white font-['Inter'] text-sm outline-none transition-all duration-300 placeholder:text-[#aaa6c3]/30 ${focused === field ? 'border-[#915eff] shadow-lg shadow-purple-500/10' : 'border-[#915eff]/20 hover:border-[#915eff]/40'}`}
                />
              </div>
            ))}
            <div className="relative">
              <label className="block text-[#aaa6c3] font-['Inter'] text-xs uppercase tracking-wider mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                required
                rows={5}
                placeholder="Hello Aditya, I'd like to..."
                className={`w-full bg-[#1a1040] border rounded-xl px-5 py-3.5 text-white font-['Inter'] text-sm outline-none transition-all duration-300 resize-none placeholder:text-[#aaa6c3]/30 ${focused === 'message' ? 'border-[#915eff] shadow-lg shadow-purple-500/10' : 'border-[#915eff]/20 hover:border-[#915eff]/40'}`}
              />
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#915eff] to-[#bf61ff] rounded-xl font-['Inter'] font-semibold text-sm text-white flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
              <FaPaperPlane className="text-sm" />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
