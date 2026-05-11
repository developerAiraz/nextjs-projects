import { Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#project' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'WhatsApp', href: 'https://wa.me/9984400856', icon: MessageCircle },
  { label: 'GitHub', href: 'https://github.com/developerMark17', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/developermark17', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/markcoder_/', icon: Instagram },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span>AK</span>
          <p>Airaz Khan</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Airaz Khan. Built with Next.js and Three.js.</p>
      </div>
    </footer>
  );
}
