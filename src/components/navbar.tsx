import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/ui/use-scroll';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { ArrowRight } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/about', label: 'Our Story' },
    { to: '/projects', label: 'Work' },
    { to: '/blog', label: 'Blog' },
  ];

  const handleLinkClick = () => {
    setOpen(false);
  };

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
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
        {
          'bg-[#0D0D0D]/95 backdrop-blur-lg border-white/[0.06] shadow-lg shadow-black/20': scrolled && !open,
          'bg-[#0D0D0D]/90': open && !scrolled,
          'bg-transparent': !scrolled && !open,
        },
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
            className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-400">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleLinkClick}
              className="relative px-4 py-2 rounded-full transition-colors duration-200 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-[#BFF549] text-sm font-semibold text-[#0D0D0D] hover:bg-[#d4ff6e] transition-all shadow-[0_0_20px_rgba(191,245,73,0.15)] hover:shadow-[0_0_30px_rgba(191,245,73,0.25)] group"
          >
            Book a Strategy Call
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed top-[calc(4rem)] right-0 bottom-0 left-0 z-50 lg:hidden border-t border-white/[0.06] overflow-hidden transition-all duration-300 ease-in-out',
          open
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-2',
          scrolled ? 'top-[3.5rem]' : 'top-16',
          open ? 'bg-[#0D0D0D]/98 backdrop-blur-xl' : '',
        )}
      >
        <div className="flex h-full w-full flex-col justify-between p-6 pb-12">
          <div className="grid gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className="flex items-center px-4 py-3 rounded-xl text-lg font-semibold transition-colors text-gray-400 hover:text-white hover:bg-white/5 text-left"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#BFF549] text-base font-semibold text-[#0D0D0D] hover:bg-[#d4ff6e] transition-all"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
