'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points, Preload, useGLTF } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

useGLTF.preload('/planet/scene.gltf');

function StarField() {
  const ref = useRef();
  const sphere = useMemo(() => {
    const positions = new Float32Array(4500);
    for (let i = 0; i < positions.length; i += 3) {
      const radius = Math.cbrt(Math.random()) * 1.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 16;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#22d3ee" size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

function StarsCanvas() {
  return (
    <div className="contact-stars" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

function Earth({ scale }) {
  const earth = useGLTF('/planet/scene.gltf');
  return <primitive object={earth.scene} scale={scale} />;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [earthScale, setEarthScale] = useState(2.5);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setEarthScale(width < 420 ? 1.55 : width < 700 ? 1.95 : width < 980 ? 2.25 : 2.55);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const showMsg = (msg) => {
    setAlertMsg(msg);
    setShowAlert(true);
    window.setTimeout(() => setShowAlert(false), 3600);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSending(true);

    emailjs
      .sendForm('service_60igyvp', 'template_x0arc9d', event.target, 'nFpVEp87LmSPZPs1d')
      .then(() => {
        setFormData({ email: '', message: '' });
        showMsg("Message sent. I'll get back to you soon.");
      })
      .catch(() => showMsg('Failed to send. Please email me directly.'))
      .finally(() => setSending(false));
  };

  return (
    <div ref={ref} className="section-inner contact-section">
      <StarsCanvas />

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <p className="section-kicker">Start A Build</p>
        <h2 className="premium-heading">Get In Touch</h2>
      </motion.div>

      {showAlert && (
        <motion.div
          className="contact-alert"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert>
            <AlertTitle>Message</AlertTitle>
            <AlertDescription>{alertMsg}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div
        className="contact-grid"
        initial={{ opacity: 0, y: 34 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.72, delay: 0.14 }}
      >
        <form className="contact-form surface-panel" onSubmit={handleSubmit}>
          <div className="panel-rule" />
          <h3>Tell me about your project.</h3>

          <div className="contact-quick-links">
            <Link href="mailto:webdevairaz@gmail.com">
              <Mail size={17} />
              webdevairaz@gmail.com
            </Link>
            <a href="https://wa.me/9984400856" target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>

          <label>
            <span>Email Address</span>
            <input
              type="email"
              name="user_email"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              placeholder="Project scope, timeline, or collaboration idea"
              rows={6}
              required
            />
          </label>

          <button type="submit" className="primary-action contact-submit" disabled={sending}>
            {sending ? 'Sending' : 'Send Message'}
            <Send size={16} />
          </button>
        </form>

        <aside className="contact-orbit surface-panel">
          <div className="orbit-meta">
            <span>
              <MapPin size={16} />
              India
            </span>
            <strong>Available for freelance and product work</strong>
          </div>
          <div className="earth-stage">
            <Canvas dpr={[1, 1.7]} gl={{ preserveDrawingBuffer: true, antialias: true }} camera={{ position: [-3, 2, 6], fov: 40 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.45} />
                <pointLight position={[4, 3, 4]} intensity={2} color="#22d3ee" />
                <pointLight position={[-3, -2, 3]} intensity={1.4} color="#f59e0b" />
                <OrbitControls autoRotate enableZoom={false} enablePan={false} />
                <Earth scale={earthScale} />
                <Preload all />
              </Suspense>
            </Canvas>
          </div>
        </aside>
      </motion.div>
    </div>
  );
}
