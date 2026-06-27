import { Zap, Smartphone, TrendingUp, Lock, Sparkles, Headphones } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation();
  const reasons = [
    {
      icon: Zap,
      title: 'Fast-loading websites',
      description: 'Optimized for speed so visitors stay and convert.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-first design',
      description: 'Perfect experience on every device, every time.',
    },
    {
      icon: TrendingUp,
      title: 'SEO optimized structure',
      description: 'Built to rank and attract qualified traffic.',
    },
    {
      icon: Sparkles,
      title: 'High conversion layouts',
      description: 'Every element designed to drive action.',
    },
    {
      icon: Lock,
      title: 'Secure and scalable builds',
      description: 'Enterprise-grade security and room to grow.',
    },
    {
      icon: Headphones,
      title: 'Ongoing support options',
      description: 'We\'re here to help your site thrive long-term.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30" ref={ref}>
      <div className="container space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose Northframe</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Built to perform, not just look good. Every decision we make is judged against one standard: does it bring in customers?
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 space-y-4 ${isVisible ? `pop-up-stagger-${(index % 6) + 1}` : 'opacity-0'}`}
              >
                <Icon className="w-8 h-8 text-accent" />
                <h3 className="text-lg font-semibold">{reason.title}</h3>
                <p className="text-sm text-foreground/60">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
