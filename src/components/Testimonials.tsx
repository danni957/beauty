import React from 'react';
import { useContent } from '../context/ContentContext';

export const Testimonials: React.FC = () => {
  const { content } = useContent();
  const testimonials = content.testimonials;

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-white via-bt-pink-light/30 to-white dark:from-bt-dark-bg dark:via-[#130b17] dark:to-bt-dark-bg relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            {testimonials.scriptTitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white mt-2 mb-4">
            {testimonials.mainTitle}
          </h2>
          <div className="flex justify-center items-center space-x-1 text-bt-gold text-xl mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Rated 5.0 by Happy Parents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(testimonials.items || []).map((rev) => {
            const starCount = Math.max(1, Math.min(5, Number(rev.rating) || 5));
            return (
              <div
                key={rev.id}
                className="bg-white dark:bg-[#170e1d] rounded-3xl p-8 shadow-xl dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-pink-100/80 dark:border-bt-dark-border hover:shadow-2xl transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 text-white font-serif font-bold text-lg flex items-center justify-center shadow-md">
                        {rev.initials || 'VIP'}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-bt-gold">Verified Parent</p>
                        <p className="text-xs text-gray-400">{rev.package || 'Pamper Bus Party'}</p>
                      </div>
                    </div>
                    <div className="flex text-bt-gold text-sm">
                      {Array.from({ length: starCount }).map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-200 italic text-base sm:text-lg leading-relaxed mb-6">
                    "{rev.text}"
                  </p>
                </div>

                {rev.badge && (
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span>✨ {rev.badge}</span>
                    <span className="text-green-600 dark:text-green-400 font-bold flex items-center">
                      <i className="fas fa-check-circle mr-1"></i> Verified
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
