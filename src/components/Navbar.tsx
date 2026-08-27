import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { ShareModal } from './ShareModal';
import { Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { content, setIsAdminOpen } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rawPhone = content?.phone || '+447511693329';
  const cleanPhone = String(rawPhone).replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Dannii! I'd like to book the Beauty Trap pamper bus. Can you please send me available dates?")}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/85 backdrop-blur-sm py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center space-x-2">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-bt-black">
            Beauty <span className="font-script text-3xl sm:text-4xl text-bt-gold font-normal">Trap</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-7 text-xs font-bold uppercase tracking-widest text-bt-text">
          <a href="#home" className="hover:text-bt-gold transition-colors">Home</a>
          <a href="#packages" className="hover:text-bt-gold transition-colors">Packages</a>
          <a href="#coverage" className="hover:text-bt-gold transition-colors">Areas Covered</a>
          <a href="#reviews" className="hover:text-bt-gold transition-colors">Reviews</a>
          <a href="#gallery" className="hover:text-bt-gold transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-bt-gold transition-colors">Book Now</a>
        </nav>

        <div className="hidden sm:flex items-center space-x-4">
          <ShareModal />
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-gray-400 hover:text-bt-gold transition-colors rounded-full hover:bg-bt-pink-light"
            title="Admin Dashboard (Client Updates)"
          >
            <Settings className="w-4 h-4" />
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxe bg-bt-black text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl shadow hover:bg-bt-gold hover:text-bt-black transition-all flex items-center gap-1.5"
          >
            <i className="fab fa-whatsapp text-sm text-green-400"></i> Book Now
          </a>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-gray-400 hover:text-bt-gold transition-colors"
            title="Admin Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-bt-black p-2 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-5 shadow-xl space-y-4 text-center">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-widest text-bt-text hover:text-bt-gold">Home</a>
          <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-widest text-bt-text hover:text-bt-gold">Packages</a>
          <a href="#coverage" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-widest text-bt-text hover:text-bt-gold">Areas Covered</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-widest text-bt-text hover:text-bt-gold">Reviews</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-widest text-bt-text hover:text-bt-gold">Gallery</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold uppercase tracking-widest text-bt-text hover:text-bt-gold">Book Now</a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-bt-black text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow"
          >
            Book via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};
