import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Calendar, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-card rounded-full border shadow-soft">
                <Shield className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  Legal Tech Innovation
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Transform Static 
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Legal Documents</span> 
                into Living Agreements
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Stop drowning in legal jargon. Our AI-powered platform converts complex contracts into 
                interactive, intelligent assistants that integrate with your digital life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Documents Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Legal documents transforming into interactive interfaces" 
                className="w-full h-auto rounded-2xl shadow-elegant"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-card p-4 rounded-xl shadow-soft border animate-bounce">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-card p-4 rounded-xl shadow-soft border animate-pulse">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;