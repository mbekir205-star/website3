import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrolled: boolean;
}

export default function Navigation({ scrolled }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 gap-4">
        {/* Logo - Responsive sizing */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <img
            src="/manus-storage/northframe-logo-bold_22dd4e91.png"
            alt="Northframe"
            className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-base md:text-lg font-bold hidden sm:inline bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent whitespace-nowrap">
            Northframe
          </span>
        </div>

        {/* Desktop Navigation - Centered with flex-1 */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button - Right aligned with flex-shrink-0 */}
        <div className="hidden md:block flex-shrink-0">
          <Button
            onClick={() => handleScroll('#contact')}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm px-4 py-2 h-auto"
          >
            Book Consultation
          </Button>
        </div>

        {/* Mobile Menu Button - Right aligned */}
        <button
          className="md:hidden p-2 flex-shrink-0 ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu - Full width dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className="text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleScroll('#contact')}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-2"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
