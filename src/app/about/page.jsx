'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Box, Code2, Layers3, ServerCog, Smartphone } from 'lucide-react';
import { Lens } from '@/components/ui/lens';

const highlights = [
  { icon: Code2, label: 'Frontend', desc: 'React, Next.js, Tailwind, Framer Motion' },
  { icon: ServerCog, label: 'Backend', desc: 'Node.js, Express, MongoDB, REST APIs' },
  { icon: Box, label: '3D Web', desc: 'React Three Fiber, Drei, Three.js, GSAP' },
  { icon: Smartphone, label: 'Responsive', desc: 'Mobile-first interfaces and performance' },
];

const profilePoints = [
  'Full-stack developer with a BCA background and a strong product mindset.',
  'Focused on clean interfaces, smooth interaction, and scalable web architecture.',
  'Comfortable taking a project from wireframe to polished deployment.',
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <div ref={ref} className="section-inner about-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <p className="section-kicker">Who I Am</p>
        <h2 className="premium-heading">About Me</h2>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="portrait-frame"
          initial={{ opacity: 0, x: -34 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <Lens>
            <Image
              src="/images/s1.jpg"
              alt="Airaz Khan"
              width={520}
              height={620}
              className="portrait-image"
              priority={false}
            />
          </Lens>
          <div className="portrait-badge">
            <Layers3 size={17} />
            <span>3D Web Developer</span>
          </div>
        </motion.div>

        <motion.div
          className="about-copy surface-panel"
          initial={{ opacity: 0, x: 34 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22 }}
        >
          <div className="panel-rule" />
          <h3>Building digital products with depth, speed, and visual polish.</h3>
          <p>
            I am Airaz Khan, a full-stack developer who enjoys creating modern web
            applications that feel sharp, reliable, and easy to use.
          </p>

          <div className="profile-points">
            {profilePoints.map((point) => (
              <div key={point}>
                <span />
                <p>{point}</p>
              </div>
            ))}
          </div>

          <div className="tech-strip">
            {['React', 'Next.js', 'Node.js', 'MongoDB', 'Three.js', 'GSAP', 'Tailwind', 'MUI'].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="highlight-grid"
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {highlights.map(({ icon: Icon, label, desc }) => (
          <motion.div
            key={label}
            className="highlight-card"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.48 } },
            }}
          >
            <Icon size={22} />
            <strong>{label}</strong>
            <p>{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
