import React, { useState } from 'react';
import { Share2, MessageCircle, Facebook, Twitter, Copy, Check } from 'lucide-react';

interface ShareModalProps {
  url?: string;
  title?: string;
  description?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  url = window.location.href,
  title = "Beauty Trap | Luxury Mobile Pamper Bus UK",
  description = "Book the most luxurious pamper bus in the UK! Manicures, karaoke, and red carpet entrance. We come to you!"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20-%20${encodedDescription}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-bt-text hover:text-bt-gold text-xs font-bold uppercase tracking-widest transition-colors py-2 px-3 rounded"
        title="Share Website"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50">
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Share Beauty Trap</h4>
            <div className="space-y-2">
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded text-gray-700 hover:text-green-600 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>Share on WhatsApp</span>
              </a>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Share on Facebook</span>
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded text-gray-700 hover:text-blue-400 transition-colors text-sm"
              >
                <Twitter className="w-4 h-4 text-blue-400" />
                <span>Share on Twitter</span>
              </a>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded text-gray-700 hover:text-bt-gold transition-colors text-sm border-t border-gray-100 mt-2 pt-2"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                <span>{copied ? 'Link copied!' : 'Copy link'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
