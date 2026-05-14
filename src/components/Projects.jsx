import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiReact, SiMongodb, SiExpress, SiNodedotjs } from 'react-icons/si';

const projects = [
  {
    name: 'Minder',
    description: 'A cutting-edge online dating and social media app exclusively for MNNIT, featuring a personalized matching algorithm based on user interests. Includes real-time chat for seamless communication and is built on the secure MERN stack ensuring a smooth and protected user experience.',
    tags: [
      { name: 'React', icon: SiReact, color: '#61dafb' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'Express', icon: SiExpress, color: '#ffffff' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#68a063' },
    ],
    features: [
      'Personalized matching algorithm',
      'Real-time chat functionality',
      'Secure authentication',
      'MERN stack architecture',
    ],
    gradient: 'from-[#915eff] to-[#00cea8]',
  },
];

const ProjectCard = ({ project, index }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({ x: -(y - centerY) / 15, y: (x - centerX) / 15 });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transition: 'transform 0.2s ease-out' }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      {/* Project Header with gradient */}
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} p-8 flex items-end`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors duration-300">
            <FaGithub className="text-white text-lg" />
          </div>
        </div>
        <div className="relative z-10">
          <h3 className="text-white font-['Outfit'] text-3xl font-bold">{project.name}</h3>
          <div className="flex gap-2 mt-3">
            {project.tags.map((tag) => (
              <div key={tag.name} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                <tag.icon style={{ color: tag.color }} className="text-xs" />
                <span className="text-white/90 text-xs font-['Inter']">{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Body */}
      <div className="p-8">
        <p className="text-[#aaa6c3] font-['Inter'] text-sm leading-relaxed mb-6">{project.description}</p>
        <div className="space-y-3">
          <p className="text-white font-['Outfit'] text-sm font-semibold">Key Features</p>
          {project.features.map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00cea8]" />
              <span className="text-[#aaa6c3] font-['Inter'] text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative section-padding">
      <span className="hash-span">&nbsp;</span>
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <p className="text-[#915eff] font-['Inter'] text-sm font-semibold uppercase tracking-[0.2em] mb-3">My work</p>
          <h2 className="text-white font-['Outfit'] text-4xl sm:text-5xl font-bold mb-6">Featured <span className="gradient-text">Projects</span></h2>
          <p className="text-[#aaa6c3] font-['Inter'] text-base leading-relaxed max-w-2xl">
            Following project showcases my skills and experience through a real-world example. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
          {projects.map((project, i) => <ProjectCard key={project.name} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Projects;
