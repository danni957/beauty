import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Sparkles, MapPin, CheckCircle, ArrowRight, MessageCircle, Clock, Gift, Check } from 'lucide-react';

export const PartyCalculator: React.FC = () => {
  const { content } = useContent();
  const { phone, packages, addons, timeSlots } = content;

  // Available slots
  const availableSlots = timeSlots && timeSlots.length > 0 ? timeSlots : [
    '🌅 Morning Slot (11:00 AM)',
    '☀️ Afternoon Slot (2:00 PM)',
    '🌆 Evening VIP Slot (5:00 PM)'
  ];

  // Available add-ons from dynamic CMS
  const availableAddons = addons && addons.length > 0 ? addons : [
    {
      id: 'custom-robes',
      name: 'Personalised Name Embroidered Silk Robes',
      price: 10.50,
      perGuest: true,
      desc: 'Keepsake luxury pink silk robes with each child’s name to take home',
      icon: '🎀'
    },
    {
      id: 'deluxe-tiara',
      name: 'Birthday Girl Deluxe 24k Gold Tiara & Silk Sash',
      price: 20,
      desc: 'Royal crowning ceremony for the birthday VIP princess',
      icon: '👑'
    }
  ];

  // State
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(1);
  const [selectedGuests, setSelectedGuests] = useState('8');
  const [selectedSlot, setSelectedSlot] = useState(availableSlots[1] || availableSlots[0]);
  const [partyDate, setPartyDate] = useState('');
  const [postcode, setPostcode] = useState('');
  const [postcodeStatus, setPostcodeStatus] = useState<'idle' | 'covered' | 'extended'>('idle');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const pkgList = packages?.items || [];
  const currentPkg = pkgList[selectedPkgIndex] || pkgList[0];

  // Calculate Base Price
  const tier = currentPkg?.pricing?.find(p => p.guests.includes(selectedGuests)) || currentPkg?.pricing?.[1];
  const basePriceNum = parseInt(tier?.price?.replace(/[^0-9]/g, '') || '500', 10);

  // Calculate Add-ons Price
  const guestCountNum = parseInt(selectedGuests, 10) || 8;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = availableAddons.find(a => a.id === addonId);
    if (!item) return sum;
    const itemCost = item.perGuest ? Number(item.price) * guestCountNum : Number(item.price);
    return sum + itemCost;
  }, 0);

  const grandTotal = Math.round((basePriceNum + addonsTotal) * 100) / 100;
  const deposit = 100;
  const balanceDue = Math.round((grandTotal - deposit) * 100) / 100;

  // Toggle Add-on
  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Postcode verification
  const checkPostcode = (code: string) => {
    const clean = code.trim().toUpperCase();
    setPostcode(clean);
    if (!clean) {
      setPostcodeStatus('idle');
      return;
    }

    const primaryPrefixes = ['RM', 'IG', 'CM', 'SS', 'CO', 'E', 'EC', 'WC', 'N', 'NW', 'SE', 'SW', 'W', 'CR', 'BR', 'DA', 'WD', 'AL', 'EN', 'SG', 'LU', 'MK', 'OX', 'GU', 'KT', 'SM', 'TW', 'UB', 'HA'];
    const matched = primaryPrefixes.some(prefix => clean.startsWith(prefix));

    if (matched) {
      setPostcodeStatus('covered');
    } else {
      setPostcodeStatus('extended');
    }
  };

  // Format GBP
  const formatGBP = (num: number) => {
    return num % 1 === 0 ? `£${num}` : `£${num.toFixed(2)}`;
  };

  // Handle WhatsApp Booking with Full Summary
  const handleWhatsAppBooking = () => {
    const chosenAddonNames = selectedAddons.map(id => {
      const a = availableAddons.find(item => item.id === id);
      if (!a) return '';
      const cost = a.perGuest ? Number(a.price) * guestCountNum : Number(a.price);
      return `• ${a.name} (+${formatGBP(cost)}${a.perGuest ? ` @ ${formatGBP(Number(a.price))}/child` : ''})`;
    }).filter(Boolean).join('\n');

    const msg = `Hi Dannii! I used your online Party Calculator and would like to check availability:

👑 Selected Package: ${currentPkg?.name} (${currentPkg?.treatmentsCount})
👥 Guests: ${selectedGuests} People
🗓️ Preferred Date: ${partyDate || 'To be confirmed'}
⏰ Preferred Slot: ${selectedSlot}
📍 Postcode: ${postcode || 'Standard London / Essex'}

${chosenAddonNames ? `✨ Selected VIP Add-ons:\n${chosenAddonNames}\n` : ''}
💰 Total Price: ${formatGBP(grandTotal)} (£100 Deposit + ${formatGBP(balanceDue)} On Party Day)

Can you please confirm if this date & time slot is available?`;

    const cleanPhone = String(phone || '+447511693329').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 bg-white dark:bg-bt-dark-bg relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            Customise & Quote
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white mt-2">
            Interactive Party & Add-on Calculator
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mt-2">
            Pick your package, preferred time slot, guest count and optional VIP upgrades to see an instant transparent estimate!
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
                        ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black border-bt-black dark:border-bt-gold shadow-lg scale-102 ring-2 ring-bt-gold/40'
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

            {/* Step 3: Date & Preferred Time Slot */}
            <div className="pt-2 border-t border-pink-100 dark:border-gray-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-bt-gold" /> Step 3: Preferred Date & Time Slot
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      value={partyDate}
                      onChange={(e) => setPartyDate(e.target.value)}
                      className="w-full bg-white dark:bg-[#23172b] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:border-bt-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                        selectedSlot === slot
                          ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black border-bt-black dark:border-bt-gold shadow-md'
                          : 'bg-white dark:bg-[#23172b] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-bt-gold/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Optional VIP Add-ons (Dannii's Approved Selection) */}
            {availableAddons.length > 0 && (
              <div className="pt-2 border-t border-pink-100 dark:border-gray-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-bt-gold" /> Step 4: Optional VIP Party Add-ons
                </label>
                <div className="space-y-2.5">
                  {availableAddons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    const costNum = addon.perGuest ? Number(addon.price) * guestCountNum : Number(addon.price);
                    const priceLabel = addon.perGuest
                      ? `+${formatGBP(costNum)} (${formatGBP(Number(addon.price))}/child)`
                      : `+${formatGBP(costNum)}`;

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-400 dark:border-pink-700 shadow-sm'
                            : 'bg-white dark:bg-[#23172b] border-gray-200 dark:border-gray-700 hover:border-pink-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                            isChecked
                              ? 'bg-pink-500 text-white border-pink-500'
                              : 'border-gray-300 dark:border-gray-600 text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-bt-black dark:text-white flex items-center gap-1.5">
                              <span>{addon.icon}</span> {addon.name}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">{addon.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-bt-gold flex-shrink-0 bg-white dark:bg-gray-800 px-2.5 py-1 rounded-full border border-bt-gold/30">
                          {priceLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Postcode Radius Checker */}
            <div className="pt-2 border-t border-pink-100 dark:border-gray-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-bt-gold" /> Step 5: Check Postcode / Area
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
                {partyDate && (
                  <div className="flex justify-between text-gray-300">
                    <span>Party Date:</span>
                    <span className="font-bold text-white">{partyDate}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300 text-xs">
                  <span>Time Slot:</span>
                  <span className="font-medium text-pink-300 truncate max-w-[180px]">{selectedSlot}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>VIP Add-ons ({selectedAddons.length}):</span>
                    <span className="font-bold text-yellow-300">+{formatGBP(addonsTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300 pt-2 border-t border-gray-800">
                  <span>Deposit to Secure:</span>
                  <span className="font-bold text-green-400">£100</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Balance on Party Day:</span>
                  <span className="font-bold text-white">{formatGBP(balanceDue)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 block">Total Party Price:</span>
                    <span className="text-[11px] text-gray-400">Everything Included</span>
                  </div>
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-bt-gold">
                    {formatGBP(grandTotal)}
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
