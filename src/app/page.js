'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTypewriter } from 'react-simple-typewriter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Cpu, Github, Linkedin, Mail } from 'lucide-react';
import About from './about/page';
import Experience from './experience/experience';
import Skills from './skills/page';
import Project from './projects/project';
import Contact from './contact/contact';

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas/HeroCanvas'), { ssr: false });

const stats = [
  { value: '1+', label: 'Years' },
  { value: '20+', label: 'Projects' },
  { value: '10+', label: 'Stacks' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/developerMark17', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/developermark17', icon: Linkedin },
  { label: 'Email', href: 'mailto:webdevairaz@gmail.com', icon: Mail },
];

function Stat({ value, label }) {
  return (
    <div className="hero-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionBand({ id, children, tone = 'default' }) {
  return (
    <section id={id} className={`premium-section premium-section--${tone}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const modelContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const [text] = useTypewriter({
    words: ['Full Stack Developer', 'Next.js Engineer', 'React Specialist', '3D Web Builder'],
    loop: true,
    delaySpeed: 1800,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      modelContainerRef.current?.classList.add('model-loaded');
    }, 950);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="portfolio-shell">
      <motion.section
        ref={heroRef}
        id="home"
        className="hero-3d-section"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div ref={modelContainerRef} className="hero-model-stage" aria-hidden="true">
          <div className="hero-scan-grid" />
          <HeroCanvas />
          <div className="hero-vignette" />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-copy surface-panel"
            initial={{ opacity: 0, x: -44 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          >
            <div className="eyebrow">
              <Cpu size={15} />
              Immersive Portfolio
            </div>

            <h1>
              Airaz
              <span>Khan</span>
            </h1>

            <p className="hero-role">
              {text}
              <span className="type-caret" />
            </p>

            <p className="hero-summary">
              I build polished full-stack products with React, Next.js, Node.js, MongoDB,
              and interactive Three.js experiences.
            </p>

            <div className="hero-actions">
              <a href="#project" className="primary-action">
                View Work
                <ArrowUpRight size={17} />
              </a>
              <a href="#contact" className="ghost-action">
                Contact
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          <motion.aside
            className="hero-command surface-panel"
            initial={{ opacity: 0, x: 44 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
          >
            <div className="command-topline">
              <span>Robot Interface</span>
              <i />
            </div>

            <div className="command-readout">
              <span>Design</span>
              <strong>Frontend Systems</strong>
            </div>
            <div className="command-readout">
              <span>Build</span>
              <strong>MERN + Next.js</strong>
            </div>
            <div className="command-readout">
              <span>Motion</span>
              <strong>R3F + GSAP</strong>
            </div>

            <div className="hero-stats">
              {stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>

            <div className="hero-socials" aria-label="Social links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.a
          className="scroll-cue"
          href="#about"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          aria-label="Scroll to about"
        >
          <ArrowDown size={17} />
        </motion.a>
      </motion.section>

      <SectionBand id="about" tone="intro">
        <About />
      </SectionBand>

      <SectionBand id="experience" tone="timeline">
        <Experience />
      </SectionBand>

      <SectionBand id="skills" tone="stack">
        <Skills />
      </SectionBand>

      <SectionBand id="project" tone="work">
        <Project />
      </SectionBand>

      <SectionBand id="contact" tone="contact">
        <Contact />
      </SectionBand>
    </main>
  );
}
