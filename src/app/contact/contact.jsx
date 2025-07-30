import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Preload, OrbitControls, useGLTF } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import emailjs from "@emailjs/browser"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"

// Section Heading
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
          className="text-2xl mb-1"
        >
          {icon}
        </motion.span>
      )}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                     bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                     bg-clip-text text-transparent animate-gradient drop-shadow-lg tracking-wider">
        {title}
      </h1>
      <span className="absolute bottom-[-10px] w-full h-[3px] bg-gradient-to-r 
                       from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg animate-pulse"></span>
    </div>
  </motion.div>
)

// ⭐ Background Stars
const Stars = (props) => {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }))

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

// ⭐ Stars Canvas
const StarsCanvas = () => (
  <div className="w-full h-auto absolute inset-0 z-[-1]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
)

// 🌍 Earth 3D Model (Responsive)
const Earth = ({ isMobile }) => {
  const earth = useGLTF("/planet/scene.gltf")
  return (
    <primitive
      object={earth.scene}
      scale={isMobile ? 2.2 : 2.5}   // ✅ smaller on mobile
      position-y={isMobile ? -0.5 : 0} // ✅ center vertically on mobile
      rotation-y={0}
    />
  )
}

// 📩 Main Contact Component
export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({ email: "", message: "" })
  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)")
    setIsMobile(mediaQuery.matches)
    const handleMediaChange = (e) => setIsMobile(e.matches)
    mediaQuery.addEventListener("change", handleMediaChange)
    return () => mediaQuery.removeEventListener("change", handleMediaChange)
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    emailjs.sendForm("service_60igyvp", "template_x0arc9d", e.target, "nFpVEp87LmSPZPs1d").then(
      () => {
        setFormData({ email: "", message: "" })
        showAnimatedAlert("Message sent successfully!")
      },
      () => showAnimatedAlert("Failed to send message, please try again.")
    )
  }

  const showAnimatedAlert = (msg) => {
    setAlertMessage(msg)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  return (
    <div className="relative h-screen flex flex-col items-center" id="contact" ref={ref}>
      <SectionHeading title="Contact" icon="🚀" />
      <StarsCanvas />

      {showAlert && (
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <div
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <div className="flex flex-col md:flex-row items-center mt-8 h-screen">
          {/* 📧 Contact Form */}
          <div className="w-full sm:w-[440px] md:w-[420px] lg:w-[500px] mx-auto p-4 shadow-input bg-black border border-blue-300 rounded-2xl">
            <h2 className="font-bold text-xl text-white">Contact Us</h2>      
            <div className="flex justify-between items-center mt-4 mb-6">
              <div className="text-white">
                <p className="font-semibold">Email us at:</p>
                <Link href="https://mail.google.com/mail/u/0/#inbox" className="text-blue-400">webdevairaz@gmail.com</Link>
              </div>
              <a
                href="https://wa.me/9984400856"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 text-xs rounded-full flex items-center"
              >
                <img src="/images/what.gif" className="w-10 mr-1" alt="WhatsApp" />
              </a>
            </div>

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input id="email" placeholder="Enter your email" type="email" name="user_email" value={formData.email} onChange={handleChange} required />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="message" className="text-white">Message</Label>
                <Input id="message" placeholder="Message" type="text" name="message" value={formData.message} onChange={handleChange} required />
              </LabelInputContainer>

              <button
                className="bg-gradient-to-br relative group/btn from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                type="submit"
              >
                Send &rarr;
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />
            </form>
          </div>

          {/* 🌍 Responsive Earth 3D */}
          <div className="h-[350px] w-[360px] md:h-[460px] md:w-[500px] max-w-lg mt-6 md:mt-0">
            <Canvas
              shadows
              dpr={[1, 2]}
              gl={{ preserveDrawingBuffer: true }}
              camera={{
                fov: 40,
                near: 0.1,
                far: 200,
                position: isMobile ? [-3, 1.5, 5.5] : [-4, 3, 6],
              }}
            >
              <Suspense>
                <OrbitControls
                  autoRotate
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2.5}
                  enablePan={false}   // ✅ disables pan for better UX
                />
                <Earth isMobile={isMobile} />
                <Preload all />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

// 🎨 Bottom Gradient
const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
)

// 🏷️ Label Container
const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
)
