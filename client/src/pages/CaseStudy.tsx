import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

const caseStudies: Record<string, any> = {
  'techflow': {
    name: 'Mock SaaS Dashboard',
    industry: 'Example Project',
    tagline: 'Modern Analytics Dashboard',
    image: '/manus-storage/mockup-example-1_341603d4.png',
    description: 'Built a modern analytics dashboard with real-time data visualization, interactive charts, and responsive design. Features include user authentication, data filtering, and export functionality.',
    timeline: '2 weeks',
    team: 'Full-stack development',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
  },
  'luxehotel': {
    name: 'Mock Hotel Booking Site',
    industry: 'Example Project',
    tagline: 'Premium Booking Platform',
    image: '/manus-storage/mockup-example-2_589041e1.png',
    description: 'Developed a premium hotel booking platform with elegant design, property galleries, and seamless reservation workflow. Includes search filters, availability calendar, and secure payment integration.',
    timeline: '3 weeks',
    team: 'Design and frontend development',
    technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
  },
  'fitpro': {
    name: 'Mock Fitness Platform',
    industry: 'Example Project',
    tagline: 'Trainer-Client Connection Platform',
    image: '/manus-storage/mockup-example-3_49ca2cd3.png',
    description: 'Created a fitness coaching platform connecting trainers with clients. Features trainer profiles, session booking calendar, progress tracking, and client messaging system.',
    timeline: '10 days',
    team: 'Full-stack development',
    technologies: ['React', 'Firebase', 'Stripe', 'Twilio'],
  },
  'ecostore': {
    name: 'Mock E-Commerce Store',
    industry: 'Example Project',
    tagline: 'Sustainable Products Marketplace',
    image: '/manus-storage/mockup-example-4_17b0e842.png',
    description: 'Built a sustainable products marketplace with eco-friendly branding, product catalog management, inventory tracking, and email marketing integration. Optimized for mobile shopping.',
    timeline: '2.5 weeks',
    team: 'E-commerce specialists',
    technologies: ['Next.js', 'Shopify API', 'Tailwind CSS', 'Stripe'],
  }
};

export default function CaseStudy() {
  const [scrolled, setScrolled] = useState(false);
  const [, params] = useRoute('/case-study/:id');
  const caseStudyId = params?.id || '';
  const study = caseStudies[caseStudyId];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!study) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Case Study Not Found</h1>
          <p className="text-foreground/60">The case study you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()} className="bg-accent hover:bg-accent/90">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrolled={scrolled} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container space-y-8">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Button>

          <div className="space-y-4">
            <p className="text-accent font-semibold">{study.industry}</p>
            <h1 className="text-5xl md:text-6xl font-bold">{study.name}</h1>
            <p className="text-2xl text-foreground/60">{study.tagline}</p>
          </div>
        </div>
      </section>

      {/* Case Study Image */}
      <section className="pb-16">
        <div className="container">
          <div className="w-full rounded-lg overflow-hidden border border-border">
            <img
              src={study.image}
              alt={study.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container max-w-3xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">About This Project</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">{study.description}</p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-foreground/50 font-semibold uppercase">Timeline</p>
              <p className="text-2xl font-bold">{study.timeline}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground/50 font-semibold uppercase">Team</p>
              <p className="text-2xl font-bold">{study.team}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground/50 font-semibold uppercase">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to start your project?</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Let's create something amazing together. Book a consultation with our team today.
          </p>
          <Button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg"
          >
            Book Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
