import React from 'react';
import { useContent } from '../context/ContentContext';

export const Coverage: React.FC = () => {
  const { content } = useContent();
  const coverage = content.coverage;
  const cleanPhone = String(content.phone || '+447511693329').replace(/[^0-9]/g, '');

  return (
    <section id="coverage" className="py-24 bg-white dark:bg-bt-dark-bg relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            We Come To You!
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white mt-2 mb-4">
            {coverage.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base">
            {coverage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(coverage.areas || []).map((area, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-bt-pink-light/60 to-white dark:from-bt-dark-card dark:to-bt-dark-bg p-5 rounded-2xl border border-pink-200/80 shadow-sm hover:shadow-md transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-bt-black">{area}</h4>
                  <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">& Surrounds</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-bt-dark-card p-6 dark:border-bt-dark-border rounded-2xl border border-gray-200/80">
              <h4 className="font-serif font-bold text-base text-bt-black mb-2 flex items-center">
                <i className="fas fa-clock text-bt-gold mr-2"></i>
                Travel Times & Radius:
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {coverage.radiusInfo}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Dannii! Can you please let me know if you cover my postcode?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxe bg-bt-black text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-lg hover:bg-bt-gold hover:text-bt-black transition-all"
              >
                <i className="fab fa-whatsapp mr-2"></i> Check My Postcode
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-bt-gold/30">
              <img
                src="/new_images/photo_10.jpeg"
                alt="Beauty Trap Pamper Bus Coverage Map"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
