"use client";
import "../experience/experience.css";
import "../experience/experienceResponsiveness.css";
import Skills from "../skills/page";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useInView, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

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

export default function Experience() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".exp-block").filter(el => el instanceof HTMLElement);
      if (!sections.length) return;

      // ✅ Horizontal scroll animation
      const horizontalTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
      });

      // ✅ ScrollTrigger to pin and control horizontal scroll
      ScrollTrigger.create({
        trigger: ".horizontal-scroll",
        start: "top top", // ✅ start pinning as soon as it hits top
        pin: true,
        scrub: 1,
        animation: horizontalTween,
        anticipatePin: 1,
        invalidateOnRefresh: true, // ✅ important for resizing
        end: () =>
          "+=" +
          (document.querySelector(".exp-wrapper")?.scrollWidth - window.innerWidth || 0),
      });

      // ✅ Reveal animations for text inside each block
      sections.forEach((block) => {
        const targets = block.querySelectorAll("h2, h3, p, li");
        if (!targets.length) return;

        gsap.from(targets, {
          y: 80,
          opacity: 0,
          rotateX: 15,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            containerAnimation: horizontalTween,
            start: "left center",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="experience" ref={containerRef} className="container-fluid relative ">
     <SectionHeading title="Experience" icon="🚀" />

      {/* ✅ Spacer to prevent auto jump */}
      <div className="h-[90vh]"></div>

      {/* ✅ Horizontal Scroll Section */}
      <div className="horizontal-scroll relative overflow-hidden">
       <section className="exp-wrapper flex w-[400vw] h-screen">
  <ExperienceBlock
    title="Full Stack Developer Intern"
    company="Naresh IT Hyderabad"
    duration="[March, 2023] – [June, 2023]"
    img="/images/naresh.png"
    details={[
      "Built an E-commerce store with MERN stack.",
      "Integrated payment gateways and authentication.",
      "Implemented REST APIs, JWT, and MongoDB storage.",
    ]}
  />

  <ExperienceBlock
    title="Freelance Frontend Developer"
    company="Cansell.in"
    duration="[March, 2024] – [August, 2024]"
    img="/projects/P2.png"
    details={[
      "Developed a complete responsive frontend using Next.js.",
      "Implemented custom hamburger navigation, carousel, and optimized UI.",
      "Handled UI updates, bug fixes, and post-launch support throughout the project phases.",
    ]}
  />

  <ExperienceBlock
    title="Freelance Full-Stack Developer – Certifagile"
    company="Axial Coder"
    duration="[March, 2025] – [July, 2025]"
    img="/projects/P1.png"
    details={[
      "Developed and deployed a full-stack web application using MERN stack.",
      "Built authentication, admin dashboard, and REST APIs.",
      "Worked on scalability and optimized UI performance across devices.",
      "Collaborated remotely on project requirements, fixes, and deployment over several phases.",
    ]}
  />

  <ExperienceBlock
    title="3D Model Website Developer"
    company="Personal Project"
    duration="[2024]"
    img="/projects/P4.png"
    details={[
      "Created an interactive 3D viewer with React Three Fiber and Framer Motion.",
      "Implemented hover tilt effects and smooth model rotation with performance optimizations.",
    ]}
  />
</section>

      </div>

  
    </div>
  );
}

/* ✅ Reusable Experience Card */
function ExperienceBlock({ title, company, duration, img, details, achievements }) {
  return (
    <div className="exp-block w-screen h-screen flex flex-col lg:flex-row justify-center items-center p-10">
      <CardContainer className="inter-var">
        <CardBody className="relative group/card w-[450px] h-[350px] rounded-xl p-6 border bg-gradient-to-br from-gray-800 to-black">
          <CardItem translateZ="100" className="w-full mt-4">
            <img src={img} alt={company} className="h-60 w-full object-fit rounded-xl shadow-xl" />
          </CardItem>
        </CardBody>
      </CardContainer>

      <div className="details text-gray-300 max-w-xl ml-8">
        <h2 className="text-3xl font-bold text-blue-400">{title}</h2>
        <h3 className="text-lg">{company}</h3>
        <p className="italic mb-4">{duration}</p>
        {details.map((d, i) => <li key={i}>{d}</li>)}
        <ul className="list-disc ml-5"> </ul>
      </div>
    </div>
  );
}
