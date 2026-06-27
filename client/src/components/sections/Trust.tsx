import { Zap, Smartphone, Search, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Trust() {
  const { ref, isVisible } = useScrollAnimation();
  const stats = [
    {
      icon: Zap,
      label: 'Fast delivery',
      description: '3-5 days on our fastest package',
    },
    {
      icon: Smartphone,
      label: 'Mobile optimized',
      description: '100% responsive on every build',
    },
    {
      icon: Search,
      label: 'SEO ready',
      description: 'Built for search visibility',
    },
    {
      icon: TrendingUp,
      label: 'Conversion focused',
      description: 'Designed to turn visitors into customers',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30" ref={ref}>
      <div className="container space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Trusted by ambitious businesses</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We partner with growing companies to build websites that deliver real results.
          </p>
        </div>

        {/* Client Logos Placeholder */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-8 border-y border-border">
          {['Acme Co', 'Tech Startup', 'Growth Labs', 'Digital First'].map((name) => (
            <div
              key={name}
              className="px-6 py-3 bg-card rounded-lg border border-border text-foreground/50 font-semibold text-sm"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <Icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">{stat.label}</h3>
                <p className="text-sm text-foreground/60">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
