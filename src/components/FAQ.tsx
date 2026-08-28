import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { content } = useContent();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = content.faqs && content.faqs.length > 0 ? content.faqs : [];

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-bt-pink-light/30 to-white dark:from-bt-dark-bg dark:via-[#130b17] dark:to-bt-dark-bg relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <span className="font-script text-3xl sm:text-4xl text-bt-gold block">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-bt-black dark:text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Everything you need to know about booking the ultimate mobile pamper party!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-white dark:bg-[#170e1d] rounded-2xl border border-pink-100 dark:border-bt-dark-border shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-pink-50/40 dark:hover:bg-[#1f1326] transition-colors"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-bt-black dark:text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-bt-gold flex-shrink-0" />
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-pink-50 dark:bg-gray-800 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 bg-bt-gold text-bt-black' : 'text-gray-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800/60 leading-relaxed animate-fade-in">
                    {faq.answer}
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
