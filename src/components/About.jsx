import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei';
import { FaCode, FaServer, FaDatabase } from 'react-icons/fa';

/* ===== 3D Animated Mesh ===== */
const AnimatedMesh = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1.5, 4]}>
        <MeshDistortMaterial
          color="#915eff"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#915eff"
          emissiveIntensity={0.1}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

/* ===== Service Card with 3D Tilt ===== */
const ServiceCard = ({ icon: Icon, title, description, index }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: (y - centerY) / 10,
      y: (centerX - x) / 10,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="glass-card glass-card-hover p-8 cursor-pointer group overflow-hidden"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#915eff]/20 to-[#00cea8]/20 border border-[#915eff]/20 flex items-center justify-center mb-6 overflow-hidden transition-all duration-300 group-hover:border-[#00cea8]/40 group-hover:shadow-lg group-hover:shadow-purple-500/10">
        <Icon className="text-2xl text-[#915eff] group-hover:text-[#00cea8] group-hover:scale-110 transition-all duration-300" />
      </div>
      <h3 className="text-white font-['Outfit'] text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[#aaa6c3] font-['Inter'] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const services = [
  {
    icon: FaCode,
    title: 'Frontend Development',
    description:
      'Building responsive, interactive UIs with React.js, modern JavaScript, and cutting-edge CSS frameworks.',
  },
  {
    icon: FaServer,
    title: 'Backend Development',
    description:
      'Crafting robust server-side applications with Python, Django REST Framework, and Node.js/Express.',
  },
  {
    icon: FaDatabase,
    title: 'Database & DevOps',
    description:
      'Designing efficient databases with SQL/NoSQL and managing deployments with modern CI/CD pipelines.',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative section-padding">
      <span className="hash-span">&nbsp;</span>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#915eff] font-['Inter'] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Introduction
          </p>
          <h2 className="text-white font-['Outfit'] text-4xl sm:text-5xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text + Cards */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#aaa6c3] font-['Inter'] text-base leading-relaxed mb-10"
            >
              I'm a Computer Science graduate from <span className="text-white font-medium">MNNIT Allahabad</span> with 
              a strong foundation in full-stack development. Currently working as a{' '}
              <span className="text-white font-medium">Python Developer at TCS</span>, I specialize in building 
              scalable web applications using Django, React, and modern cloud technologies. I'm passionate about 
              writing clean code, solving complex algorithmic challenges, and creating seamless user experiences.
            </motion.p>

            <div className="grid sm:grid-cols-3 gap-5">
              {services.map((service, index) => (
                <ServiceCard key={service.title} {...service} index={index} />
              ))}
            </div>
          </div>

          {/* Right - 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[400px] lg:h-[500px] hidden lg:block"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} color="#915eff" />
              <AnimatedMesh />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
