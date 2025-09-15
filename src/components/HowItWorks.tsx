import { Upload, Brain, Link, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Document",
    description: "Simply drag and drop your rental agreement, contract, or any legal document to get started.",
    step: "01"
  },
  {
    icon: Brain,
    title: "AI Analysis & Breakdown",
    description: "Our advanced AI analyzes the document, extracting key terms, dates, and obligations in plain English.",
    step: "02"
  },
  {
    icon: Link,
    title: "Connect Your Apps",
    description: "Link your calendar, banking apps, and other tools to create a fully integrated experience.",
    step: "03"
  },
  {
    icon: CheckCircle,
    title: "Stay Informed & Protected",
    description: "Receive proactive alerts, reminders, and insights to never miss a deadline or obligation.",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How It Works in 
            <span className="bg-gradient-hero bg-clip-text text-transparent">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From static document to living agreement in minutes, not hours
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-elegant z-10">
                {step.step}
              </div>

              {/* Card */}
              <div className="bg-background p-8 rounded-2xl border shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] h-full">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary transform -translate-y-1/2 z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;