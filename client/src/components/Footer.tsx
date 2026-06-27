import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary/50 border-t border-border py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/manus-storage/northframe-logo-bold_22dd4e91.png"
                alt="Northframe"
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">Northframe</span>
            </div>
            <p className="text-sm text-foreground/60">
              Premium web design that turns visitors into customers.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@northframeweb.com"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  hello@northframeweb.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15550102024"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  (555) 010-2024
                </a>
              </li>
              <li>
                <p className="text-sm text-foreground/60">Ohio, USA</p>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-foreground/60 hover:text-accent hover:border-accent transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground/60">
              &copy; {currentYear} Northframe Web Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
