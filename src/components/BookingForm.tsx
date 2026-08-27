import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';

export const BookingForm: React.FC = () => {
  const { content } = useContent();
  const phone = content?.phone || '+447511693329';
  const email = content?.email || 'Danielletheo84@gmail.com';
  const instagram = content?.instagram || 'beautytrappamperbus';
  const packages = content?.packages || { items: [] };
  const depositText = content?.depositText || '£100 Deposit Secures Your Party Date!';

  const [formData, setFormData] = useState({
    parentName: '',
    postcode: '',
    phoneContact: '',
    guestCount: '8 People',
    package: packages.items?.[1]?.name || 'Silver Package',
    eventDate: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Dannii! I'd like to book the Beauty Trap pamper bus.

Parent's Name: ${formData.parentName}
Contact Number: ${formData.phoneContact}
Postcode / Area: ${formData.postcode}
Package: ${formData.package}
Guest Count: ${formData.guestCount}
Preferred Date: ${formData.eventDate}
Notes: ${formData.message}

Please confirm availability and booking details!`;

    const cleanPhone = String(phone).replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-bt-black text-white text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="mb-10">
          <span className="font-script text-3xl text-bt-gold block">Get In Touch</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-3 mt-1">
            Book Your Pamper Party Today!
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Fill in the form below to send an instant booking request to Dannii on WhatsApp!
          </p>
          <div className="inline-block mt-3 bg-bt-gold/20 text-bt-gold px-4 py-1 rounded-full text-xs font-bold border border-bt-gold/40">
            ✨ {depositText}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left bg-gray-950/80 p-6 sm:p-10 rounded-3xl border border-gray-800 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Parent's Name *</label>
              <input
                type="text"
                required
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-gray-900 text-white rounded-xl p-3.5 text-sm border border-gray-800 focus:border-bt-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Your Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phoneContact}
                onChange={(e) => setFormData({ ...formData, phoneContact: e.target.value })}
                placeholder="e.g. 07123 456789"
                className="w-full bg-gray-900 text-white rounded-xl p-3.5 text-sm border border-gray-800 focus:border-bt-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Postcode / Town *</label>
              <input
                type="text"
                required
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                placeholder="e.g. CM1 or London"
                className="w-full bg-gray-900 text-white rounded-xl p-3.5 text-sm border border-gray-800 focus:border-bt-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Preferred Party Date</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full bg-gray-900 text-white rounded-xl p-3.5 text-sm border border-gray-800 focus:border-bt-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Select Package</label>
              <select
                value={formData.package}
                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                className="w-full bg-gray-900 text-white rounded-xl p-3.5 text-sm border border-gray-800 focus:border-bt-gold focus:outline-none"
              >
                {(packages.items || []).map((pkg) => (
                  <option key={pkg.id} value={pkg.name}>
                    {pkg.name} ({pkg.treatmentsCount})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Number of Guests</label>
              <select
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className="w-full bg-gray-900 text-white rounded-xl p-3.5 text-sm border border-gray-800 focus:border-bt-gold focus:outline-none"
              >
                <option value="6 People">6 People</option>
                <option value="8 People">8 People</option>
                <option value="10 People">10 People</option>
                <option value="12 People">12 People</option>
                <option value="12+ People">12+ People (Custom Quote)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Notes / Special Requests</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Child's name & age, preferred time, theme or questions..."
              className="w-full bg-gray-900 text-white rounded-xl p-3.5 text-sm border border-gray-800 focus:border-bt-gold focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-luxe w-full bg-bt-gold text-bt-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all shadow-xl mt-2"
          >
            <i className="fab fa-whatsapp mr-2 text-base"></i> Send Booking Request On WhatsApp
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <a
            href={`https://wa.me/${String(phone).replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bt-gold transition-colors flex items-center"
          >
            <i className="fab fa-whatsapp mr-2 text-green-500 text-lg"></i> {phone}
          </a>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bt-gold transition-colors flex items-center"
          >
            <i className="fab fa-instagram mr-2 text-pink-500 text-lg"></i> @{instagram}
          </a>
          <a href={`mailto:${email}`} className="hover:text-bt-gold transition-colors flex items-center">
            <i className="fas fa-envelope mr-2 text-bt-gold"></i> {email}
          </a>
        </div>
      </div>
    </section>
  );
};
