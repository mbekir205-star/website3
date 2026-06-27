import { Lightbulb, Palette, Code, CheckCircle, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      number: 1,
      icon: Lightbulb,
      title: 'Discovery & Strategy',
      description: 'We understand your business goals, target audience, and competitive landscape.',
    },
    {
      number: 2,
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, conversion-focused designs that reflect your brand and engage users.',
    },
    {
      number: 3,
      icon: Code,
      title: 'Development',
      description: 'Clean, optimized code built for performance, SEO, and scalability.',
    },
    {
      number: 4,
      icon: CheckCircle,
      title: 'Testing & Optimization',
      description: 'Rigorous testing across devices and browsers to ensure perfection.',
    },
    {
      number: 5,
      icon: Rocket,
      title: 'Launch & Support',
      description: 'Seamless deployment and ongoing support to keep your site running smoothly.',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-32">
      <div className="container space-y-16">
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Our Process</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A proven methodology that delivers results. From discovery to launch, we guide you every step of the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-accent/20 -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={step.number} className="relative">
                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-2 gap-8 items-center">
                    {isEven ? (
                      <>
                        {/* Left Content */}
                        <div className="text-right space-y-3">
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <p className="text-foreground/60">{step.description}</p>
                        </div>

                        {/* Center Circle */}
                        <div className="flex justify-center">
                          <div className="relative w-16 h-16 bg-card border-2 border-accent rounded-full flex items-center justify-center">
                            <Icon className="w-8 h-8 text-accent" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                              {step.number}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Center Circle */}
                        <div className="flex justify-center">
                          <div className="relative w-16 h-16 bg-card border-2 border-accent rounded-full flex items-center justify-center">
                            <Icon className="w-8 h-8 text-accent" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                              {step.number}
                            </div>
                          </div>
                        </div>

                        {/* Right Content */}
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <p className="text-foreground/60">{step.description}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="relative w-12 h-12 bg-card border-2 border-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-1 h-12 bg-gradient-to-b from-accent to-accent/20 mt-2" />
                      )}
                    </div>
                    <div className="pb-8 space-y-2">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="text-sm text-foreground/60">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
