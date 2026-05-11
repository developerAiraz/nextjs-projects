'use client';

import { Suspense, useEffect, useRef } from 'react';
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  Html,
  Sparkles,
  useGLTF,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ROBOT_PATH = '/character/robot.glb';

useGLTF.preload(ROBOT_PATH);

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="canvas-loader">
        <span className="canvas-load" />
        <span>{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

function Robot({ pointer }) {
  const robot = useRef(null);
  const { scene } = useGLTF(ROBOT_PATH);

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material.envMapIntensity = 1.5;
        child.material.roughness = Math.min(child.material.roughness ?? 0.5, 0.72);
        child.material.metalness = Math.max(child.material.metalness ?? 0.2, 0.35);
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!robot.current) return;

    const t = clock.getElapsedTime();
    robot.current.rotation.y = THREE.MathUtils.lerp(
      robot.current.rotation.y,
      pointer.current.x * 0.55,
      0.075
    );
    robot.current.rotation.x = THREE.MathUtils.lerp(
      robot.current.rotation.x,
      -pointer.current.y * 0.1,
      0.06
    );
    robot.current.position.x = THREE.MathUtils.lerp(
      robot.current.position.x,
      pointer.current.x * 0.16,
      0.045
    );
    robot.current.position.y = THREE.MathUtils.lerp(
      robot.current.position.y,
      Math.sin(t * 1.2) * 0.045,
      0.06
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={robot} position={[0, -0.35, 0]}>
        <Center>
          <primitive object={scene} scale={1.85} />
        </Center>
      </group>
    </Float>
  );
}

function HologramCursor({ pointer }) {
  const core = useRef(null);
  const ring = useRef(null);
  const target = useRef(new THREE.Vector3(0, 0.25, 0.6));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    target.current.set(pointer.current.x * 1.75, -pointer.current.y * 1.05 + 0.25, 0.8);

    if (core.current) {
      core.current.position.lerp(target.current, 0.09);
      core.current.scale.setScalar(1 + Math.sin(t * 5) * 0.08);
    }

    if (ring.current && core.current) {
      ring.current.position.copy(core.current.position);
      ring.current.rotation.x = Math.PI / 2 + pointer.current.y * 0.35;
      ring.current.rotation.z = t * 1.4;
    }
  });

  return (
    <>
      <mesh ref={core}>
        <sphereGeometry args={[0.075, 32, 32]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#34d399"
          emissiveIntensity={3.5}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.24, 0.006, 16, 96]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={2.2}
          transparent
          opacity={0.78}
        />
      </mesh>
    </>
  );
}

function SignalRings() {
  const outer = useRef(null);
  const inner = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outer.current) {
      outer.current.rotation.z = t * 0.22;
      outer.current.material.opacity = 0.34 + Math.sin(t * 1.4) * 0.12;
    }
    if (inner.current) {
      inner.current.rotation.z = -t * 0.36;
      inner.current.material.opacity = 0.42 + Math.cos(t * 1.8) * 0.14;
    }
  });

  return (
    <group position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={outer}>
        <torusGeometry args={[1.62, 0.012, 16, 160]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.4}
          transparent
          opacity={0.42}
        />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[1.08, 0.01, 16, 140]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={1.8}
          transparent
          opacity={0.48}
        />
      </mesh>
      <gridHelper args={[4.5, 28, '#22d3ee', '#1f2937']} position={[0, 0, 0.015]} />
    </group>
  );
}

function Scene({ pointer }) {
  useFrame(({ camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.28, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.55 - pointer.current.y * 0.16, 0.035);
    camera.lookAt(0, -0.32, 0);
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3.8, 6, 5]} intensity={3.2} castShadow />
      <spotLight
        position={[-4, 3.5, 3.2]}
        angle={0.38}
        penumbra={0.8}
        intensity={5}
        color="#22d3ee"
      />
      <pointLight position={[3, 1.2, 2.5]} intensity={2.2} color="#f59e0b" />
      <pointLight position={[0, -1.2, 2]} intensity={1.8} color="#34d399" />

      <Suspense fallback={<Loader />}>
        <Robot pointer={pointer} />
        <HologramCursor pointer={pointer} />
        <SignalRings />
        <Sparkles
          count={70}
          scale={[4.2, 3, 3.4]}
          position={[0, -0.2, 0]}
          size={1.25}
          speed={0.22}
          color="#22d3ee"
          opacity={0.48}
        />
        <Sparkles
          count={34}
          scale={[3.2, 2.2, 2.8]}
          position={[0, -0.4, 0]}
          size={1.45}
          speed={0.16}
          color="#f59e0b"
          opacity={0.4}
        />
        <ContactShadows position={[0, -1.7, 0]} opacity={0.52} scale={7} blur={3.2} far={4.5} />
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

export default function HeroCanvas() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div className="hero-canvas">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.55, 6.35], fov: 42 }}
        gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
      >
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  );
}
