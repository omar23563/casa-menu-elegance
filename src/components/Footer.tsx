import { Facebook, Instagram, MessageCircle, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Music, label: "TikTok", href: "#" },
    { icon: MessageCircle, label: "WhatsApp", href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                About La Casa Plus
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the finest in café culture and gourmet dining. Our passionate team crafts 
                exceptional coffee and creates memorable dining experiences in an elegant, welcoming atmosphere. 
                From premium single-origin beans to carefully prepared dishes, every detail reflects our 
                commitment to excellence.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Our Story</h4>
              <p className="text-muted-foreground">
                Founded with a vision to bring together the best of café culture and fine dining, 
                La Casa Plus has become a destination for those who appreciate quality, taste, and ambiance.
              </p>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                Visit Us
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>📍 Downtown Tunis, Tunisia</p>
                <p>📞 +216 27 218 690</p>
                <p>✉️ contact@lacasaplus.tn</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Opening Hours</h4>
              <div className="space-y-1 text-muted-foreground text-sm">
                <p>Monday - Thursday: 7:00 AM - 11:00 PM</p>
                <p>Friday - Saturday: 7:00 AM - 12:00 AM</p>
                <p>Sunday: 8:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                Follow Us
              </h3>
              <p className="text-muted-foreground mb-6">
                Stay connected and discover our latest offerings, events, and behind-the-scenes moments.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 hover:bg-primary hover:text-white transition-colors"
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-border">
              <h4 className="text-lg font-semibold text-white mb-2">Newsletter</h4>
              <p className="text-muted-foreground text-sm">
                Subscribe for exclusive offers and updates
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-sm font-bold text-white">LC</span>
            </div>
            <span className="font-heading font-semibold text-white">La Casa Plus</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              © 2024 La Casa Plus. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Developed with ❤️ by Your Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
