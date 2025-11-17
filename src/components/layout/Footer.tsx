import { Link } from "react-router-dom";
import { Globe, Mail, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

// CSS-only Globe Component for Footer
const FooterGlobe = () => {
  return (
    <div className="relative w-full h-full">
      {/* Outer ring */}
      <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow opacity-30">
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Inner ring */}
      <div className="absolute inset-8 border border-primary/30 rounded-full animate-reverse-spin-slow opacity-40">
        <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-primary/50 rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Core */}
      <div className="absolute inset-16 bg-primary/10 rounded-full animate-pulse opacity-50" />
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-background to-primary/10 text-foreground overflow-hidden">
      {/* Animated Background Globe */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none">
        <FooterGlobe />
      </div>

      {/* Electric Blue divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Main Footer Content */}
      <div className="relative container mx-auto mt-16 py-16 px-4 md:px-6">
        {/* Mobile: Single column, Desktop: Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* About Section */}
          <div className="space-y-6 text-center md:text-left">
            {/* Logo and Title */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="relative">
                <img
                  src="/mun-logo.jpg"
                  alt="RNSIT MUN Logo"
                  className="h-12 w-12 mr-4 object-contain rounded-full shadow-lg border-2 border-primary/20"
                />
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-lusion-glow" />
              </div>
              <div>
                <h3 className="font-inter text-2xl md:text-3xl font-bold text-foreground">
                  RNSIT MUNSoc
                </h3>
                <p className="text-foreground/70 text-sm font-roboto-mono tracking-wide">
                  Model United Nations Society
                </p>
              </div>
            </div>

            <p className="text-foreground/80 font-inter text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Empowering the next generation of diplomats, leaders, and global citizens through 
              immersive Model United Nations experiences.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start space-x-6 pt-4">
              <a
                href="https://www.instagram.com/rnsit.mun/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-lusion"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://in.linkedin.com/company/rnsit-mun-club"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-lusion"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/rnsit_mun"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-lusion"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="font-inter text-xl md:text-2xl font-medium text-foreground mb-6 pb-2 border-b border-primary/30">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="footer-link-lusion text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link-lusion text-lg">
                  About RNSITMUN
                </Link>
              </li>
              <li>
                <Link to="/events" className="footer-link-lusion text-lg">
                  Events & Conferences
                </Link>
              </li>
              <li>
                <Link to="/members" className="footer-link-lusion text-lg">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/resources" className="footer-link-lusion text-lg">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="font-inter text-xl md:text-2xl font-medium text-foreground mb-6 pb-2 border-b border-primary/30">
              Contact Info
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start justify-center md:justify-start space-x-4">
                <MapPin className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                <span className="text-foreground/80 font-inter text-lg leading-relaxed">
                  RNS Institute of Technology<br />
                  Channasandra, Bengaluru<br />
                  Karnataka, India
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                <a
                  href="mailto:mun@rnsit.ac.in"
                  className="text-foreground/80 hover:text-primary transition-colors font-inter text-lg"
                >
                  mun@rnsit.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-foreground/70 text-sm font-inter text-center md:text-left">
            &copy; {currentYear} RNSIT MUNSoc. All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            <Link
              to="/privacy"
              className="text-foreground/70 hover:text-primary text-sm transition-colors font-inter hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-foreground/70 hover:text-primary text-sm transition-colors font-inter hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Ambient glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
};

export default Footer;