import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/navbar";
import { Footer } from "./footer/footer";
// import SplashCursor from "@/Animations/SplashCursor/SplashCursor";
import CanvasCursor from "@/components/CanvasCursor/CanvasCursor";
import 'react-creative-cursor/dist/styles.css';

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL("https://markcoder.tech"), // Replace with your actual domain
  title: "Markcoder's Portfolio",
  description:
    "Dive into Markcoder's blog featuring insightful articles on full-stack development, React, Next.js, JavaScript, and creative UI/UX design. Discover tips, tutorials, and industry trends.",
  icons: "/images/angular.png",
  generator: "Mark ",
  applicationName: "Markcoder's Blog",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Blog",
    "Web Development",
    "React",
    "Next.js",
    "JavaScript",
    "UI/UX Design",
    "Full-Stack Development",
    "Programming",
    "Tutorials",
    "Industry Trends",
  ],
  authors: [
    { name: "Markcoder", url: "https://markcoder.tech" },
    
    { name: "Airaz Khan" },
  ],
  creator: "Markcoder",
  publisher: "Markcoder Publishing",
  openGraph: {
    title: "Markcoder's Blog",
    description:
      "Explore articles, tips, and tutorials on full-stack development, React, Next.js, JavaScript, and more.",
    url: "https://markcoder.tech",
    type: "website",
    images: [
      {
        url: "/images/blog-og-image.png",
        width: 1200,
        height: 630,
        alt: "Markcoder's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Markcoder's Blog",
    description:
      "Discover insightful articles on full-stack development, React, JavaScript, and more.",
    images: ["/images/twitter-blog-card.png"],
  },
};

export const viewport = {
  themeColor: "#ffffff", // Light theme for readability
  colorScheme: "light",
  viewport: "width=device-width, initial-scale=1.0",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>
        {/* <SplashCursor /> */}
        <CanvasCursor/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
