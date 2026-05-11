'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#project' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '/blog' },
];

export function Navbar() {
  const [active, setActive] = useState('#home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);

      const sections = ['home', 'about', 'experience', 'skills', 'project', 'contact'];
      const current = [...sections].reverse().find((id) => {
        const element = document.getElementById(id);
        return element && window.scrollY >= element.offsetTop - 150;
      });

      if (current) {
        setActive(`#${current}`);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <Link href="/" className="brand-mark" onClick={() => setOpen(false)} aria-label="Airaz Khan home">
        <span>AK</span>
        <i />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = active === item.href;
          const isRoute = item.href.startsWith('/');

          if (isRoute) {
            return (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            );
          }

          return (
            <a key={item.label} href={item.href} className={`nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        {navItems.map((item) => {
          const isRoute = item.href.startsWith('/');
          const className = `mobile-nav-link ${active === item.href ? 'active' : ''}`;

          if (isRoute) {
            return (
              <Link key={item.label} href={item.href} className={className} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            );
          }

          return (
            <a key={item.label} href={item.href} className={className} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          );
        })}
      </div>
    </header>
  );
}
