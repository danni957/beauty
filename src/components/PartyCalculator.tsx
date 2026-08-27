import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Calculator, Sparkles, MapPin, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

export const PartyCalculator: React.FC = () => {
  const { content } = useContent();
  const { phone, packages } = content;

  // Pricing Matrix from Client
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(1); // Default Silver (Most Popular)
  const [selectedGuests, setSelectedGuests] = useState('8'); // 6, 8, 10, 12
  const [postcode, setPostcode] = useState('');
  const [postcodeStatus, setPostcodeStatus] = useState<'idle' | 'covered' | 'extended'>('idle');

  const pkgList = packages?.items || [];
  const currentPkg = pkgList[selectedPkgIndex] || pkgList[0];

  // Calculate live price
  const tier = currentPkg?.pricing?.find(p => p.guests.includes(selectedGuests)) || currentPkg?.pricing?.[1];
  const basePriceNum = parseInt(tier?.price?.replace(/[^0-9]/g, '') || '500', 10);
  const deposit = 100;
  const balanceDue = basePriceNum - deposit;

  // Postcode verification
  const checkPostcode = (code: string) => {
    const clean = code.trim().toUpperCase();
    setPostcode(clean);
    if (!clean) {
      setPostcodeStatus('idle');
      return;
    }

    // Common London, Essex, Surrey, Herts, Beds, Oxfordshire prefix match
    const primaryPrefixes = ['RM', 'IG', 'CM', 'SS', 'CO', 'E', 'EC', 'WC', 'N', 'NW', 'SE', 'SW', 'W', 'CR', 'BR', 'DA', 'WD', 'AL', 'EN', 'SG', 'LU', 'MK', 'OX', 'GU', 'KT', 'SM', 'TW', 'UB', 'HA'];
    const matched = primaryPrefixes.some(prefix => clean.startsWith(prefix));

    if (matched) {
      setPostcodeStatus('covered');
    } else {
      setPostcodeStatus('extended');
    }
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hi Dannii! I used the online Party Calculator and would like to check availability:

Selected Package: ${currentPkg?.name} (${currentPkg?.treatmentsCount})
Guests: ${selectedGuests} People
Total Estimated Price: £${basePriceNum} (£100 Deposit + £${balanceDue} On Party Day)
${postcode ? `Postcode: ${postcode}` : ''}

Can you please let me know your available dates?`;

    const cleanPhone = String(phone || '+447511693329').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 bg-white dark:bg-bt-dark-bg relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            Instant Estimate
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white mt-2">
            Party Price & Travel Calculator
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mt-2">
            Select your package and guest count below to generate an instant transparent quote!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Configurator */}
          <div className="lg:col-span-7 bg-gradient-to-b from-bt-pink-light/60 to-white dark:from-[#1c1222] dark:to-[#140d19] p-6 sm:p-8 rounded-3xl border border-pink-200/80 dark:border-bt-gold/30 shadow-xl space-y-6">
            {/* Step 1: Package Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-bt-gold" /> Step 1: Select Pamper Package
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {pkgList.map((pkg, idx) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkgIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                      selectedPkgIndex === idx
                        ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black border-bt-black dark:border-bt-gold shadow-lg scale-102'
                        : 'bg-white dark:bg-[#23172b] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-bt-gold/60'
                    }`}
                  >
                    <span className="text-xs font-serif font-bold">{pkg.name.replace(' Package', '')}</span>
                    <span className="text-[10px] opacity-80 mt-1">{pkg.treatmentsCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Number of Guests */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3">
                Step 2: Number of Guests
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {['6', '8', '10', '12'].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedGuests(count)}
                    className={`py-3 rounded-xl border text-center text-xs font-bold transition-all ${
                      selectedGuests === count
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-500 shadow-md scale-102'
                        : 'bg-white dark:bg-[#23172b] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-pink-300'
                    }`}
                  >
                    {count} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Postcode Radius Checker */}
            <div className="pt-2 border-t border-pink-100 dark:border-gray-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-bt-gold" /> Step 3: Check Your Postcode / Area
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => checkPostcode(e.target.value)}
                  placeholder="e.g. RM1, CM2, CR0, AL1, OX1..."
                  className="flex-1 bg-white dark:bg-[#23172b] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl px-4 py-2.5 text-sm uppercase focus:border-bt-gold focus:outline-none"
                />
              </div>

              {postcodeStatus === 'covered' && (
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-950/40 p-2.5 rounded-xl border border-green-200 dark:border-green-800 animate-fade-in">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Great news! {postcode} is in our standard VIP travel zone (London, Essex, Surrey & Home Counties)!</span>
                </div>
              )}
              {postcodeStatus === 'extended' && (
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 animate-fade-in">
                  <Sparkles className="w-4 h-4 flex-shrink-0 text-bt-gold" />
                  <span>{postcode}: We travel UK wide for private functions! Dannii will confirm exact travel availability on WhatsApp.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Quote Card Summary */}
          <div className="lg:col-span-5 bg-bt-black dark:bg-[#120916] text-white rounded-3xl p-6 sm:p-8 border border-bt-gold/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-bt-gold">Live Party Quote</span>
                <span className="text-[11px] bg-bt-gold/20 text-bt-gold px-3 py-1 rounded-full font-bold">
                  {currentPkg?.name}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Selected Package:</span>
                  <span className="font-bold text-white">{currentPkg?.name}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Included Treatments:</span>
                  <span className="font-bold text-bt-gold">{currentPkg?.treatmentsCount}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Party Guests:</span>
                  <span className="font-bold text-white">{selectedGuests} Guests</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Deposit to Secure:</span>
                  <span className="font-bold text-green-400">£100</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Balance on Party Day:</span>
                  <span className="font-bold text-white">£{balanceDue}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 block">Total Party Price:</span>
                    <span className="text-[11px] text-gray-400">Everything Included</span>
                  </div>
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-bt-gold">
                    £{basePriceNum}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full bg-gradient-to-r from-bt-gold to-yellow-400 hover:from-yellow-400 hover:to-bt-gold text-bt-black font-bold uppercase tracking-wider text-xs py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 text-bt-black" />
                <span>Book This Quote On WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-center text-gray-400 mt-2">
                ✨ No obligation • Instant date availability check with Dannii
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
