import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.avif";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

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
                  ? "text-[#d4af37] scale-105 blur-none"
                  : "text-white/60 blur-[.5px] hover:blur-none hover:text-white transition-all duration-400"
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* 🔥 AUTH PART */}
          {currentUser ? (
            <div className="relative flex items-center gap-4 transition-all duration-300 blur-[.5px] hover:blur-none transition-all duration-400">
              {/* Avatar */}
              <button onClick={() => setOpenMenu(!openMenu)}>
                <img
                  src={`https://ui-avatars.com/api/?name=${currentUser.email}`}
                  className="w-9 h-9 rounded-full border border-white/20 cursor-pointer"
                />
              </button>

              {/* Dropdown */}
              {openMenu && (
                <div className="absolute right-0 top-12 bg-white text-black shadow-lg rounded-lg w-48 p-2 z-50">
                  {/* <Link
                    to="/profile"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setOpenMenu(false)}
                  >
                    👤 Edit Profile
                  </Link> */}

                  <Link
                    to="/reset-password"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                    onClick={() => setOpenMenu(false)}
                  >
                    🔒 Reset Password
                  </Link>

                  <button
                    onClick={async () => {
                      await logout();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-500 rounded"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={`text-sm font-medium transition-all duration-300 ${isActive("/login")
                  ? "text-[#d4af37] scale-105 blur-none"
                  : "text-white/60 blur-[.5px] hover:blur-none hover:text-white transition-all duration-400"
                }`}>
                Login
              </Link>
              <Link to="/signup" className={`text-sm font-medium transition-all duration-300 ${isActive("/signup")
                  ? "text-[#d4af37] scale-105 blur-none"
                  : "text-white/60 blur-[.5px] hover:blur-none hover:text-white transition-all duration-400"
                }`}>
                Signup
              </Link>
            </>
          )}
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
                className={`text-sm font-medium transition-all duration-300 ${isActive(link.path)
                    ? "text-[#d4af37] scale-105 blur-none"
                    : "text-white/60 blur-[.5px] hover:blur-none hover:text-white transition-all duration-400"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            {/* AUTH MOBILE */}
            {currentUser ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={async () => {
                    await logout();
                    setIsOpen(false);
                  }}
                  className="text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className={`text-sm font-medium transition-all duration-300 ${isActive("/login")
                    ? "text-[#d4af37] scale-105 blur-none"
                    : "text-white/60 blur-[.5px] hover:blur-none hover: text-white transition-all duration-400"
                  }`}>
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className={`text-sm font-medium transition-all duration-300 ${isActive("/signup")
                    ? "text-[#d4af37] scale-105 blur-none"
                    : "text-white/60 blur-[.5px] hover:blur-none hover:text-white transition-all duration-400"
                  }`}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
