import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Dodecahedron, MeshDistortMaterial, Float } from '@react-three/drei';
import { FaPython, FaReact, FaJava, FaNodeJs, FaDatabase, FaGitAlt, FaCode } from 'react-icons/fa';
import { SiDjango, SiCplusplus, SiJavascript, SiMongodb, SiMysql } from 'react-icons/si';

const skills = [
  { name: 'Python', icon: FaPython, color: '#3776ab', level: 90 },
  { name: 'C++', icon: SiCplusplus, color: '#00599c', level: 85 },
  { name: 'Java', icon: FaJava, color: '#f89820', level: 75 },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 85 },
  { name: 'React.js', icon: FaReact, color: '#61dafb', level: 85 },
  { name: 'Django', icon: SiDjango, color: '#092e20', level: 88 },
  { name: 'Node.js', icon: FaNodeJs, color: '#68a063', level: 70 },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248', level: 75 },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1', level: 80 },
  { name: 'Git', icon: FaGitAlt, color: '#f05032', level: 80 },
  { name: 'DSA', icon: FaCode, color: '#915eff', level: 85 },
  { name: 'SQL', icon: FaDatabase, color: '#00cea8', level: 82 },
];

const SkillOrb = () => {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Dodecahedron ref={meshRef} args={[1.8, 2]}>
        <MeshDistortMaterial color="#00cea8" distort={0.25} speed={1.5} roughness={0.1} metalness={0.9} wireframe emissive="#00cea8" emissiveIntensity={0.15} />
      </Dodecahedron>
    </Float>
  );
};

const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 200 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card glass-card-hover p-6 flex flex-col items-center gap-4 cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-[#915eff]/5 group-hover:to-[#00cea8]/5 transition-all duration-500" />
      <div className="relative z-10">
        <skill.icon
          className="text-4xl transition-all duration-300 group-hover:scale-125"
          style={{ color: hovered ? skill.color : '#aaa6c3' }}
        />
      </div>
      <span className="text-[#aaa6c3] font-['Inter'] text-xs font-medium group-hover:text-white transition-colors duration-300 relative z-10">
        {skill.name}
      </span>
      {/* Skill level bar */}
      <div className="w-full h-1 rounded-full bg-[#1a1040] relative z-10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, #915eff, ${skill.color})` }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <span className="hash-span">&nbsp;</span>
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <p className="text-[#915eff] font-['Inter'] text-sm font-semibold uppercase tracking-[0.2em] mb-3">My toolkit</p>
          <h2 className="text-white font-['Outfit'] text-4xl sm:text-5xl font-bold">Technical <span className="gradient-text">Skills</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left skills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {skills.slice(0, 6).map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
          </div>

          {/* Center 3D */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} className="h-[350px] hidden lg:block">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00cea8" />
              <SkillOrb />
            </Canvas>
          </motion.div>

          {/* Right skills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {skills.slice(6).map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i + 6} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
