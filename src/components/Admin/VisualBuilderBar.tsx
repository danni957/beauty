import React from 'react';
import { useContent } from '../../context/ContentContext';
import { Sparkles, Edit3, Eye, Save, Lock, LogOut, Download, Upload, Image, Layers } from 'lucide-react';

export const VisualBuilderBar: React.FC = () => {
  const {
    isAuthenticated,
    setIsAdminOpen,
    isVisualEditMode,
    setIsVisualEditMode,
    setActiveCmsTab,
    saveToBackend,
    content,
    isSyncing,
    logout
  } = useContent();

  if (!isAuthenticated) return null;

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `beauty_trap_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleQuickEdit = (tab: string) => {
    setActiveCmsTab(tab);
    setIsAdminOpen(true);
  };

  return (
    <aside aria-label="Visual CMS Studio Bar" className="fixed top-0 left-0 right-0 z-[100] bg-bt-black/95 dark:bg-[#120c14]/95 text-white backdrop-blur-md border-b border-bt-gold/30 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-2xl animate-fade-in text-xs font-sans">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 bg-bt-gold/20 text-bt-gold px-3 py-1 rounded-full border border-bt-gold/40 font-bold uppercase tracking-wider text-[10px]">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Visual CMS Studio</span>
        </div>

        <div className="hidden lg:flex items-center space-x-1 bg-white/10 p-0.5 rounded-lg">
          <button
            onClick={() => setIsVisualEditMode(!isVisualEditMode)}
            className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all ${
              isVisualEditMode ? 'bg-bt-gold text-bt-black shadow' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            {isVisualEditMode ? 'Builder Mode ON' : 'Live Preview'}
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-2">
        <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold mr-1">Quick Edit:</span>
        <button
          onClick={() => handleQuickEdit('media')}
          className="bg-white/10 hover:bg-bt-gold hover:text-bt-black px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
        >
          <Image className="w-3 h-3 text-pink-400" /> Photos & Video
        </button>
        <button
          onClick={() => handleQuickEdit('packages')}
          className="bg-white/10 hover:bg-bt-gold hover:text-bt-black px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
        >
          <Layers className="w-3 h-3 text-yellow-400" /> Packages & Prices
        </button>
        <button
          onClick={() => handleQuickEdit('treatments')}
          className="bg-white/10 hover:bg-bt-gold hover:text-bt-black px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
        >
          ✨ Treatments
        </button>
        <button
          onClick={() => handleQuickEdit('coverage')}
          className="bg-white/10 hover:bg-bt-gold hover:text-bt-black px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
        >
          📍 Areas
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-gradient-to-r from-bt-gold to-yellow-400 text-bt-black font-bold uppercase tracking-wider text-[11px] px-3.5 py-1.5 rounded-lg shadow hover:opacity-90 transition-all flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" /> Full Studio Editor
        </button>

        <button
          onClick={handleExportBackup}
          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          title="Export JSON Backup"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={logout}
          className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-white/10 transition-colors"
          title="Exit Admin"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
