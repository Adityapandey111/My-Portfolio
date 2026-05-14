import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    title: 'Python Developer',
    company: 'Tata Consultancy Services (TCS)',
    date: '2024 - Present',
    points: [
      'Conducting weekly TOI meetings with international clients.',
      'Leading migration from legacy PHP tool to Python.',
      'Converted existing DB to use Django ORM models.',
      'Developed modular classes for performance data.',
      'Unit tested Python code to MC/DC standard.',
    ],
    iconBg: '#915eff',
  },
];

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: 'rgba(21, 16, 48, 0.6)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(145, 94, 255, 0.15)',
      borderRadius: '20px',
      boxShadow: '0 0 20px rgba(145, 94, 255, 0.1)',
      padding: '2rem',
    }}
    contentArrowStyle={{ borderRight: '7px solid rgba(145, 94, 255, 0.3)' }}
    date={experience.date}
    dateClassName="text-[#aaa6c3] font-['Inter'] !font-medium"
    iconStyle={{ background: experience.iconBg, boxShadow: `0 0 20px ${experience.iconBg}60` }}
    icon={<div className="flex justify-center items-center w-full h-full"><FaBriefcase className="text-white text-lg" /></div>}
  >
    <h3 className="text-white font-['Outfit'] text-xl font-bold">{experience.title}</h3>
    <p className="text-[#00cea8] font-['Inter'] text-sm font-semibold mt-1 !mb-0">{experience.company}</p>
    <ul className="mt-5 list-none space-y-3">
      {experience.points.map((point, i) => (
        <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
          className="text-[#aaa6c3] font-['Inter'] text-sm leading-relaxed flex items-start gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#915eff] mt-2 flex-shrink-0" />
          {point}
        </motion.li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative section-padding">
      <span className="hash-span">&nbsp;</span>
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <p className="text-[#915eff] font-['Inter'] text-sm font-semibold uppercase tracking-[0.2em] mb-3">What I've done so far</p>
          <h2 className="text-white font-['Outfit'] text-4xl sm:text-5xl font-bold">Work <span className="gradient-text">Experience</span></h2>
        </motion.div>
        <VerticalTimeline lineColor="linear-gradient(180deg, #915eff, #00cea8)">
          {experiences.map((exp, i) => <ExperienceCard key={i} experience={exp} />)}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;
