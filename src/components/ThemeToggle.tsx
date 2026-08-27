import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2 rounded-full transition-all duration-300 ${
        isDark
          ? 'bg-bt-dark-card text-yellow-300 border border-bt-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.3)] hover:bg-yellow-950/40'
          : 'bg-pink-50 text-bt-gold border border-pink-200 hover:bg-pink-100 shadow-sm'
      } ${className}`}
      title={isDark ? 'Switch to Day Mode' : 'Switch to VIP Night Mode'}
      aria-label="Toggle Day / Night Mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-bt-gold animate-spin-slow transition-transform duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 hover:rotate-45 transition-transform duration-300" />
        )}
      </div>
    </button>
  );
};
