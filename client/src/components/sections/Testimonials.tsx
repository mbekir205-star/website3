import { Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const testimonials = [
    {
      name: 'Sarah Johnson',
      business: 'Tech Startup Founder',
      quote: 'Northframe transformed our online presence. Within 3 months, we saw a 40% increase in qualified leads. Their team understood our vision perfectly.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      business: 'E-commerce Owner',
      quote: 'The website they built is not just beautiful—it converts. Our average order value increased by 25% after launch. Highly recommend.',
      rating: 5,
    },
    {
      name: 'Jessica Martinez',
      business: 'Service Business Owner',
      quote: 'Professional, responsive, and results-driven. Northframe delivered on time and exceeded our expectations. They\'re now our ongoing support partner.',
      rating: 5,
    },
    {
      name: 'David Thompson',
      business: 'B2B SaaS CEO',
      quote: 'The attention to detail and conversion optimization was impressive. Our booking rate improved significantly. Worth every penny.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32" ref={ref}>
      <div className="container space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">What Our Clients Say</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Real feedback from real businesses we've helped grow.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300 space-y-4 ${isVisible ? `pop-up-stagger-${(index % 6) + 1}` : 'opacity-0'}`}
            >
              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 leading-relaxed italic">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
