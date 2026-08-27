import React from 'react';
import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { content, setIsAdminOpen } = useContent();
  const phone = content?.phone || '+447511693329';
  const instagram = content?.instagram || 'beautytrappamperbus';
  const email = content?.email || 'Danielletheo84@gmail.com';
  const cleanPhone = String(phone).replace(/[^0-9]/g, '');

  return (
    <footer className="bg-black text-gray-400 py-16 px-4 text-center border-t border-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <span className="font-serif text-3xl font-bold text-white">
            The Beauty <span className="font-script text-4xl text-bt-gold font-normal">Trap</span>
          </span>
          <p className="text-xs text-bt-gold uppercase tracking-widest mt-1">
            Pamper Bus • Children's Parties & Private Functions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm uppercase tracking-wider font-semibold">
          <a href="#home" className="hover:text-bt-gold transition-colors">Home</a>
          <a href="#packages" className="hover:text-bt-gold transition-colors">Packages</a>
          <a href="#coverage" className="hover:text-bt-gold transition-colors">Areas Covered</a>
          <a href="#reviews" className="hover:text-bt-gold transition-colors">Reviews</a>
          <a href="#gallery" className="hover:text-bt-gold transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-bt-gold transition-colors">Book Now</a>
        </div>

        <div className="flex justify-center items-center space-x-4 text-lg pt-2">
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-gray-900 hover:bg-green-600 text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp text-lg"></i>
          </a>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-gray-900 hover:bg-pink-600 text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a
            href={`mailto:${email}`}
            className="w-11 h-11 rounded-full bg-gray-900 hover:bg-bt-gold text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Email"
          >
            <i className="fas fa-envelope text-lg"></i>
          </a>
        </div>

        <div className="pt-8 border-t border-gray-900 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} The Beauty Trap Pamper Bus. All rights reserved.</p>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="text-gray-500 hover:text-bt-gold underline text-[11px]"
          >
            ⚙️ Client Admin Dashboard (Self-Updates)
          </button>
        </div>
      </div>
    </footer>
  );
};
