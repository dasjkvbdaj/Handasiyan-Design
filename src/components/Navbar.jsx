import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "AI Design", path: "/ai-design" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === "/";
  const shouldHide = isHomePage && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${shouldHide
        ? "opacity-0 -translate-y-full pointer-events-none"
        : "opacity-100 translate-y-0"
        } ${scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="block">
          <img
            src={logo}
            alt="Handasiyan"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-all duration-300 ${isActive(link.path)
                ? "text-[#d4af37] scale-105"
                : "text-white/70 hover:text-white"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl absolute top-20 left-0 w-full p-6 border-b border-white/10">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-colors ${isActive(link.path) ? "text-[#d4af37]" : "text-white/60"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
