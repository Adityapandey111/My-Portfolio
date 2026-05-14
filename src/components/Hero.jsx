import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Icosahedron, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ===== 3D Floating Scene ===== */
const FloatingGeometry = () => {
  const torusRef = useRef();
  const icoRef = useRef();
  const sphereRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.y = t * 0.2;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.15;
      icoRef.current.rotation.z = t * 0.25;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#915eff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#00cea8" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#bf61ff" />

      {/* Main sphere with distortion */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#915eff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#915eff"
            emissiveIntensity={0.15}
          />
        </Sphere>
      </Float>

      {/* Wireframe torus */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <Torus ref={torusRef} args={[2, 0.05, 16, 100]} position={[0, 0, -1]}>
          <meshStandardMaterial
            color="#00cea8"
            emissive="#00cea8"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>

      {/* Floating icosahedron */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron ref={icoRef} args={[0.4, 1]} position={[2.5, 1, -0.5]}>
          <MeshWobbleMaterial
            color="#bf61ff"
            factor={0.3}
            speed={1}
            wireframe
            emissive="#bf61ff"
            emissiveIntensity={0.2}
          />
        </Icosahedron>
      </Float>

      {/* Small floating spheres */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.5} floatIntensity={1 + i * 0.2}>
          <Sphere
            args={[0.06, 16, 16]}
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 3,
            ]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? '#915eff' : '#00cea8'}
              emissive={i % 2 === 0 ? '#915eff' : '#00cea8'}
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

/* ===== Typing Animation ===== */
const TypeWriter = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showCursor, setShowCursor] = React.useState(true);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  React.useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
        |
      </span>
    </span>
  );
};

/* ===== Hero Component ===== */
const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <FloatingGeometry />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#151030]/60 via-transparent to-[#151030]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#151030]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-[2] flex items-center h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-row items-start gap-5">
          {/* Decorative Line */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915eff] shadow-lg shadow-purple-500/50" />
            <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915eff] to-transparent" />
          </div>

          {/* Text Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[#aaa6c3] font-['Inter'] text-lg sm:text-xl font-medium mb-2">
                Hello, I'm
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-['Outfit'] text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
            >
              <span className="text-white">Aditya</span>{' '}
              <span className="gradient-text">Pandey</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[#aaa6c3] font-['Space_Grotesk'] text-xl sm:text-2xl font-light mb-8"
            >
              <TypeWriter text="Full Stack Developer & CS Engineer" delay={60} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-[#aaa6c3]/80 font-['Inter'] text-base sm:text-lg leading-relaxed max-w-lg mb-10"
            >
              Building modern web applications with Python, React & Django.
              MNNIT Allahabad CSE graduate, currently at TCS.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-4"
            >
              <a
                href="#contact"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-[#915eff] to-[#bf61ff] rounded-xl font-['Inter'] font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#bf61ff] to-[#915eff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#projects"
                className="px-8 py-3.5 border border-[#915eff]/30 rounded-xl font-['Inter'] font-semibold text-sm text-[#915eff] hover:bg-[#915eff]/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#915eff]/60"
              >
                View Work
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 w-full flex justify-center z-[2]"
      >
        <a href="#about">
          <div className="w-[30px] h-[50px] rounded-full border-2 border-[#915eff]/50 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              className="w-2 h-2 rounded-full bg-[#915eff]"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
