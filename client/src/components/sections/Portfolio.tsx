import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, BarChart3, Building2, Dumbbell, Leaf } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLocation } from 'wouter';

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();
  const [, navigate] = useLocation();

  const projects = [
    {
      name: 'Mock SaaS Dashboard',
      industry: 'Example Project',
      description: 'Built a modern analytics dashboard with real-time data visualization, interactive charts, and responsive design. Features include user authentication, data filtering, and export functionality.',
      icon: BarChart3,
      gradient: 'from-blue-600 via-blue-500 to-cyan-400',
      image: '/manus-storage/mockup-example-1_341603d4.png',
      caseStudyId: 'techflow',
      stats: {
        tech: 'React + TypeScript',
        time: '2 weeks',
        focus: 'Performance & UX',
      },
      features: ['React Dashboard', 'Real-time Analytics', 'Mobile Responsive'],
    },
    {
      name: 'Mock Hotel Booking Site',
      industry: 'Example Project',
      description: 'Developed a premium hotel booking platform with elegant design, property galleries, and seamless reservation workflow. Includes search filters, availability calendar, and secure payment integration.',
      icon: Building2,
      gradient: 'from-amber-600 via-amber-500 to-orange-400',
      image: '/manus-storage/mockup-example-2_589041e1.png',
      caseStudyId: 'luxehotel',
      stats: {
        tech: 'Next.js + Stripe',
        time: '3 weeks',
        focus: 'Conversion Optimization',
      },
      features: ['Booking System', 'Gallery Integration', 'Payment Gateway'],
    },
    {
      name: 'Mock Fitness Platform',
      industry: 'Example Project',
      description: 'Created a fitness coaching platform connecting trainers with clients. Features trainer profiles, session booking calendar, progress tracking, and client messaging system.',
      icon: Dumbbell,
      gradient: 'from-rose-600 via-rose-500 to-pink-400',
      image: '/manus-storage/mockup-example-3_49ca2cd3.png',
      caseStudyId: 'fitpro',
      stats: {
        tech: 'React + Firebase',
        time: '10 days',
        focus: 'Lead Generation',
      },
      features: ['Trainer Profiles', 'Booking Calendar', 'Progress Tracking'],
    },
    {
      name: 'Mock E-Commerce Store',
      industry: 'Example Project',
      description: 'Built a sustainable products marketplace with eco-friendly branding, product catalog management, inventory tracking, and email marketing integration. Optimized for mobile shopping.',
      icon: Leaf,
      gradient: 'from-emerald-600 via-emerald-500 to-teal-400',
      image: '/manus-storage/mockup-example-4_17b0e842.png',
      caseStudyId: 'ecostore',
      stats: {
        tech: 'Next.js + Shopify',
        time: '2.5 weeks',
        focus: 'Sales Growth',
      },
      features: ['Product Catalog', 'Inventory Management', 'Email Marketing'],
    },
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-secondary/20" ref={ref}>
      <div className="container space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Our Work</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Real projects. Real results. See how we've helped businesses grow through high-performance web design.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.name}
                className={`group relative bg-card rounded-lg border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 ${isVisible ? `pop-up-stagger-${(index % 6) + 1}` : 'opacity-0'}`}
              >
                {/* Project Image */}
                <div className={`w-full h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                  {/* Website Screenshot */}
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to gradient if image fails
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Gradient overlay as fallback */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Icon fallback */}
                  <Icon className="w-24 h-24 text-white/30 group-hover:scale-110 transition-transform duration-500 absolute" />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p className="text-sm text-accent font-semibold">{project.industry}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60">{project.description}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-border">
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/50 font-semibold uppercase">Tech Stack</p>
                      <p className="text-sm font-bold text-accent">{project.stats.tech}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/50 font-semibold uppercase">Timeline</p>
                      <p className="text-sm font-bold">{project.stats.time}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/50 font-semibold uppercase">Focus</p>
                      <p className="text-sm font-bold">{project.stats.focus}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-xs text-foreground/50 font-semibold uppercase">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(`/case-study/${project.caseStudyId}`)}
                    className="w-full mt-4 px-4 py-3 bg-accent/10 hover:bg-accent/20 text-accent font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    View Case Study
                    <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">Ready to see your project here?</h3>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Join our portfolio of successful businesses. Let's create something amazing together.
            </p>
          </div>
          <Button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg"
          >
            Start Your Project <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
