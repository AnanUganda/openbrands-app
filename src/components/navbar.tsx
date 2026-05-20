import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/ui/use-scroll';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Services' },
    { path: '/templates', label: 'Templates' },
    { path: '/hiring', label: 'Hiring' },
    { path: '/work', label: 'Results' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close mobile menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
        {
          'bg-white/95 backdrop-blur-lg border-gray-200/80 shadow-sm': scrolled && !open,
          'bg-white/90': open && !scrolled,
          'bg-transparent': !scrolled && !open,
        },
      )}
    >
      <nav
        className={cn(
          'mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12 transition-all duration-300',
          { 'h-14': scrolled },
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#1A1A1A] font-bold text-xl tracking-tight group shrink-0"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(34,211,238,0.25)]">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span>Open</span>
          <span className="text-cyan-500">Brands</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-500">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative px-4 py-2 rounded-full transition-colors duration-200',
                  isActive
                    ? 'text-[#1A1A1A] font-semibold bg-black/5'
                    : 'hover:text-[#1A1A1A] hover:bg-black/5',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-[#1A1A1A] hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Get in Touch
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-[#1A1A1A] text-sm font-semibold text-white hover:bg-black transition-all shadow-sm"
          >
            Book a Call
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-[#1A1A1A] hover:bg-gray-50 transition-all"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed top-[calc(4rem)] right-0 bottom-0 left-0 z-50 lg:hidden border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out',
          open
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-2',
          scrolled ? 'top-[3.5rem]' : 'top-16',
          open ? 'bg-white/98 backdrop-blur-xl' : '',
        )}
      >
        <div className="flex h-full w-full flex-col justify-between p-6 pb-12">
          {/* Nav links */}
          <div className="grid gap-1 pt-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-xl text-lg font-semibold transition-colors',
                    isActive
                      ? 'text-[#1A1A1A] bg-black/5'
                      : 'text-gray-500 hover:text-[#1A1A1A] hover:bg-black/5',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center h-12 rounded-full border border-gray-200 bg-white text-base font-semibold text-[#1A1A1A] hover:bg-gray-50 transition-all"
            >
              Get in Touch
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#1A1A1A] text-base font-semibold text-white hover:bg-black transition-all"
            >
              Book a Strategy Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
