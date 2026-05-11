'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

const projects = [
  {
    title: 'CraftResume AI',
    desc: 'AI resume builder with instant generation, ATS scoring, template switching, PDF export, and shareable resumes.',
    stack: ['AI Resume', 'Gemini AI', 'ATS Score', 'Templates', 'PDF Export'],
    link: 'https://craftresume.dev',
    accent: '#a3e635',
    metrics: ['90s generation', '90+ templates', 'ATS-ready'],
  },
  {
    title: 'E-Commerce',
    video: '/videos/webApp.mp4',
    desc: 'Shopping application with product browsing, cart flows, filtering, and chat support.',
    stack: ['React', 'Bootstrap', 'MUI', 'Axios', 'Formik'],
    link: 'https://ecommercereactmark.vercel.app/',
    accent: '#22d3ee',
  },
  {
    title: 'Video Player',
    video: '/videos/Video-App.mp4',
    desc: 'Full-stack streaming app with admin workflows, authentication, and a polished viewing UI.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind', 'NextAuth'],
    accent: '#34d399',
  },
  {
    title: '3D Model Website',
    video: '/videos/imfanim.mp4',
    desc: 'Interactive model viewer with 3D rotation, hover depth, and animated page transitions.',
    stack: ['React', 'Three.js', 'R3F', 'Spring', 'Framer'],
    accent: '#f59e0b',
  },
  {
    title: 'ToDo App',
    video: '/videos/To-do-app.mp4',
    desc: 'Task manager with authentication, daily persistence, and notification feedback.',
    stack: ['Next.js', 'Tailwind', 'Shadcn', 'NextAuth', 'Formik'],
    accent: '#f472b6',
  },
];

export default function Project() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <div ref={ref} className="section-inner project-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <p className="section-kicker">Selected Work</p>
        <h2 className="premium-heading">Projects</h2>
      </motion.div>

      <motion.div
        className="project-grid"
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            variants={{
              hidden: { opacity: 0, y: 34 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
          >
            <CardContainer className="project-tilt" containerClassName="card-container-compact">
              <CardBody className="project-card surface-panel" style={{ '--accent': project.accent }}>
                <CardItem translateZ="70" className="project-video-frame">
                  {project.video ? (
                    <video
                      src={project.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      aria-label={`${project.title} preview`}
                    />
                  ) : (
                    <div className="project-product-shot">
                      <div className="resume-preview">
                        <span />
                        <span />
                        <span />
                        <strong>ATS 94%</strong>
                      </div>
                      <div className="project-metrics">
                        {project.metrics.map((metric) => (
                          <span key={metric}>{metric}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="video-badge">
                    <PlayCircle size={16} />
                    <span>0{index + 1}</span>
                  </div>
                </CardItem>

                <CardItem translateZ="44" className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </CardItem>

                <CardItem translateZ="32" className="project-stack">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </CardItem>

                {project.link && (
                  <CardItem translateZ="26" className="project-link">
                    <Link href={project.link} target="_blank" rel="noreferrer">
                      View Live
                      <ExternalLink size={15} />
                    </Link>
                  </CardItem>
                )}
              </CardBody>
            </CardContainer>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
