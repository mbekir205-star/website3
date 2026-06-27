import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight, Check, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Trust from '@/components/sections/Trust';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Process from '@/components/sections/Process';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation scrolled={scrolled} />
      
      <main>
        <Hero />
        <Trust />
        <Services />
        <Portfolio />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
