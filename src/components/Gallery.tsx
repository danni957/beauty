import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  category: 'interior' | 'parties' | 'glam';
  title: string;
  subtitle: string;
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'interior' | 'parties' | 'glam'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: '/new_images/photo_9.jpeg', // Girls and host outside bus in sun
      category: 'parties',
      title: 'VIP Doorstep Party',
      subtitle: 'The Beauty Trap bus parked right outside your house!'
    },
    {
      id: 2,
      src: '/new_images/photo_14.jpeg', // Full luxury interior chairs and mirrors
      category: 'interior',
      title: 'Luxury Salon Stations',
      subtitle: 'Arched vanity mirrors, gold swivel chairs & pink marble'
    },
    {
      id: 3,
      src: '/new_images/photo_11.jpeg', // Candy floss champagne drinks & neon
      category: 'glam',
      title: 'Pink Lemonade & Candy Floss',
      subtitle: 'Sparkling welcome drinks on luxury wall racks'
    },
    {
      id: 4,
      src: '/new_images/photo_12.jpeg', // Hair braiding styling
      category: 'glam',
      title: 'Hair Braiding & Styling',
      subtitle: 'Custom braids, tinsel, curling and makeovers'
    },
    {
      id: 5,
      src: '/new_images/photo_13.jpeg', // Pedicure station with bowls
      category: 'interior',
      title: 'Foot Spa & Pedicure Lounge',
      subtitle: 'Velvet backrests, warm bubble soaks & face masks'
    },
    {
      id: 6,
      src: '/new_images/photo_8.jpeg', // Girl with blonde curls and heart glasses
      category: 'parties',
      title: 'Princess Makeover Joy',
      subtitle: 'Age-appropriate makeup, curls and party accessories'
    },
    {
      id: 7,
      src: '/new_images/photo_7.jpeg', // Plouise makeup palettes
      category: 'glam',
      title: 'Plouise Glam Makeup Setup',
      subtitle: 'High-end, skin-safe professional makeup palettes'
    },
    {
      id: 8,
      src: '/new_images/photo_15.jpeg', // Interior view with pedicure bowls
      category: 'interior',
      title: 'Hollywood Mirrors & Lights',
      subtitle: 'Full salon lighting, karaoke microphones & music'
    },
    {
      id: 9,
      src: '/new_images/photo_16.jpeg', // Silk robes rack outside
      category: 'parties',
      title: 'Pink Spa Robes & Red Carpet',
      subtitle: 'Silk robes for all guests and birthday queen'
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-bt-pink-light/30 to-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            Inside The Trap
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black mt-2">
            Real Photos & Experiences
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-gray-600">
            Step inside our luxury pink and gold pamper paradise with real Plouise makeup stations, Hollywood mirrors, velvet seating and karaoke!
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-bt-black text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Photos ({galleryItems.length})
            </button>
            <button
              onClick={() => setActiveFilter('interior')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'interior'
                  ? 'bg-bt-black text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Bus Interior & Setup
            </button>
            <button
              onClick={() => setActiveFilter('glam')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'glam'
                  ? 'bg-bt-black text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Makeup & Treatments
            </button>
            <button
              onClick={() => setActiveFilter('parties')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'parties'
                  ? 'bg-bt-black text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Parties & Guests
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <figure
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="pamper-gallery-card group relative overflow-hidden rounded-3xl border border-pink-200/60 shadow-md hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 text-bt-black p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <div className="p-5 bg-white">
                <h4 className="font-serif font-bold text-base text-bt-black group-hover:text-bt-gold transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {item.subtitle}
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
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>
              <div className="text-center mt-4 text-white">
                <h3 className="font-serif font-bold text-xl text-bt-gold">{selectedImage.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{selectedImage.subtitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
