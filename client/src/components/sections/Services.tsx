import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();
  const services = [
    {
      name: 'Starter Website',
      description: '1–3 pages · 3–5 day delivery',
      features: [
        '1–3 pages',
        'Mobile responsive',
        'Contact form',
        'Basic SEO',
        '3–5 day delivery',
      ],
      highlighted: false,
    },
    {
      name: 'Business Website',
      description: 'Up to 7 pages · Custom design',
      features: [
        '4–7 pages',
        'Custom design',
        'SEO optimization',
        'Booking/contact system',
        'Analytics setup',
        'Lead generation focused',
      ],
      highlighted: true,
    },
    {
      name: 'Premium Custom Build',
      description: 'Unlimited pages · Advanced features',
      features: [
        'Unlimited pages',
        'Advanced custom design',
        'Copywriting assistance',
        'Lead funnels',
        'CRM/form integrations',
        'Full SEO strategy',
      ],
      highlighted: false,
    },
  ];

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-32" ref={ref}>
      <div className="container space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Our Services</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Choose the package that fits your business needs. All include mobile-responsive design and clear delivery timelines.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`relative rounded-lg border transition-all duration-300 overflow-hidden group ${isVisible ? `pop-up-stagger-${(index % 6) + 1}` : 'opacity-0'} ${
                service.highlighted
                  ? 'border-accent bg-card md:scale-105 shadow-lg shadow-accent/20 md:shadow-xl md:shadow-accent/30'
                  : 'border-border bg-card hover:border-accent/50'
              }`}
            >
              {/* Highlighted Badge */}
              {service.highlighted && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg">
                  MOST CHOSEN
                </div>
              )}

              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{service.name}</h3>
                  <p className="text-sm text-foreground/60">{service.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => handleScroll('#contact')}
                  className={`w-full ${
                    service.highlighted
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                      : 'border border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
