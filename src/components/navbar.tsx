import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "lg"
  children: React.ReactNode
}

const Button = ({ variant = "default", size = "sm", className = "", children, ...props }: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-white text-black hover:bg-gray-100",
    outline: "border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30",
    ghost: "text-white/90 hover:text-white hover:bg-white/10",
  }

  const sizes = {
    sm: "h-9 px-4 py-2 text-sm",
    lg: "px-8 py-6 text-lg",
  }

  return (
    <button
      className={`group relative overflow-hidden rounded-full ${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </button>
  )
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Services" },
    { path: "/work", label: "Work" },
    { path: "/about", label: "About" },
    { path: "/hiring", label: "Hiring" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none flex justify-center">
        <nav className="pointer-events-auto w-full max-w-[1200px] bg-[#050505]/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-between px-4 md:px-6 py-3">
          <Link to="/" className="text-white font-bold text-lg md:text-xl tracking-tight flex items-center gap-3 md:gap-2 relative z-50 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-1 leading-none text-left pt-1 md:pt-0">
              <span>Open</span>
              <span className="text-cyan-400">Brands</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1 text-sm font-medium text-gray-400">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2.5 rounded-full transition-colors duration-300 ${isActive ? "text-white font-semibold" : "hover:text-white"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 tracking-wide">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 relative z-50">
            <Link to="/contact" className="hidden lg:block">
              <button className="relative group inline-flex items-center justify-center h-10 px-6 font-bold text-sm text-black bg-cyan-400 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Start Growing
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none rounded-md pointer-events-auto"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-[90] overflow-hidden lg:hidden pt-24 border-b border-white/10"
          >
            <div className="flex flex-col items-center justify-center space-y-8 px-6 text-2xl font-semibold text-white/60 pb-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  to={link.path}
                  className={`transition-colors ${location.pathname === link.path ? "text-white" : "hover:text-white"}`}
                >
                  {link.label}
                </Link>
              ))}
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-8 w-full flex justify-center"
              >
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full max-w-sm rounded-[24px] py-6 text-lg bg-white/5 border-white/20">
                    Book a free strategy call
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
