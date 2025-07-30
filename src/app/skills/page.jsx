'use client'

import { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import '../skills/skills.css';

// 🔥 Animated Heading Component
const SectionHeading = ({ title, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="sticky top-0 z-50 backdrop-blur-md bg-black/40 py-4"
  >
    <div className="relative w-fit mx-auto flex flex-col items-center">
      {icon && <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 3 }} 
                  className="text-2xl mb-1">
                  {icon}
               </motion.span>}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                     bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                     bg-clip-text text-transparent animate-gradient drop-shadow-lg tracking-wider">
        {title}
      </h1>
      <span className="absolute bottom-[-10px] w-full h-[3px] bg-gradient-to-r 
                       from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg animate-pulse"></span>
    </div>
  </motion.div>
);

// ✅ Skills Data
const skillsData = [
  { name: 'HTML', icon: "/asset/tech/html.png" },
  { name: 'CSS', icon: "/asset/tech/css.png" },
  { name: 'Tailwind', icon: "/asset/tech/tailwind.png" },
  { name: 'Bootstrap', icon: "/asset/tech/bootstrap.png" },
  { name: 'JavaScript', icon: "/asset/tech/javascript.png" },
  { name: 'TypeScript', icon: "/asset/tech/typescript.png" },
  { name: 'Material UI', icon: "/asset/tech/material.svg" },
  { name: 'React', icon: "/asset/tech/react.png" },
  { name: 'Redux', icon: "/asset/tech/redux.png" },
  { name: 'Node Js', icon: "/asset/tech/nodejs.png" },
  { name: 'Express Js', icon: "/asset/tech/expresss.webp" },
  { name: 'MongoDB', icon: "/asset/tech/mongodb.png" },
  { name: 'Git', icon: "/asset/tech/git.png" },
  { name: 'Github', icon: "/asset/tech/github-2.png" },
  { name: 'Java', icon: "/asset/tech/java.png" },
  { name: 'Vs Code', icon: "/asset/tech/vscode.png" },
  { name: 'Socket', icon: "/asset/tech/socket.png" },
  { name: 'Framer', icon: "/asset/tech/framer.png" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div className="relative w-full overflow-hidden">

      {/* 🌟 Animated Background (Optional) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.7),black)] z-0"></div>

      {/* ✅ Reusable Section Heading */}
      <SectionHeading title="Skills" icon="🚀" />

      {/* ✅ Skills Section */}
      <section
        id="skills"
        className="container relative z-10 py-10"
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)"
        }}
      >
        <div className="skillsRes flex flex-col items-center">

          {/* 🎯 Top Logo */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <CardContainer className="inter-var top-image">
              <CardBody className="bg-black relative group/card border border-white/20 rounded-xl p-4 sm:p-6 w-full max-w-[90%] sm:max-w-[400px] shadow-xl hover:shadow-purple-500/30 transition">
                <CardItem translateZ="100" className="w-full mt-4">
                  <img 
                    src="/images/logo.png" 
                    alt="Skills Logo" 
                    className="w-full h-auto max-h-[200px] sm:max-h-[240px] object-contain rounded-xl" 
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* 🌟 Skills Grid */}
          <div className='hex-grid mt-10'>
            {skillsData.map((skill, index) => (
              <div key={index} className="hexagon">
                <CardContainer className="inter-var">
                  <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-gray-900 dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-4 border">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full flex flex-col items-center justify-center"
                    >
                      <img 
                        src={skill.icon} 
                        alt={`${skill.name} icon`}
                        className="w-16 h-16 object-contain mb-2"
                      />
                      <span className="text-sm font-medium text-center dark:text-white">
                        {skill.name}
                      </span>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}