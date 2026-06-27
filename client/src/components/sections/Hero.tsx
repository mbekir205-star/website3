import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation();
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" ref={ref}>
      {/* Background with gradient mesh */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url(/manus-storage/hero-gradient-mesh_85f95f94.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background/50 to-background" />

      <div className={`container grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Websites that turn visitors into customers.
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed">
              We design and build high-performance websites for businesses that want to grow, convert, and stand out.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => handleScroll('#contact')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => handleScroll('#portfolio')}
              variant="outline"
              size="lg"
              className="border-border text-foreground font-semibold px-8 py-6 text-base hover:bg-secondary"
            >
              View Our Work
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm text-foreground/60">3-5 day delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm text-foreground/60">100% mobile responsive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm text-foreground/60">Conversion focused</span>
            </div>
          </div>
        </div>

        {/* Right - Device Mockup */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <img
              src="/manus-storage/device-mockup_36be4e95.png"
              alt="Website mockup"
              className="w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
