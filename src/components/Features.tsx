import { Bot, Calendar, Shield, Zap, FileSearch, Users } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Document Analysis",
    description: "Advanced AI extracts key terms, deadlines, and obligations from any legal document in seconds."
  },
  {
    icon: Calendar,
    title: "Smart Calendar Integration", 
    description: "Automatically sync payment dates, deadlines, and notifications with Google Calendar."
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Get instant alerts about potentially problematic clauses and regulatory compliance issues."
  },
  {
    icon: Zap,
    title: "Real-time Monitoring",
    description: "Track contract performance, payment status, and upcoming obligations in real-time."
  },
  {
    icon: FileSearch,
    title: "Plain English Translation",
    description: "Convert complex legal language into clear, understandable terms anyone can grasp."
  },
  {
    icon: Users,
    title: "Multi-party Coordination",
    description: "Keep all parties informed with automated updates and collaborative features."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful Features for 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Modern Legal Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform how you handle legal documents with cutting-edge AI and seamless integrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 bg-gradient-card rounded-2xl border shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;