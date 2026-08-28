import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { ShareModal } from './ShareModal';
import { ThemeToggle } from './ThemeToggle';
import { Settings, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { content, setIsAdminOpen } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rawPhone = content?.phone || '+447511693329';
  const cleanPhone = String(rawPhone).replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Dannii! I'd like to book the Beauty Trap pamper bus. Can you please send me available dates?")}`;

  return (
    <div className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-500">
      <header
        className={`pointer-events-auto max-w-7xl mx-auto rounded-full transition-all duration-500 border ${
          scrolled
            ? 'bg-white/85 dark:bg-[#0f0714]/85 backdrop-blur-2xl border-bt-gold/40 shadow-[0_15px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.8)] py-2 sm:py-2.5 px-4 sm:px-6 scale-[0.99] sm:scale-100 ring-1 ring-bt-gold/20'
            : 'bg-white/70 dark:bg-[#150a1b]/70 backdrop-blur-xl border-white/80 dark:border-bt-gold/30 shadow-[0_10px_35px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-3 sm:py-3.5 px-4 sm:px-7'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo with Pop-out Hover */}
          <a
            href="#home"
            className="flex items-center space-x-2 group transform hover:scale-105 transition-transform duration-300"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-bt-black dark:text-white flex items-center">
              Beauty
              <span className="font-script text-2xl sm:text-3xl text-bt-gold font-normal ml-1 drop-shadow-sm group-hover:text-yellow-400 transition-colors">
                Trap
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[11px] font-bold uppercase tracking-wider text-bt-text dark:text-gray-200">
            <a
              href="#home"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              Home
            </a>
            <a
              href="#packages"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              Packages
            </a>
            <a
              href="#calculator"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              Calculator
            </a>
            <a
              href="#coverage"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              Areas Covered
            </a>
            <a
              href="#reviews"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              Reviews
            </a>
            <a
              href="#gallery"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              Gallery
            </a>
            <a
              href="#faq"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="px-3 py-1.5 rounded-full hover:bg-bt-pink-light/70 dark:hover:bg-white/10 hover:text-bt-gold transition-all"
            >
              Book Now
            </a>
          </nav>

          {/* Right Action Icons & Bulging CTA */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <div className="transform hover:scale-110 transition-transform">
              <ThemeToggle />
            </div>
            <div className="transform hover:scale-110 transition-transform">
              <ShareModal />
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-bt-gold dark:hover:text-bt-gold transition-all rounded-full hover:bg-bt-pink-light/80 dark:hover:bg-white/10 transform hover:scale-110"
              title="Admin Dashboard (Client Updates)"
            >
              <Settings className="w-4 h-4" />
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe bg-gradient-to-r from-bt-gold via-yellow-400 to-bt-gold text-bt-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_6px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.55)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <i className="fab fa-whatsapp text-sm text-green-900"></i> Book Now
            </a>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-gray-400 hover:text-bt-gold transition-colors"
              title="Admin Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-bt-pink-light/80 dark:bg-white/10 text-bt-black dark:text-white flex items-center justify-center focus:outline-none shadow-sm"
              aria-label="Toggle Navigation"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-base`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Frosted Pop-out Card) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-3 border-t border-gray-200/60 dark:border-bt-dark-border space-y-2 text-center animate-fade-in">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              Home
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              Packages
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              Party Calculator
            </a>
            <a
              href="#coverage"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              Areas Covered
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              Reviews
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              Gallery
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest text-bt-text dark:text-gray-200 hover:text-bt-gold"
            >
              Book Now
            </a>
            <div className="pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-bt-gold to-yellow-400 text-bt-black text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
              >
                Book via WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
