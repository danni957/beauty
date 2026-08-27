import React from 'react';
import { useContent } from '../context/ContentContext';

export const Hero: React.FC = () => {
  const { content } = useContent();
  const hero = content.hero;
  const cleanPhone = String(content.phone || '+447511693329').replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Dannii! I'd like to enquire about booking the Beauty Trap pamper bus.")}`;

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-bt-pink-light via-white to-white dark:from-bt-dark-card dark:via-bt-dark-bg dark:to-bt-dark-bg relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left fade-up">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-bt-gold mb-3 bg-white/90 dark:bg-bt-dark-card/90 px-4 py-1.5 rounded-full border border-bt-gold/30 shadow-sm">
              ✨ {hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-bt-black dark:text-white leading-[1.12] mb-3">
              {hero.titleLine1}{' '}
              <span className="italic text-bt-gold font-serif block sm:inline">
                {hero.titleHighlight}
              </span>{' '}
              {hero.titleLine2}
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-pink-600 dark:text-pink-400 mb-6">
              {hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#packages"
                className="btn-luxe w-full sm:w-auto bg-bt-black text-white dark:bg-bt-gold dark:text-bt-black px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-lg hover:bg-bt-gold hover:text-bt-black transition-all"
              >
                View Packages & Prices
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border-2 border-green-600 text-green-700 dark:text-green-400 bg-green-50/50 dark:bg-green-950/40 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <i className="fab fa-whatsapp text-base"></i> WhatsApp Dannii
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative fade-up">
            <div className="relative z-10 rotate-1 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto">
              <div className="img-frame rounded-3xl overflow-hidden shadow-2xl relative dark:bg-bt-dark-card dark:border-bt-gold">
                <video
                  src={hero.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full rounded-2xl object-cover"
                  style={{ aspectRatio: '9/16', maxHeight: '550px' }}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-6 left-6 right-6 text-white drop-shadow-lg text-center bg-black/60 backdrop-blur-sm py-2.5 px-4 rounded-xl pointer-events-none border border-white/20">
                  <p className="font-serif italic text-lg sm:text-xl text-bt-gold-light">
                    "See the Magic in Action!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
