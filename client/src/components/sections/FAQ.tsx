import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FAQ() {
  const { ref, isVisible } = useScrollAnimation();
  const faqs = [
    {
      question: 'How long does a project take?',
      answer:
        'Our delivery timelines depend on the package. Starter sites typically launch in 3–5 days. Business sites take 2–3 weeks. Premium custom builds are tailored to your needs. We provide a clear timeline upfront.',
    },
    {
      question: 'Do you offer hosting?',
      answer:
        'Yes! We handle hosting management for all our clients. Your site is hosted on reliable, secure servers with uptime monitoring and automatic backups. Hosting is included in our maintenance plans.',
    },
    {
      question: 'Can I update my website myself?',
      answer:
        'Absolutely. We build sites with easy-to-use content management systems so you can make updates anytime. We also offer ongoing support if you prefer us to handle updates.',
    },
    {
      question: 'Do you redesign existing websites?',
      answer:
        'Yes, we specialize in website redesigns. We analyze your current site, identify conversion opportunities, and rebuild it with modern design and performance standards.',
    },
    {
      question: 'Do you offer ongoing maintenance?',
      answer:
        'Yes. Our Care Plan and Growth Plan provide ongoing maintenance, security updates, backups, and support. Most clients find this invaluable for keeping their site running smoothly.',
    },
    {
      question: 'What if I need custom features or integrations?',
      answer:
        'Our Premium Custom Build package includes custom systems, CRM integrations, booking systems, and more. We can build almost anything. Let\'s discuss your specific needs.',
    },
  ];

  return (
    <section className="py-20 md:py-32" ref={ref}>
      <div className="container space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Have questions? We've got answers. If you don't see what you're looking for, reach out.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 data-[state=open]:bg-secondary/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="text-left font-semibold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <p className="text-foreground/60 mb-4">Still have questions?</p>
          <p className="text-lg font-semibold">
            Let's talk. <a href="#contact" className="text-accent hover:underline">Book a free consultation</a>
          </p>
        </div>
      </div>
    </section>
  );
}
