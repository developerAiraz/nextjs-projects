'use client';

import Link from 'next/link';
import '../about/about.css';
import React, { useRef } from "react";
import { BackgroundGradient } from '@/components/ui/background-gradient';
import Image from "next/image";
import Skills from '../skills/page';
import Experience from '../experience/experience';
import { useInView } from 'framer-motion';
import { Lens } from '@/components/ui/lens'; // ✅ Import Lens
import { motion } from 'framer-motion';

const SectionHeading = ({ title, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="top-0 z-50 backdrop-blur-md bg-black/40 py-4"
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


export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <section id='about' className="firstSection mt-4 min-h-[150vh]">
            <SectionHeading title="About" />


        <div className="container-about mt-10">

           <div className="content-container">
          <Lens spotlightForText>
            <p className="content text-lg sm:text-xl text-gray-300 leading-relaxed">
              Hello! I'm <span className="font-bold italic text-blue-400">Airaz Khan</span>, a passionate and dedicated FullStack developer who has recently completed a <span className="text-blue-400">Bachelor of Computer Applications (BCA)</span>.  
              
              I have a strong foundation in <span className="text-blue-400">HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB</span>, and I enjoy creating intuitive and responsive web applications.

              Over the course of my journey, I've built various projects, including <span className="text-blue-400">E-Commerce</span> and <span className="text-blue-400">Video Editor App</span>, where I utilized libraries such as <span className="text-blue-400">React, Framer Motion, React Simple Typewriter, React Use Measure, and React Router</span> to deliver dynamic user experiences. Recently, I've expanded my expertise to <span className="text-blue-400">Next.js</span> for server-side rendering and static site generation, and strengthened my backend skills with <span className="text-blue-400">Core Java</span>.

              In addition to my technical abilities, I have a keen eye for design and a strong understanding of user experience principles, which I apply to every project. I am always eager to learn new technologies and stay updated with the latest industry trends.

              When I'm not coding, you can find me sharing my knowledge on my <span className="text-blue-400">Instagram</span> page, where I post coding tips and tutorials. I also enjoy maintaining my fitness through <span className="text-blue-400">Gym workouts</span>.

              I'm excited to connect with fellow developers, potential employers, and anyone interested in collaborating on innovative projects. Feel free to reach out to me via <span className="text-blue-400">Instagram</span> and <span className="text-blue-400">LinkedIn</span>.

              <br />Thank you for visiting my portfolio!
            </p>
          </Lens>
          </div>

          {/* ✅ Wrap Image with Lens */}
          <div className='sm:flex justify-center h-1/2 xl:ml-44'>
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-gradient-to-br from-black to-gray-900">
              <Lens>
                <Image
                  src={`/images/s1.jpg`}
                  alt="Airaz Khan"
                  height="400"
                  width="400"
                  className="object-contain rounded-lg"
                />
              </Lens>
            </BackgroundGradient>
          </div>
        </div>
      </section>
    </div>
  );
}
