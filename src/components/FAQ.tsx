import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How much space is needed to park the Beauty Trap pamper bus?",
      answer: "The bus requires approximately 2.5 to 3 standard car lengths of parking space on a flat, solid surface (such as outside your house on the road or a wide private driveway). Please ensure there is clear access with no low hanging trees or severe obstacles."
    },
    {
      question: "Do you need to plug into our household electricity or water?",
      answer: "No, not at all! The Beauty Trap Pamper Bus is completely self-contained. We have our own onboard power generators, luxury warm water tanks, heating, and air-conditioning systems."
    },
    {
      question: "What age groups do you cater for?",
      answer: "We specialize in children's parties for ages 4 to 16+, plus teenager glam parties, Hen Parties, and adult private functions. All treatments are tailored to be age-appropriate and skin-safe."
    },
    {
      question: "How does the £100 deposit work?",
      answer: "A £100 deposit secures your preferred date and time slot. Once paid, your booking is locked into our master party calendar. The remaining balance is paid on the day of the party."
    },
    {
      question: "Can parents stay inside the bus during the party?",
      answer: "Parents are always welcome to take photos, watch the red carpet entrance, and take a tour! However, our fully trained, insured, and DBS-checked team takes complete care of the pampering, so parents can comfortably relax in their home while the party is in full swing."
    },
    {
      question: "What happens if it rains on the party day?",
      answer: "The party goes on in complete luxury! The bus interior is fully enclosed, heated in winter, air-conditioned in summer, and features a covered entrance so bad weather never spoils the fun."
    }
  ];

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
                key={idx}
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
