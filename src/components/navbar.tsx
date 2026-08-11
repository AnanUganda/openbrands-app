import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const prevScrollY = React.useRef(0);

  const navLinks = [
    { to: '/about', label: 'Our Story' },
    { to: '/portfolio', label: 'Work' },
    { to: '/blog', label: 'Blog' },
  ];

  const handleLinkClick = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY < 20) {
        setVisible(true);
      } else if (currentScrollY > prevScrollY.current + 5) {
        setVisible(false);
      } else if (currentScrollY < prevScrollY.current - 5) {
        setVisible(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: visible || open ? 0 : -100, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200/80',
          'bg-[#FBFBFB]/90 backdrop-blur-md shadow-none',
        )}
      >
        <nav
          className={cn(
            'mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-8 lg:px-12 transition-all duration-300',
            { 'h-14': scrolled },
          )}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group shrink-0"
          >
            <img
              src="/portfolio/logo.png"
              alt="Open Brands"
              className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity brightness-0"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className="relative px-4 py-2 rounded-full transition-colors duration-200 hover:text-black hover:bg-black/5 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full border border-gray-300 hover:border-gray-900 bg-white text-xs font-semibold text-[#0D0D0D] hover:bg-gray-50 transition-all shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-black" />
              Book a Strategy Call
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 transition-all cursor-pointer z-50"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            />

            {/* Framer Motion Animated Mobile Drawer */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              className={cn(
                'fixed left-0 right-0 z-45 lg:hidden overflow-hidden bg-[#FBFBFB] border-b border-gray-200/90 shadow-2xl rounded-b-3xl',
                scrolled ? 'top-[3.5rem]' : 'top-16'
              )}
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                }}
                className="flex flex-col justify-between p-6 pt-4 pb-8 max-w-lg mx-auto"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.to}
                      variants={{
                        open: { opacity: 1, y: 0, scale: 1 },
                        closed: { opacity: 0, y: -15, scale: 0.96 },
                      }}
                      transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                      <Link
                        to={link.to}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between px-5 py-4 rounded-2xl text-xl font-bold transition-all text-[#0D0D0D] bg-gray-100/60 hover:bg-[#BFF549]/20 hover:text-black group border border-gray-200/50"
                      >
                        <span>{link.label}</span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0D0D0D] group-hover:bg-[#BFF549] transition-all shadow-xs">
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 },
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="pt-6 mt-4 border-t border-gray-200/80 flex flex-col gap-3"
                >
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-3 h-14 rounded-full bg-[#0D0D0D] text-white text-base font-bold hover:bg-gray-900 transition-all shadow-lg group"
                  >
                    <span>Book a Strategy Call</span>
                    <div className="w-7 h-7 rounded-full bg-[#BFF549] text-[#0D0D0D] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
