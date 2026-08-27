import React from 'react';
import { useContent } from '../context/ContentContext';

export const Packages: React.FC = () => {
  const { content } = useContent();
  const { packages, phone, depositText } = content;

  const getWhatsAppLink = (pkgName: string, guests?: string, price?: string) => {
    const details = guests && price ? ` (${guests} - ${price})` : '';
    const msg = `Hi Dannii! I'm interested in booking the ${pkgName}${details} for the Beauty Trap pamper bus. Can you please check availability for our date?`;
    return `https://wa.me/${(phone || '+447511693329').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="packages" className="py-24 bg-gradient-to-b from-bt-pink-light/60 via-white to-bt-pink-light/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-up">
          <span className="text-bt-gold font-script text-3xl sm:text-4xl block">
            {packages?.scriptTitle || 'Choose Your Luxury'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl mt-2 mb-4 text-bt-black">
            {packages?.mainTitle || 'Children’s Pamper Packages'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            {packages?.subtitle || 'Full bus hire, luxury treatments, sparkle and fun for your guests!'}
          </p>
          <div className="inline-block mt-4 bg-bt-gold/15 border border-bt-gold text-bt-black px-6 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm">
            ✨ {depositText || '£100 Deposit Secures Your Party Date!'}
          </div>
        </div>

        {/* 3 Main Packages: Bronze, Silver, Gold (TEXT FORM) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {(packages?.items || []).map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-t-8 ${pkg.borderClass || 'border-bt-gold'} ${
                pkg.popular ? 'transform md:-translate-y-4 shadow-2xl relative ring-2 ring-bt-pink-main/50' : ''
              } hover:-translate-y-2 transition-all duration-300 flex flex-col`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-bt-pink-light flex items-center justify-center">
                  <i className={`${pkg.icon || 'fas fa-crown text-bt-gold'} text-2xl`}></i>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                  {pkg.treatmentsCount || 'Treatments Included'}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bt-black mb-4">
                {pkg.name}
              </h3>

              {/* Tier Pricing Table (Text Form) */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 mb-6 border border-gray-100 space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Guest Pricing</p>
                {(pkg.pricing || []).map((tier, tIdx) => (
                  <div
                    key={tIdx}
                    className="flex items-center justify-between text-sm py-1 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600 font-medium">⭐ {tier.guests}</span>
                    <span className="font-serif font-bold text-lg text-bt-black">{tier.price}</span>
                  </div>
                ))}
              </div>

              {/* Package Features List */}
              <div className="space-y-3 text-sm text-gray-600 mb-8 flex-grow">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Includes</p>
                {(pkg.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start">
                    <i className="fas fa-check-circle text-bt-gold mt-1 mr-3 flex-shrink-0"></i>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppLink(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-luxe block w-full py-3.5 text-center text-xs font-bold uppercase tracking-widest transition-all rounded-xl shadow-md ${
                  pkg.popular
                    ? 'bg-bt-black text-white hover:bg-bt-gold hover:text-bt-black'
                    : 'bg-bt-pink-light text-bt-black border border-bt-gold hover:bg-bt-gold hover:text-bt-black'
                }`}
              >
                Book {pkg.name}
              </a>
            </div>
          ))}
        </div>

        {/* Choose Your Treatments Menu */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-bt-gold/20 mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-bt-gold bg-bt-pink-light px-4 py-1.5 rounded-full border border-bt-gold/30">
              Customise Your Experience
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-bt-black mt-3 font-bold">
              Choose Your Treatments
            </h3>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              Every guest chooses their favourite treatments depending on their selected package!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(packages?.treatmentCategories || []).map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-bt-pink-light/40 to-white border border-pink-100 hover:border-bt-gold/50 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <i className={`${cat.icon} text-lg`}></i>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-bt-black">{cat.title}</h4>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {(cat.items || []).map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-bt-gold mr-2.5"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Extra 13+ Treatments */}
          <div className="mt-10 pt-8 border-t border-pink-100 bg-pink-50/50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="font-serif font-bold text-lg text-bt-black flex items-center">
                  <i className="fas fa-sparkles text-bt-gold mr-2"></i>
                  Extra Treatments for Guests Aged 13+
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">Specialist glam options for teen parties & hen parties</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(packages?.extraTreatments13Plus || []).map((extra, idx) => (
                <span
                  key={idx}
                  className="bg-white text-gray-800 text-xs font-semibold px-4 py-2 rounded-full border border-pink-200 shadow-sm"
                >
                  ✨ {extra}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Every Party Includes Banner */}
        <div className="bg-bt-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <span className="font-script text-3xl sm:text-4xl text-bt-gold block mb-2">
              VIP Treatment
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-8">
              Every Party Always Includes:
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {(packages?.partyIncludes || []).map((inc, idx) => (
                <div key={idx} className="bg-gray-900/80 p-4 rounded-xl border border-gray-800 text-center">
                  <div className="text-bt-gold text-xl mb-2">
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-200">{inc}</p>
                </div>
              ))}
            </div>

            <div className="bg-bt-gold/10 border border-bt-gold/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h4 className="font-serif font-bold text-lg text-bt-gold">Ready to Secure Your Date?</h4>
                <p className="text-xs text-gray-300">£100 deposit secures your preferred date & time slot.</p>
              </div>
              <a
                href={getWhatsAppLink('Party Booking')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxe bg-bt-gold text-bt-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-xl shadow-lg hover:bg-yellow-400 transition-all flex-shrink-0"
              >
                <i className="fab fa-whatsapp mr-2 text-sm"></i> WhatsApp Dannii
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
