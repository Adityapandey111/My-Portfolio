import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';

const educationData = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    school: 'Motilal Nehru National Institute of Technology, Allahabad',
    year: '2020 - 2024',
    grade: 'CPI - 7.07',
    location: 'Allahabad, India',
    icon: FaGraduationCap,
    color: '#915eff',
  },
  {
    degree: 'Higher Secondary (Class XII)',
    school: 'Mahashakti Vidyapith Parsada Gonda',
    year: '2018',
    grade: 'Grade - A',
    location: 'Uttar Pradesh, India',
    icon: FaSchool,
    color: '#00cea8',
  },
  {
    degree: 'Secondary School (Class X)',
    school: 'Santkabir Higher Secondary School Parsada Gonda',
    year: '2016',
    grade: 'Grade - A',
    location: 'Uttar Pradesh, India',
    icon: FaSchool,
    color: '#bf61ff',
  },
];

const EducationCard = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="glass-card glass-card-hover p-6 sm:p-8 relative overflow-hidden group"
  >
    {/* Accent line */}
    <div className="absolute top-0 left-0 w-1 h-full rounded-r-full" style={{ background: edu.color }} />
    <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full rounded-r-full transition-all duration-700" style={{ background: `linear-gradient(180deg, ${edu.color}, transparent)`, boxShadow: `0 0 20px ${edu.color}60` }} />

    <div className="flex items-center gap-4 sm:gap-5">
      {/* Icon */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}30` }}>
        <edu.icon className="text-lg sm:text-xl" style={{ color: edu.color }} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-['Outfit'] text-base sm:text-lg font-bold leading-snug">{edu.degree}</h3>
        <p className="text-[#aaa6c3] font-['Inter'] text-sm mt-1 truncate">{edu.school}</p>
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
          <span className="text-xs font-['Inter'] text-[#00cea8] font-medium">{edu.grade}</span>
          <span className="text-xs font-['Inter'] text-[#aaa6c3]">{edu.location}</span>
        </div>
      </div>

      {/* Year badge — vertically centered, spaced from right */}
      <span
        className="hidden sm:inline-flex items-center flex-shrink-0 text-xs font-['Inter'] font-semibold px-4 py-1.5 rounded-full ml-4 mr-3"
        style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
      >
        {edu.year}
      </span>
    </div>

    {/* Year badge for mobile — shown below the content */}
    <div className="sm:hidden mt-3 ml-16">
      <span
        className="inline-flex items-center text-xs font-['Inter'] font-semibold px-3 py-1 rounded-full"
        style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
      >
        {edu.year}
      </span>
    </div>
  </motion.div>
);

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="relative section-padding">
      <span className="hash-span">&nbsp;</span>
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <p className="text-[#915eff] font-['Inter'] text-sm font-semibold uppercase tracking-[0.2em] mb-3">My academic journey</p>
          <h2 className="text-white font-['Outfit'] text-4xl sm:text-5xl font-bold"><span className="gradient-text">Education</span></h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-6">
          {educationData.map((edu, i) => <EducationCard key={i} edu={edu} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Education;
