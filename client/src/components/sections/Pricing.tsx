import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Grid3x3, Rows } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Pricing() {
  const [viewMode, setViewMode] = useState<'cards' | 'comparison'>('cards');
  const { ref, isVisible } = useScrollAnimation();

  const pricingTiers = [
    {
      name: 'Starter Site',
      description: '1–3 pages · 3–5 day delivery',
      startingAt: '$199–$349',
      features: [
        '1–3 pages',
        'Mobile responsive',
        'Basic SEO',
        'Contact form',
        '3–5 day delivery',
      ],
      highlighted: false,
    },
    {
      name: 'Business Site',
      description: '4–7 pages · Custom design',
      startingAt: '$499–$799',
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
      name: 'Premium Site',
      description: 'Advanced custom build',
      startingAt: '$999–$1,500+',
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
    <section id="pricing" className="py-20 md:py-32 bg-secondary/20" ref={ref}>
      <div className="container space-y-16">
        {/* Title */}
        <div className={`text-center space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold">Pricing</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Three ways to launch. Every package includes mobile-responsive design and a clear delivery timeline.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className={`flex justify-center gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              viewMode === 'cards'
                ? 'bg-accent text-accent-foreground border-accent'
                : 'border-border text-foreground hover:border-accent/50'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            Card View
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              viewMode === 'comparison'
                ? 'bg-accent text-accent-foreground border-accent'
                : 'border-border text-foreground hover:border-accent/50'
            }`}
          >
            <Rows className="w-4 h-4" />
            Compare
          </button>
        </div>

        {/* Card View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative rounded-lg border transition-all duration-300 overflow-hidden group hover:translate-y-[-4px] ${
                  tier.highlighted
                    ? 'border-accent bg-card md:scale-105 shadow-lg shadow-accent/20 md:shadow-xl md:shadow-accent/30'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Highlighted Badge */}
                {tier.highlighted && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg">
                    MOST CHOSEN
                  </div>
                )}

                <div className="p-8 space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    <p className="text-sm text-foreground/60">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-accent">STARTING AT</p>
                    <p className="text-3xl font-bold">{tier.startingAt}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => handleScroll('#contact')}
                    className={`w-full transition-all duration-300 ${
                      tier.highlighted
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
        )}

        {/* Comparison Table View */}
        {viewMode === 'comparison' && (
          <div className={`overflow-x-auto animate-fade-in-up`}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  {pricingTiers.map((tier) => (
                    <th
                      key={tier.name}
                      className={`text-center py-4 px-4 font-semibold ${
                        tier.highlighted ? 'bg-accent/10 text-accent' : 'text-foreground'
                      }`}
                    >
                      <div className="font-bold">{tier.name}</div>
                      <div className="text-sm text-foreground/60 font-normal">{tier.startingAt}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Collect all unique features */}
                {Array.from(
                  new Set(pricingTiers.flatMap((tier) => tier.features))
                ).map((feature, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{feature}</td>
                    {pricingTiers.map((tier) => (
                      <td
                        key={tier.name}
                        className={`text-center py-4 px-4 ${
                          tier.highlighted ? 'bg-accent/5' : ''
                        }`}
                      >
                        {tier.features.includes(feature) ? (
                          <Check className="w-5 h-5 text-accent mx-auto" />
                        ) : (
                          <span className="text-foreground/30">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CTA Row */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricingTiers.map((tier) => (
                <Button
                  key={tier.name}
                  onClick={() => handleScroll('#contact')}
                  className={`transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                      : 'border border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Maintenance Plans */}
        <div className={`mt-16 pt-16 border-t border-border transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-bold">Ongoing Care</h3>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Keep your site fast, secure, and growing with our monthly maintenance plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Care Plan */}
            <div className="p-6 bg-card rounded-lg border border-border space-y-4 hover:border-accent/50 transition-all duration-300 hover:translate-y-[-4px]">
              <div>
                <h4 className="text-xl font-bold mb-2">Care Plan</h4>
                <p className="text-2xl font-bold text-accent">$29–$49 <span className="text-base text-foreground/60 font-normal">/ month</span></p>
              </div>
              <ul className="space-y-3">
                {[
                  'Uptime & security monitoring',
                  'Software and plugin updates',
                  'Monthly backups',
                  'Minor content edits',
                  'Email support, 2 business day response',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Plan */}
            <div className="p-6 bg-card rounded-lg border border-accent space-y-4 relative hover:translate-y-[-4px] transition-all duration-300">
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                RECOMMENDED
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Growth Plan</h4>
                <p className="text-2xl font-bold text-accent">$79–$149 <span className="text-base text-foreground/60 font-normal">/ month</span></p>
              </div>
              <ul className="space-y-3">
                {[
                  'Everything in Care Plan',
                  'Monthly SEO & performance reporting',
                  'Ongoing page speed optimization',
                  'Content and blog updates',
                  'Priority support, same business day response',
                  'Quarterly strategy check-in call',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-sm text-foreground/60 mt-8">
            All plans include hosting management and routine technical maintenance. Plans can be paused or upgraded at any time — there are no long-term contracts.
          </p>
        </div>
      </div>
    </section>
  );
}
