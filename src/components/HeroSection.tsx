import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6">
            {/* Replace this placeholder with your PNG logo */}
            <img 
              src="/logo.png" 
              alt="La Casa Plus Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-white mb-4">
            La Casa Plus
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Premium Café & Restaurant Experience
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="space-y-6">
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover our carefully crafted menu featuring the finest coffee, 
            delicious cuisine, and exceptional atmosphere in an elegant setting.
          </p>
          
          <Button 
            onClick={scrollToMenu}
            size="lg"
            className="btn-hero text-lg px-8 py-4 rounded-full font-semibold"
          >
            View Menu
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
};

export default HeroSection;