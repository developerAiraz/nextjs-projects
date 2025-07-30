'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import '../app/style.css';
import About from './about/page';
import Experience from './experience/experience';
import Skills from './skills/page';

import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { OrbitControls, useGLTF, Html, useProgress, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import Project from './projects/project';
import Contact from './contact/contact';

// ✅ 3D Model Component
function Computers({ isMobile }) {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={4} groundColor="black" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      <pointLight intensity={2} />
      <primitive object={computer.scene} scale={isMobile ? 0.7 : 1.5} position={isMobile ? [1, 0, 0] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} />
    </mesh>
  );
}

// ✅ Loader for 3D Model
export function Loader() {
  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-load"></span>
      <p style={{ fontSize: 14, color: 'white', fontWeight: 300, marginTop: 40 }}>
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
}

export default function Home() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Scroll Animation with Framer Motion
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const firstLineWords = [
    { text: "Hey", className: "text-blue-500 text-white" },
    { text: "I'm", className: "text-blue-500 text-white" },
    { text: "Airaz", className: "text-blue-500 text-white" },
  ];

  const [text] = useTypewriter({
    words: ["Full Stack Developer.", "Web Developer.", "React Developer.", "Angular Developer."],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <main className="flex flex-col items-center justify-between h-auto bg-black">
      
      {/* 🔥 Hero Section with 3D Model */}
      <motion.div 
        ref={ref} 
        style={{ rotateX, scale, opacity, perspective: 1200 }} 
        className="w-full h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden rounded-md relative z-10"
      >
        <Canvas frameloop="demand" shadows dpr={[1, 2]} camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }} style={{ height: "300px", marginTop: '100px' }}>
          <Suspense fallback={<Loader />}>
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            <Computers isMobile={isMobile} />
          </Suspense>
          <Preload all />
        </Canvas>

        <TypewriterEffect words={firstLineWords} className="mb-10 mt-10 firstLine" />
        <div className="text-blue-500 text-xl md:text-3xl lg:text-5xl font-bold textTypewriter">
          {text}
          <span className="inline-block bg-blue-500 h-5 md:h-10 w-[4px] ml-1 animate-blink"></span>
        </div>
      </motion.div>

      {/* ✅ About Section */}
      <section className="relative  w-full bg-black">
        <About />
      </section>

      {/* ✅ Experience Section (Horizontal Scroll) */}
      <section className="relative  w-full">
        <Experience />
      </section>

      {/* ✅ Skills Section */}
      <section className=" bg-black ">
        <Skills />
      </section>

      <section className=" ">
       <Project/>
      </section>

      

    </main>
  );
}
