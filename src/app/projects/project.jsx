"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { CardContainer, CardItem, CardBody } from "@/components/ui/3d-card";
import Contact from "../contact/contact";
import Link from "next/link";
import { motion } from 'framer-motion';
import "../projects/project.css";

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ title, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="sticky top-0 z-50 backdrop-blur-md bg-black/40 py-4"
  >
    <div className="relative w-fit mx-auto flex flex-col items-center">
      {icon && (
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-xl sm:text-2xl mb-1"
        >
          {icon}
        </motion.span>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold 
                     bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                     bg-clip-text text-transparent animate-gradient drop-shadow-lg tracking-wider">
        {title}
      </h1>
      <span className="absolute bottom-[-10px] w-full h-[2px] sm:h-[3px] bg-gradient-to-r 
                       from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg animate-pulse"></span>
    </div>
  </motion.div>
);

export default function Project() {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = gsap.utils.toArray(".project-card");
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Desktop: Horizontal scroll
      const horizontalTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (sections.length * window.innerWidth),
        },
      });

      // Desktop: Tilt animation
      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: "top top",
        end: () => "+=" + (sections.length * window.innerWidth),
        scrub: true,
        onUpdate: () => {
          sections.forEach((sec) => {
            const card = sec.querySelector(".tilt-card");
            const rect = sec.getBoundingClientRect();
            const center = window.innerWidth / 2;
            const dist = (rect.left + rect.width / 2) - center;
            const norm = gsap.utils.clamp(-1, 1, dist / center);
            const rotation = -norm * 25;
            const scale = Math.abs(norm) < 0.3 ? 1.05 : 0.95;

            gsap.to(card, { rotationY: rotation, scale: scale, transformPerspective: 1200, duration: 0.2 });
          });
        },
      });
    } else {
      // Mobile: Fade-in and scale animation
      sections.forEach((sec) => {
        const card = sec.querySelector(".tilt-card");
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <div className="overflow-hidden" id="project">
      <SectionHeading title="Projects" icon="🚀" />

      {/* Desktop: Horizontal Scroll | Mobile: Vertical Stack */}
      <div
        ref={scrollRef}
        className="relative w-full md:h-screen md:w-[99vw] md:overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:h-full md:w-[400vw]">
          {/* Project 1 */}
          <div className="project-card w-full md:w-screen min-h-[600px] md:h-screen flex justify-center items-center p-4 sm:p-6">
            <div className="tilt-card w-full max-w-[90%] sm:max-w-[30rem]">
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-black to-gray-900 group/card hover:shadow-2xl hover:shadow-emerald-500/20 border border-gray-800 w-full h-auto rounded-xl p-4">
                  <CardItem translateZ="50" className="text-lg sm:text-xl font-bold text-white">
                    E-Commerce
                  </CardItem>
                  <CardItem className="w-full mt-4">
                    <video
                      src="/videos/webApp.mp4"
                      controls
                      className="w-full h-auto max-h-[200px] sm:max-h-[300px] rounded-xl shadow-lg"
                    ></video>
                  </CardItem>
                  <CardItem translateZ="100">
                    <Card className="bg-transparent border-none shadow-none">
                      <CardContent className="text-gray-300 text-sm sm:text-base space-y-4">
                        <p className="reveal-item">Shopping application with cart, filtering, and chat support.</p>
                        <p className="reveal-item">
                          <b>Tech Stack:</b> React, Bootstrap, MUI, Axios, Formik
                        </p>
                        <Link href="https://ecommercereactmark.vercel.app/" className="text-blue-400 reveal-item">
                          Visit Project
                        </Link>
                        <p className="reveal-item">Google Sign-in | Socket.io Chat | Captcha</p>
                      </CardContent>
                    </Card>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card w-full md:w-screen min-h-[600px] md:h-screen flex justify-center items-center p-4 sm:p-6">
            <div className="tilt-card w-full max-w-[90%] sm:max-w-[30rem]">
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-black to-gray-900 group/card hover:shadow-2xl hover:shadow-emerald-500/20 border border-gray-800 w-full h-auto rounded-xl p-4">
                  <CardItem translateZ="50" className="text-lg sm:text-xl font-bold text-white">
                    Video Player
                  </CardItem>
                  <CardItem className="w-full mt-4">
                    <video
                      src="/videos/Video-App.mp4"
                      controls
                      className="w-full h-auto max-h-[200px] sm:max-h-[300px] rounded-xl shadow-lg"
                    ></video>
                  </CardItem>
                  <CardItem translateZ="100">
                    <Card className="bg-transparent border-none shadow-none">
                      <CardContent className="text-gray-300 text-sm sm:text-base space-y-4">
                        <p className="reveal-item">Streaming app with admin dashboard.</p>
                        <p className="reveal-item">
                          <b>Tech Stack:</b> Next.js, Node.js, MongoDB, Tailwind, NextAuth.js
                        </p>
                        <p className="reveal-item">CRUD Admin Panel | GitHub & Google Auth</p>
                      </CardContent>
                    </Card>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card w-full md:w-screen min-h-[600px] md:h-screen flex justify-center items-center p-4 sm:p-6">
            <div className="tilt-card w-full max-w-[90%] sm:max-w-[30rem]">
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-black to-gray-900 group/card hover:shadow-2xl hover:shadow-emerald-500/20 border border-gray-800 w-full h-auto rounded-xl p-4">
                  <CardItem translateZ="50" className="text-lg sm:text-xl font-bold text-white">
                    3D Model Website
                  </CardItem>
                  <CardItem className="w-full mt-4">
                    <video
                      src="/videos/imfanim.mp4"
                      controls
                      className="w-full h-auto max-h-[200px] sm:max-h-[300px] rounded-xl shadow-lg"
                    ></video>
                  </CardItem>
                  <CardItem translateZ="100">
                    <Card className="bg-transparent border-none shadow-none">
                      <CardContent className="text-gray-300 text-sm sm:text-base space-y-4">
                        <p className="reveal-item">Interactive 3D model viewer using React Three.js & Framer Motion.</p>
                        <p className="reveal-item">
                          <b>Libraries:</b> React, Three.js, Fiber, Spring, Motion
                        </p>
                      </CardContent>
                    </Card>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>

          {/* Project 4 */}
          <div className="project-card w-full md:w-screen min-h-[600px] md:h-screen flex justify-center items-center p-4 sm:p-6">
            <div className="tilt-card w-full max-w-[90%] sm:max-w-[30rem]">
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-black to-gray-900 group/card hover:shadow-2xl hover:shadow-emerald-500/20 border border-gray-800 w-full h-auto rounded-xl p-4">
                  <CardItem translateZ="50" className="text-lg sm:text-xl font-bold text-white">
                    ToDo App
                  </CardItem>
                  <CardItem className="w-full mt-4">
                    <video
                      src="/videos/To-do-app.mp4"
                      controls
                      className="w-full h-auto max-h-[200px] sm:max-h-[300px] rounded-xl shadow-lg"
                    ></video>
                  </CardItem>
                  <CardItem translateZ="100">
                    <Card className="bg-transparent border-none shadow-none">
                      <CardContent className="text-gray-300 text-sm sm:text-base space-y-4">
                        <p className="reveal-item">Task manager app with authentication and daily task saving.</p>
                        <p className="reveal-item">
                          <b>Libraries:</b> Next.js, Tailwind, Shadcn UI, NextAuth.js
                        </p>
                        <p className="reveal-item">Formik Validation | Toast Notifications</p>
                      </CardContent>
                    </Card>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Space after scroll */}
      <div className="h-[100px] md:h-[300px] w-full"></div>

      {/* Contact Section */}
      <section className="mt-16 md:mt-32">
        <Contact />
      </section>
    </div>
  );
}