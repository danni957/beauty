import React, { useState } from 'react';
import { Instagram, Play, Heart, MessageCircle, ExternalLink, Sparkles, X } from 'lucide-react';

interface ReelItem {
  id: string;
  thumbnail: string;
  videoUrl?: string;
  caption: string;
  likes: string;
  comments: string;
  tag: string;
}

export const InstagramShowcase: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const reels: ReelItem[] = [
    {
      id: 'reel-1',
      thumbnail: '/new_images/photo_6.jpeg',
      videoUrl: '/pamper_bus_video.mp4',
      caption: 'Full bus glam transformation! Hollywood mirrors, Plouise makeup stations & velvet pedicures ✨',
      likes: '1,420',
      comments: '86',
      tag: '#PlouiseGlam'
    },
    {
      id: 'reel-2',
      thumbnail: '/new_images/photo_1.jpeg',
      caption: 'Birthday girl VIP red carpet entrance! Nothing beats that priceless smile 💖',
      likes: '984',
      comments: '54',
      tag: '#RedCarpetVIP'
    },
    {
      id: 'reel-3',
      thumbnail: '/new_images/photo_4.jpeg',
      videoUrl: '/pamper_bus_video.mp4',
      caption: 'Plouise festival makeup, face gems and party lashes for the ultimate glow-up! 💄',
      likes: '1,890',
      comments: '112',
      tag: '#FestivalMakeup'
    },
    {
      id: 'reel-4',
      thumbnail: '/new_images/photo_3.jpeg',
      caption: 'Pink velvet spa pedicures & foot soaks with best friends inside the trap! 💅',
      likes: '1,150',
      comments: '63',
      tag: '#SpaPedicures'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-bt-pink-light/25 to-white dark:from-bt-dark-bg dark:via-[#140b18] dark:to-bt-dark-bg relative transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 fade-up">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-pink-500/15 border border-pink-300/50 dark:border-pink-800 px-4 py-1.5 rounded-full mb-3 text-pink-600 dark:text-pink-300 text-xs font-bold uppercase tracking-wider">
            <Instagram className="w-4 h-4" /> @beautytrappamperbus
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white">
            Follow The Glam On Instagram
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base mt-2">
            Watch real party reels, client transformations, and behind-the-scenes magic!
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => reel.videoUrl && setActiveVideo(reel.videoUrl)}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-pink-200/80 dark:border-bt-dark-border bg-white dark:bg-[#180f1f] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Media Thumbnail */}
              <div className="aspect-[9/14] relative overflow-hidden bg-gray-900">
                <img
                  src={reel.thumbnail}
                  alt={reel.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                {/* Play Button Badge */}
                {reel.videoUrl && (
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 group-hover:bg-bt-gold group-hover:text-bt-black transition-colors">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                )}

                {/* Tag Badge */}
                <div className="absolute top-4 left-4 bg-pink-500/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {reel.tag}
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                  <p className="text-xs line-clamp-2 leading-relaxed text-gray-200">
                    {reel.caption}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/20 text-gray-300 font-medium">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> {reel.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> {reel.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Instagram */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com/beautytrappamperbus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full shadow-xl hover:opacity-95 hover:scale-105 transition-all"
          >
            <Instagram className="w-4 h-4" /> Follow @beautytrappamperbus On Instagram <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Lightbox Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:text-bt-gold flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-full aspect-[9/16] object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
