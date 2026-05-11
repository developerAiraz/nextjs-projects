'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BadgeCheck, BriefcaseBusiness, CalendarDays } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Roadcast',
    duration: 'Current Role',
    img: '/images/developer.png',
    accent: '#a3e635',
    details: [
      'Building full-stack product features with Angular on the frontend and Python services on the backend.',
      'Working with NoSQL data models, APIs, dashboards, and operational workflows.',
      'Handling responsive UI polish, integrations, and production fixes across active modules.',
    ],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Naresh IT Hyderabad',
    duration: 'March 2023 - June 2023',
    img: '/images/naresh.png',
    accent: '#22d3ee',
    details: [
      'Built an e-commerce store with the MERN stack.',
      'Integrated authentication, payments, REST APIs, and MongoDB storage.',
      'Improved UI structure for product browsing and checkout flows.',
    ],
  },
  {
    title: 'Freelance Frontend Developer',
    company: 'Cansell.in',
    duration: 'March 2024 - August 2024',
    img: '/projects/P2.png',
    accent: '#34d399',
    details: [
      'Developed a responsive frontend using Next.js.',
      'Implemented navigation, carousel interactions, and optimized layouts.',
      'Handled interface updates, bug fixes, and post-launch support.',
    ],
  },
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Certifagile - Axial Coder',
    duration: 'March 2025 - July 2025',
    img: '/projects/P1.png',
    accent: '#f59e0b',
    details: [
      'Developed and deployed a full-stack MERN application.',
      'Built authentication, admin dashboard, and production REST APIs.',
      'Collaborated remotely on requirements, fixes, and deployment.',
    ],
  },
  {
    title: '3D Model Website Developer',
    company: 'Personal Project',
    duration: '2024',
    img: '/projects/p4.png',
    accent: '#f472b6',
    details: [
      'Created an interactive 3D model viewer with React Three Fiber.',
      'Added hover tilt, smooth model rotation, and motion polish.',
      'Balanced visual quality with responsive browser performance.',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <div ref={ref} className="section-inner experience-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <p className="section-kicker">Career Signal</p>
        <h2 className="premium-heading">Experience</h2>
      </motion.div>

      <div className="experience-track">
        {experiences.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.title}`}
            className="experience-item"
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.58, delay: 0.12 + index * 0.1 }}
          >
            <div className="timeline-marker" style={{ '--accent': item.accent }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>

            <CardContainer className="experience-tilt" containerClassName="card-container-compact">
              <CardBody className="experience-card surface-panel">
                <CardItem translateZ="55" className="experience-media">
                  <Image src={item.img} alt={item.company} width={520} height={320} />
                </CardItem>

                <CardItem translateZ="38" className="experience-content">
                  <div className="experience-meta" style={{ '--accent': item.accent }}>
                    <span>
                      <BriefcaseBusiness size={15} />
                      {item.company}
                    </span>
                    <span>
                      <CalendarDays size={15} />
                      {item.duration}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>
                        <BadgeCheck size={16} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
