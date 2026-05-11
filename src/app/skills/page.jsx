'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Layers, Paintbrush, Server, Workflow } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

const skillsData = [
  { name: 'HTML', icon: '/asset/tech/html.png', group: 'Core' },
  { name: 'CSS', icon: '/asset/tech/css.png', group: 'Core' },
  { name: 'JavaScript', icon: '/asset/tech/javascript.png', group: 'Core' },
  { name: 'TypeScript', icon: '/asset/tech/typescript.png', group: 'Core' },
  { name: 'Python', icon: '/images/api-programming.png', group: 'Backend' },
  { name: 'React', icon: '/asset/tech/react.png', group: 'Frontend' },
  { name: 'Angular', icon: '/images/angular.png', group: 'Frontend' },
  { name: 'Next.js', icon: '/next.svg', group: 'Frontend' },
  { name: 'Redux', icon: '/asset/tech/redux.png', group: 'Frontend' },
  { name: 'Tailwind', icon: '/asset/tech/tailwind.png', group: 'Frontend' },
  { name: 'Material UI', icon: '/asset/tech/material.svg', group: 'Frontend' },
  { name: 'Node.js', icon: '/asset/tech/nodejs.png', group: 'Backend' },
  { name: 'Express', icon: '/asset/tech/expresss.webp', group: 'Backend' },
  { name: 'MongoDB', icon: '/asset/tech/mongodb.png', group: 'Backend' },
  { name: 'NoSQL', icon: '/asset/tech/mongodb.png', group: 'Backend' },
  { name: 'Three.js', icon: '/asset/tech/threejs.svg', group: 'Motion' },
  { name: 'Framer', icon: '/asset/tech/framer.png', group: 'Motion' },
  { name: 'Git', icon: '/asset/tech/git.png', group: 'Tools' },
  { name: 'GitHub', icon: '/asset/tech/github-2.png', group: 'Tools' },
  { name: 'VS Code', icon: '/asset/tech/vscode.png', group: 'Tools' },
  { name: 'Socket.io', icon: '/asset/tech/socket.png', group: 'Backend' },
];

const capabilityCards = [
  { icon: Layers, label: 'Frontend', value: 'React ecosystems', accent: '#22d3ee' },
  { icon: Server, label: 'Backend', value: 'APIs and auth', accent: '#34d399' },
  { icon: Database, label: 'Data', value: 'MongoDB models', accent: '#f59e0b' },
  { icon: Paintbrush, label: 'Interface', value: 'Motion and UI', accent: '#f472b6' },
  { icon: Workflow, label: 'Delivery', value: 'Deploy-ready builds', accent: '#a3e635' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42 } },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <div ref={ref} className="section-inner skills-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <p className="section-kicker">Technical Stack</p>
        <h2 className="premium-heading">Skills</h2>
      </motion.div>

      <motion.div
        className="capability-grid"
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {capabilityCards.map(({ icon: Icon, label, value, accent }) => (
          <motion.div
            key={label}
            className="capability-card surface-panel"
            style={{ '--accent': accent }}
            variants={item}
          >
            <Icon size={22} />
            <span>{label}</span>
            <strong>{value}</strong>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="skills-grid"
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {skillsData.map((skill) => (
          <motion.div key={skill.name} variants={item}>
            <CardContainer className="skill-tilt" containerClassName="card-container-compact">
              <CardBody className="skill-card surface-panel">
                <CardItem translateZ="56" className="skill-icon">
                  <Image src={skill.icon} alt={skill.name} width={58} height={58} />
                </CardItem>
                <CardItem translateZ="34" className="skill-label">
                  <strong>{skill.name}</strong>
                  <span>{skill.group}</span>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
