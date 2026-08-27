import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { GalleryItem } from '../types';
import { X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { content } = useContent();
  const gallery = content.gallery;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const items = gallery.items || [];
  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-bt-pink-light/30 to-white dark:from-bt-dark-bg dark:via-[#130b17] dark:to-bt-dark-bg relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            {gallery.scriptTitle || 'Inside The Trap'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white mt-2">
            {gallery.mainTitle || 'Real Photos & Experiences'}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-gray-600 dark:text-gray-300">
            {gallery.subtitle || 'Step inside our luxury pink and gold pamper paradise with real Plouise makeup stations, Hollywood mirrors, velvet seating and karaoke!'}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black shadow-md'
                  : 'bg-white dark:bg-[#1a111e] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-bt-dark-border'
              }`}
            >
              All Photos ({items.length})
            </button>
            <button
              onClick={() => setActiveFilter('bus')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'bus'
                  ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black shadow-md'
                  : 'bg-white dark:bg-[#1a111e] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-bt-dark-border'
              }`}
            >
              Bus & Interior
            </button>
            <button
              onClick={() => setActiveFilter('makeup')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'makeup'
                  ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black shadow-md'
                  : 'bg-white dark:bg-[#1a111e] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-bt-dark-border'
              }`}
            >
              Makeup & Glam
            </button>
            <button
              onClick={() => setActiveFilter('nails')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'nails'
                  ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black shadow-md'
                  : 'bg-white dark:bg-[#1a111e] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-bt-dark-border'
              }`}
            >
              Nails & Spa
            </button>
            <button
              onClick={() => setActiveFilter('hair')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'hair'
                  ? 'bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black shadow-md'
                  : 'bg-white dark:bg-[#1a111e] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-bt-dark-border'
              }`}
            >
              Hair Styling
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <figure
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="pamper-gallery-card group relative overflow-hidden rounded-3xl border border-pink-200/60 dark:border-bt-dark-border shadow-md hover:shadow-2xl dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 bg-white dark:bg-[#170e1d] cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 dark:bg-[#1a111e]/90 text-bt-black dark:text-white p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <div className="p-5 bg-white dark:bg-[#170e1d]">
                <h4 className="font-serif font-bold text-base text-bt-black dark:text-white group-hover:text-bt-gold transition-colors">
                  {item.caption}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">
                  Category: {item.category}
                </p>
              </div>
            </figure>
          ))}
        </div>

        {/* Lightbox Zoom Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-bt-gold p-2 transition-colors"
                title="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 max-h-[75vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>
              <div className="text-center mt-4 text-white">
                <h3 className="font-serif font-bold text-xl text-bt-gold">{selectedImage.caption}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
