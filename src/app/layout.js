import './globals.css';
import { Navbar } from '@/components/Navbar/navbar';
import { Footer } from './footer/footer';
import CustomCursor from '@/components/Cursor/CustomCursor';

export const metadata = {
  metadataBase: new URL('https://markcoder.tech'),
  title: 'Airaz Khan - Full Stack Developer',
  description:
    'Full Stack Developer crafting immersive 3D web experiences with React, Next.js, and Three.js.',
  icons: '/images/angular.png',
  generator: 'Next.js',
  applicationName: 'Airaz Khan Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Portfolio', 'Full Stack Developer', 'React', 'Next.js', 'Three.js', '3D Web', 'JavaScript'],
  authors: [{ name: 'Airaz Khan' }],
  creator: 'Airaz Khan',
  openGraph: {
    title: 'Airaz Khan - Full Stack Developer',
    description: 'Immersive 3D portfolio with React, Next.js and Three.js.',
    url: 'https://markcoder.tech',
    type: 'website',
    images: [{ url: '/images/blog-og-image.png', width: 1200, height: 630, alt: 'Airaz Khan Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airaz Khan - Full Stack Developer',
    description: 'Immersive 3D portfolio.',
    images: ['/images/twitter-blog-card.png'],
  },
};

export const viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <div className="nav-fade" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
