import React, { useState } from 'react';
import { Mail, Sparkles, Download, Share2, Crown, Calendar, Clock, MapPin, Check } from 'lucide-react';

export const InvitationGenerator: React.FC = () => {
  const [childName, setChildName] = useState('Princess Sophie');
  const [childAge, setChildAge] = useState('8th');
  const [partyDate, setPartyDate] = useState('Saturday, 14th October');
  const [partyTime, setPartyTime] = useState('2:30 PM - 4:30 PM');
  const [partyLocation, setPartyLocation] = useState('Outside Sophie’s House');
  const [rsvpContact, setRsvpContact] = useState('07123 456789');

  const handleShareInvite = () => {
    const inviteText = `👑 YOU’RE INVITED TO A VIP SPA PARTY! 💖

You are invited to celebrate ${childName}’s ${childAge} Birthday aboard The Beauty Trap Pamper Bus!

✨ Treatments: Plouise Makeup, Velvet Pedicures, Hair Braiding & Face Gems!
👗 Dress Code: Pink & Sparkles!
🗓️ Date: ${partyDate}
⏰ Time: ${partyTime}
📍 Location: ${partyLocation}
📞 RSVP: Please let us know by contacting ${rsvpContact}

Get ready for the ultimate pamper experience on wheels! ✨`;

    if (navigator.share) {
      navigator.share({
        title: `VIP Pamper Party Invitation for ${childName}`,
        text: inviteText,
        url: 'https://beautytrappamperbus.com/'
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(inviteText)}`, '_blank');
    }
  };

  return (
    <section id="invitations" className="py-24 px-4 sm:px-6 bg-white dark:bg-bt-dark-bg relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            Free VIP Service
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white mt-2">
            Free WhatsApp Party Invitations Maker
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mt-2">
            Planning your party? Customise this luxury VIP Party Pass to share with parents and school friends on WhatsApp!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Input Form */}
          <div className="lg:col-span-6 bg-pink-50/60 dark:bg-[#180f1f] p-6 sm:p-8 rounded-3xl border border-pink-200 dark:border-bt-gold/30 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-bt-black dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-bt-gold" /> Customise Invitation Card
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 dark:text-gray-300 mb-1">
                  Birthday Child's Name
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Sophie"
                  className="w-full bg-white dark:bg-[#24172c] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl p-3 text-sm focus:border-bt-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 dark:text-gray-300 mb-1">
                  Age Turning
                </label>
                <input
                  type="text"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="e.g. 8th"
                  className="w-full bg-white dark:bg-[#24172c] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl p-3 text-sm focus:border-bt-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 dark:text-gray-300 mb-1">
                  Party Date
                </label>
                <input
                  type="text"
                  value={partyDate}
                  onChange={(e) => setPartyDate(e.target.value)}
                  placeholder="e.g. Sat 14th Oct"
                  className="w-full bg-white dark:bg-[#24172c] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl p-3 text-sm focus:border-bt-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 dark:text-gray-300 mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  value={partyTime}
                  onChange={(e) => setPartyTime(e.target.value)}
                  placeholder="e.g. 2:30 PM - 4:30 PM"
                  className="w-full bg-white dark:bg-[#24172c] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl p-3 text-sm focus:border-bt-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 dark:text-gray-300 mb-1">
                  Location / Address
                </label>
                <input
                  type="text"
                  value={partyLocation}
                  onChange={(e) => setPartyLocation(e.target.value)}
                  placeholder="e.g. 12 High Street"
                  className="w-full bg-white dark:bg-[#24172c] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl p-3 text-sm focus:border-bt-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-500 dark:text-gray-300 mb-1">
                  RSVP Contact Number
                </label>
                <input
                  type="text"
                  value={rsvpContact}
                  onChange={(e) => setRsvpContact(e.target.value)}
                  placeholder="e.g. Mum: 07123 456789"
                  className="w-full bg-white dark:bg-[#24172c] border border-gray-300 dark:border-gray-700 text-bt-black dark:text-white rounded-xl p-3 text-sm focus:border-bt-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleShareInvite}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-bold uppercase tracking-wider text-xs py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share Invitation Card on WhatsApp
              </button>
            </div>
          </div>

          {/* Right: Live Interactive Card Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="max-w-sm w-full bg-gradient-to-b from-[#180e1d] to-[#0c060f] text-white rounded-3xl p-7 border-2 border-bt-gold/60 shadow-[0_20px_50px_rgba(212,175,55,0.25)] relative overflow-hidden text-center space-y-5 transform hover:scale-102 transition-transform">
              {/* Top Banner */}
              <div className="flex items-center justify-center space-x-2">
                <Crown className="w-5 h-5 text-bt-gold" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-bt-gold bg-bt-gold/20 px-3 py-1 rounded-full border border-bt-gold/30">
                  Official VIP Party Pass
                </span>
                <Crown className="w-5 h-5 text-bt-gold" />
              </div>

              <div>
                <h4 className="font-script text-4xl text-bt-gold leading-tight">{childName}’s</h4>
                <p className="font-serif text-2xl font-bold uppercase tracking-wide text-white mt-0.5">
                  {childAge} Birthday Pamper Party!
                </p>
                <p className="text-[11px] text-pink-300 font-medium mt-1">
                  Aboard The Beauty Trap Pamper Bus 🚌💖
                </p>
              </div>

              {/* Card Details Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2.5 text-xs text-left">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Calendar className="w-4 h-4 text-bt-gold flex-shrink-0" />
                  <span><strong>Date:</strong> {partyDate}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Clock className="w-4 h-4 text-bt-gold flex-shrink-0" />
                  <span><strong>Time:</strong> {partyTime}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-200">
                  <MapPin className="w-4 h-4 text-bt-gold flex-shrink-0" />
                  <span><strong>Location:</strong> {partyLocation}</span>
                </div>
              </div>

              <div className="text-[11px] text-gray-300 space-y-1">
                <p>✨ <strong>Includes:</strong> Plouise Glam, Nails, Braids & Karaoke!</p>
                <p>👗 <strong>Dress Code:</strong> Pink & Sparkles</p>
                <p className="pt-2 text-bt-gold font-bold">RSVP: {rsvpContact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
