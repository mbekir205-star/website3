import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    projectDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you! We\'ll be in touch within 24 hours.');
      setFormData({ name: '', business: '', email: '', phone: '', projectDetails: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to grow?</h2>
              <p className="text-lg text-foreground/60">
                Tell us a little about your business and where you're starting from. We'll recommend the right package and send over a clear, no-pressure quote.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href="mailto:hello@northframeweb.com" className="text-foreground/70 hover:text-accent transition-colors">
                    hello@northframeweb.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <a href="tel:+15550102024" className="text-foreground/70 hover:text-accent transition-colors">
                    (555) 010-2024
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Location</p>
                  <p className="text-foreground/70">Remote — serving clients nationwide</p>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-4">
                <Instagram className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Follow Us</p>
                  <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                    @northframeweb
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card rounded-lg border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-secondary/50 border-border"
                />
              </div>

              {/* Business */}
              <div className="space-y-2">
                <Label htmlFor="business">Business</Label>
                <Input
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  placeholder="Your business name"
                  required
                  className="bg-secondary/50 border-border"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-secondary/50 border-border"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="bg-secondary/50 border-border"
                />
              </div>

              {/* Project Details */}
              <div className="space-y-2">
                <Label htmlFor="projectDetails">Project Details</Label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, and timeline..."
                  rows={5}
                  className="bg-secondary/50 border-border resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-base"
              >
                {isSubmitting ? 'Sending...' : 'Book Your Free Consultation'}
                {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>

              <p className="text-xs text-foreground/50 text-center">
                We'll get back to you within 24 hours. No spam, just genuine conversations about growing your business.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
