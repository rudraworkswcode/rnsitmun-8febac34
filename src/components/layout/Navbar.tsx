import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Members", path: "/members" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 safe-area-inset-top ${
        scrolled
          ? "bg-background/98 backdrop-blur-xl shadow-lg border-b border-border/50 py-2 h-14"
          : "bg-background/95 backdrop-blur-lg py-2 sm:py-3 h-16"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/mun-logo.jpg"
                alt="MUN Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-inter font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors max-w-none">
                RNSIT MUNSoc
              </span>
              <span className="font-inter text-xs text-muted-foreground hidden sm:block tracking-wide max-w-none">
                Model United Nations Society
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-5 py-2 font-inter font-medium text-sm uppercase tracking-wide transition-all duration-300 rounded-lg group flex items-center justify-center
                  ${
                    location.pathname === link.path
                      ? "text-primary after:scale-x-100 after:origin-bottom-left"
                      : "text-foreground hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative w-12 h-12 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center group touch-manipulation"
              aria-label="Toggle navigation menu"
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X
                    size={30}
                    className="text-primary transition-transform duration-300 group-hover:rotate-90"
                  />
                ) : (
                  <Menu
                    size={30}
                    className="text-primary transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-background/95 backdrop-blur-xl z-40 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Close button inside menu */}
        <div className="flex justify-end p-6 animate-fadeIn">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={26} className="text-primary" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col space-y-3 pt-6 px-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-6 py-4 font-inter text-lg font-medium transition-all duration-500 rounded-xl relative group touch-manipulation transform
                ${
                  location.pathname === link.path
                    ? "text-primary font-semibold bg-gradient-to-r from-primary/10 to-accent/5 shadow-lg shadow-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              onClick={() => setIsMenuOpen(false)} // auto-close on link click
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <span className="relative z-10 flex items-center">
                {link.name}
                {location.pathname === link.path && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
