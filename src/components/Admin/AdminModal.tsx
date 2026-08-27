import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { SiteContent, PackageItem, TreatmentCategory, TestimonialItem, GalleryItem } from '../../types';
import {
  X,
  Lock,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle,
  Plus,
  Trash2,
  Image,
  Upload,
  Video,
  Layers,
  MapPin,
  Star,
  Phone,
  Key,
  Eye,
  Download
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    content,
    updateContent,
    saveToBackend,
    resetContent,
    isAuthenticated,
    login,
    logout,
    isSyncing,
    activeCmsTab,
    setActiveCmsTab
  } = useContent();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Local editable state for smooth form editing
  const [formData, setFormData] = useState<SiteContent>(content);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');

  // Sync formData when content changes or modal opens
  React.useEffect(() => {
    setFormData(content);
  }, [content, isAdminOpen]);

  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    return parseInt(sessionStorage.getItem('bt_login_fails') || '0', 10);
  });
  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    return parseInt(sessionStorage.getItem('bt_lockout_until') || '0', 10);
  });

  if (!isAdminOpen) return null;

  // Handle Login with Brute-Force Rate Limiting
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);

    const now = Date.now();
    if (lockoutUntil && now < lockoutUntil) {
      const remainingMins = Math.ceil((lockoutUntil - now) / 60000);
      alert(`Security Lockout: Too many failed attempts. Please try again in ${remainingMins} minute(s).`);
      return;
    }

    const success = await login(passwordInput);
    if (!success) {
      const newFails = failedAttempts + 1;
      setFailedAttempts(newFails);
      sessionStorage.setItem('bt_login_fails', String(newFails));

      if (newFails >= 5) {
        const lockTime = Date.now() + 15 * 60 * 1000; // 15 mins lock
        setLockoutUntil(lockTime);
        sessionStorage.setItem('bt_lockout_until', String(lockTime));
        alert('Security Alert: 5 incorrect password attempts. Portal locked for 15 minutes.');
      } else {
        setLoginError(true);
      }
    } else {
      setPasswordInput('');
      setFailedAttempts(0);
      setLockoutUntil(0);
      sessionStorage.removeItem('bt_login_fails');
      sessionStorage.removeItem('bt_lockout_until');
    }
  };

  // Handle Save
  const handleSaveAll = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      setPwdMessage('Passwords do not match!');
      return;
    }

    setSaveStatus('Saving changes live...');
    const res = await saveToBackend(formData, newPassword || undefined);
    if (res.success) {
      setSaveStatus('✅ All Changes Saved Live!');
      setNewPassword('');
      setConfirmPassword('');
      setPwdMessage('');
      setTimeout(() => setSaveStatus(null), 3500);
    } else {
      setSaveStatus('❌ ' + res.message);
    }
  };

  // Image Upload to Base64
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSuccess(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white dark:bg-bt-dark-card rounded-3xl p-8 sm:p-10 max-w-md w-full border border-bt-gold/40 shadow-2xl relative text-center">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-bt-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-16 h-16 rounded-full bg-bt-gold/10 text-bt-gold flex items-center justify-center mx-auto mb-4 border border-bt-gold/30 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-bt-black dark:text-white mb-2">
            Beauty Trap CMS Studio
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
            Enter your admin password to edit photos, prices, text & packages in real-time.
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Enter Admin Password..."
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border text-bt-black dark:text-white rounded-xl p-3.5 text-center text-sm focus:border-bt-gold focus:outline-none"
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-2 font-semibold">
                  ⚠️ Incorrect password. Default is: beautytrap2026
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-bt-gold hover:bg-yellow-400 text-bt-black font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl shadow-lg transition-all"
            >
              Unlock CMS Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // FULL PROFESSIONAL CMS STUDIO
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden">
      <div className="bg-white dark:bg-[#140d17] rounded-3xl border border-bt-gold/40 shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden text-bt-black dark:text-gray-100">
        {/* Studio Top Header */}
        <div className="bg-bt-black dark:bg-[#0d080e] px-6 py-4 flex items-center justify-between border-b border-bt-gold/30 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-bt-gold/20 text-bt-gold flex items-center justify-center border border-bt-gold/40">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                Beauty Trap <span className="text-bt-gold font-script text-2xl font-normal">Studio</span>
              </h3>
              <p className="text-[11px] text-gray-400">Elementor-Style Live Content & Media Suite</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {saveStatus && (
              <span className="text-xs font-bold text-yellow-300 bg-white/10 px-3 py-1.5 rounded-lg border border-yellow-300/40 animate-pulse">
                {saveStatus}
              </span>
            )}
            <button
              onClick={handleSaveAll}
              disabled={isSyncing}
              className="bg-gradient-to-r from-bt-gold to-yellow-400 text-bt-black font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Live Changes
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Studio Body: Sidebar Navigation + Main Editor */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Navigation Tabs */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-[#1a111e] border-r border-gray-200 dark:border-bt-dark-border p-3 space-y-1 overflow-y-auto">
            <button
              onClick={() => setActiveCmsTab('media')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'media'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Image className="w-4 h-4" /> Media & Photos
            </button>

            <button
              onClick={() => setActiveCmsTab('hero')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'hero'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Video className="w-4 h-4" /> Hero & Video
            </button>

            <button
              onClick={() => setActiveCmsTab('packages')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'packages'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Layers className="w-4 h-4" /> Packages & Prices
            </button>

            <button
              onClick={() => setActiveCmsTab('treatments')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'treatments'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Treatments Menu
            </button>

            <button
              onClick={() => setActiveCmsTab('coverage')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'coverage'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <MapPin className="w-4 h-4" /> Coverage Areas
            </button>

            <button
              onClick={() => setActiveCmsTab('testimonials')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'testimonials'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Star className="w-4 h-4" /> Reviews & Love
            </button>

            <button
              onClick={() => setActiveCmsTab('contact')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'contact'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Phone className="w-4 h-4" /> Contact & Socials
            </button>

            <button
              onClick={() => setActiveCmsTab('password')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                activeCmsTab === 'password'
                  ? 'bg-bt-gold text-bt-black shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Key className="w-4 h-4" /> Security & Password
            </button>
          </div>

          {/* Right Editor Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-[#120a15] space-y-6">
            {/* 1. MEDIA & PHOTOS TAB */}
            {activeCmsTab === 'media' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 dark:border-bt-dark-border">
                  <div>
                    <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white">
                      📸 Gallery & Media Manager
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Upload real photos from your phone/computer or replace any image on the website!
                    </p>
                  </div>
                  <label className="cursor-pointer bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow hover:opacity-90">
                    <Plus className="w-4 h-4" /> Add New Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (dataUrl) => {
                          const newItems = [
                            {
                              id: 'img-' + Date.now(),
                              src: dataUrl,
                              category: 'bus' as const,
                              caption: 'New Pamper Bus Photo'
                            },
                            ...formData.gallery.items
                          ];
                          setFormData({
                            ...formData,
                            gallery: { ...formData.gallery, items: newItems }
                          });
                        })
                      }
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.gallery.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 dark:bg-bt-dark-card border border-gray-200 dark:border-bt-dark-border rounded-2xl p-3.5 space-y-3 relative group"
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                        <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-1">
                          <Upload className="w-4 h-4" /> Replace Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (dataUrl) => {
                                const newItems = [...formData.gallery.items];
                                newItems[idx].src = dataUrl;
                                setFormData({
                                  ...formData,
                                  gallery: { ...formData.gallery, items: newItems }
                                });
                              })
                            }
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Photo Caption
                        </label>
                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) => {
                            const newItems = [...formData.gallery.items];
                            newItems[idx].caption = e.target.value;
                            setFormData({
                              ...formData,
                              gallery: { ...formData.gallery, items: newItems }
                            });
                          }}
                          className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-lg p-2 text-xs text-bt-black dark:text-white"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const newItems = [...formData.gallery.items];
                            newItems[idx].category = e.target.value as any;
                            setFormData({
                              ...formData,
                              gallery: { ...formData.gallery, items: newItems }
                            });
                          }}
                          className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-lg px-2 py-1 text-xs text-bt-black dark:text-white"
                        >
                          <option value="bus">Bus & Setup</option>
                          <option value="makeup">Makeup & Glam</option>
                          <option value="nails">Nails & Spa</option>
                          <option value="hair">Hair Styling</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => {
                            const newItems = formData.gallery.items.filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              gallery: { ...formData.gallery, items: newItems }
                            });
                          }}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. HERO & VIDEO TAB */}
            {activeCmsTab === 'hero' && (
              <div className="space-y-4 max-w-3xl">
                <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white border-b pb-3 dark:border-bt-dark-border">
                  👑 Hero Section & Video Banner
                </h4>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Badge Banner</label>
                  <input
                    type="text"
                    value={formData.hero.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, badge: e.target.value } })
                    }
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Title Line 1</label>
                    <input
                      type="text"
                      value={formData.hero.titleLine1}
                      onChange={(e) =>
                        setFormData({ ...formData, hero: { ...formData.hero, titleLine1: e.target.value } })
                      }
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-bt-gold mb-1">Gold Script Highlight</label>
                    <input
                      type="text"
                      value={formData.hero.titleHighlight}
                      onChange={(e) =>
                        setFormData({ ...formData, hero: { ...formData.hero, titleHighlight: e.target.value } })
                      }
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-bt-gold rounded-xl p-3 text-sm text-bt-gold font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Title Line 2</label>
                    <input
                      type="text"
                      value={formData.hero.titleLine2}
                      onChange={(e) =>
                        setFormData({ ...formData, hero: { ...formData.hero, titleLine2: e.target.value } })
                      }
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Subtitle Banner</label>
                  <input
                    type="text"
                    value={formData.hero.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })
                    }
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={formData.hero.description}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value } })
                    }
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                  />
                </div>

                <div className="bg-pink-50 dark:bg-bt-dark-card p-4 rounded-2xl border border-pink-200 dark:border-bt-dark-border">
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">
                    Hero Video File / URL
                  </label>
                  <input
                    type="text"
                    value={formData.hero.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, hero: { ...formData.hero, videoUrl: e.target.value } })
                    }
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm mb-2"
                  />
                </div>
              </div>
            )}

            {/* 3. PACKAGES & PRICES TAB */}
            {activeCmsTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 dark:border-bt-dark-border">
                  <div>
                    <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white">
                      💰 Packages & Tier Pricing Editor
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Edit package names, guest counts, and price tiers (£375 to £750).
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {formData.packages.items.map((pkg, pIdx) => (
                    <div
                      key={pkg.id}
                      className="bg-gray-50 dark:bg-bt-dark-card border border-gray-200 dark:border-bt-dark-border rounded-3xl p-6 space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Package Name</label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => {
                              const newPkgs = [...formData.packages.items];
                              newPkgs[pIdx].name = e.target.value;
                              setFormData({
                                ...formData,
                                packages: { ...formData.packages, items: newPkgs }
                              });
                            }}
                            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Treatments Badge</label>
                          <input
                            type="text"
                            value={pkg.treatmentsCount}
                            onChange={(e) => {
                              const newPkgs = [...formData.packages.items];
                              newPkgs[pIdx].treatmentsCount = e.target.value;
                              setFormData({
                                ...formData,
                                packages: { ...formData.packages, items: newPkgs }
                              });
                            }}
                            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold uppercase">
                            <input
                              type="checkbox"
                              checked={Boolean(pkg.popular)}
                              onChange={(e) => {
                                const newPkgs = [...formData.packages.items];
                                newPkgs[pIdx].popular = e.target.checked;
                                setFormData({
                                  ...formData,
                                  packages: { ...formData.packages, items: newPkgs }
                                });
                              }}
                              className="w-4 h-4 text-bt-gold rounded"
                            />
                            <span>Most Popular Badge</span>
                          </label>
                        </div>
                      </div>

                      {/* Pricing Tiers Table */}
                      <div>
                        <label className="block text-xs font-bold uppercase text-bt-gold mb-2">
                          Guest Count & Prices:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {pkg.pricing.map((tier, tIdx) => (
                            <div
                              key={tIdx}
                              className="bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-bt-dark-border"
                            >
                              <label className="block text-[10px] font-bold text-gray-400 uppercase">
                                {tier.guests}
                              </label>
                              <input
                                type="text"
                                value={tier.price}
                                onChange={(e) => {
                                  const newPkgs = [...formData.packages.items];
                                  newPkgs[pIdx].pricing[tIdx].price = e.target.value;
                                  setFormData({
                                    ...formData,
                                    packages: { ...formData.packages, items: newPkgs }
                                  });
                                }}
                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1.5 text-sm font-bold text-bt-gold text-center mt-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. TREATMENTS MENU TAB */}
            {activeCmsTab === 'treatments' && (
              <div className="space-y-6">
                <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white border-b pb-3 dark:border-bt-dark-border">
                  ✨ Treatments & Party Inclusions
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.packages.treatmentCategories.map((cat, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-gray-50 dark:bg-bt-dark-card p-5 rounded-2xl border border-gray-200 dark:border-bt-dark-border space-y-3"
                    >
                      <h5 className="font-serif font-bold text-base text-bt-black dark:text-white flex items-center gap-2">
                        {cat.title} Category
                      </h5>
                      <div className="space-y-2">
                        {cat.items.map((item, iIdx) => (
                          <div key={iIdx} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newCats = [...formData.packages.treatmentCategories];
                                newCats[cIdx].items[iIdx] = e.target.value;
                                setFormData({
                                  ...formData,
                                  packages: { ...formData.packages, treatmentCategories: newCats }
                                });
                              }}
                              className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-lg p-2 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newCats = [...formData.packages.treatmentCategories];
                                newCats[cIdx].items = newCats[cIdx].items.filter((_, i) => i !== iIdx);
                                setFormData({
                                  ...formData,
                                  packages: { ...formData.packages, treatmentCategories: newCats }
                                });
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newCats = [...formData.packages.treatmentCategories];
                            newCats[cIdx].items.push('New Treatment');
                            setFormData({
                              ...formData,
                              packages: { ...formData.packages, treatmentCategories: newCats }
                            });
                          }}
                          className="text-xs text-bt-gold font-bold uppercase tracking-wider flex items-center gap-1 mt-2"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Treatment Item
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900/50">
                  <label className="block text-xs font-bold uppercase text-yellow-800 dark:text-yellow-400 mb-1">
                    Deposit Policy Text
                  </label>
                  <input
                    type="text"
                    value={formData.depositText}
                    onChange={(e) => setFormData({ ...formData, depositText: e.target.value })}
                    className="w-full bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-800 rounded-xl p-3 text-sm font-bold"
                  />
                </div>
              </div>
            )}

            {/* 5. COVERAGE TAB */}
            {activeCmsTab === 'coverage' && (
              <div className="space-y-6 max-w-3xl">
                <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white border-b pb-3 dark:border-bt-dark-border">
                  📍 Coverage Areas & Radius
                </h4>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={formData.coverage.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coverage: { ...formData.coverage, title: e.target.value }
                      })
                    }
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Covered Counties & Areas</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.coverage.areas.map((area, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={area}
                          onChange={(e) => {
                            const newAreas = [...formData.coverage.areas];
                            newAreas[idx] = e.target.value;
                            setFormData({
                              ...formData,
                              coverage: { ...formData.coverage, areas: newAreas }
                            });
                          }}
                          className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-lg p-2 text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newAreas = formData.coverage.areas.filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              coverage: { ...formData.coverage, areas: newAreas }
                            });
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        coverage: {
                          ...formData.coverage,
                          areas: [...formData.coverage.areas, 'New Area']
                        }
                      });
                    }}
                    className="text-xs text-bt-gold font-bold uppercase tracking-wider flex items-center gap-1 mt-3"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Area
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Travel Times & Radius Note</label>
                  <textarea
                    rows={3}
                    value={formData.coverage.radiusInfo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coverage: { ...formData.coverage, radiusInfo: e.target.value }
                      })
                    }
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                  />
                </div>

                <div className="bg-gray-50 dark:bg-bt-dark-card p-4 rounded-2xl border border-gray-200 dark:border-bt-dark-border">
                  <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-2">
                    Coverage Map Image
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.coverage.mapImage || '/new_images/photo_10.jpeg'}
                      alt="Map preview"
                      className="w-20 h-20 rounded-xl object-cover border border-gray-300"
                    />
                    <label className="cursor-pointer bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Replace Map Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) => {
                            setFormData({
                              ...formData,
                              coverage: { ...formData.coverage, mapImage: dataUrl }
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 6. TESTIMONIALS TAB */}
            {activeCmsTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4 dark:border-bt-dark-border">
                  <div>
                    <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white">
                      ⭐ 5-Star Reviews & Testimonials
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Manage client testimonials and parent feedback.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newRev: TestimonialItem = {
                        id: 'rev-' + Date.now(),
                        initials: 'VIP',
                        package: 'Silver Trap Package with Dannii',
                        rating: 5,
                        text: 'Wonderful experience! The children absolutely loved the pamper bus.',
                        badge: 'Verified Booking'
                      };
                      setFormData({
                        ...formData,
                        testimonials: {
                          ...formData.testimonials,
                          items: [newRev, ...formData.testimonials.items]
                        }
                      });
                    }}
                    className="bg-bt-black dark:bg-bt-gold text-white dark:text-bt-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" /> Add Review
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.testimonials.items.map((rev, rIdx) => (
                    <div
                      key={rev.id}
                      className="bg-gray-50 dark:bg-bt-dark-card border border-gray-200 dark:border-bt-dark-border rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={rev.initials}
                            onChange={(e) => {
                              const newRevs = [...formData.testimonials.items];
                              newRevs[rIdx].initials = e.target.value;
                              setFormData({
                                ...formData,
                                testimonials: { ...formData.testimonials, items: newRevs }
                              });
                            }}
                            className="w-14 bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-lg p-1.5 text-xs text-center font-bold text-bt-gold"
                            title="Initials (e.g. AY)"
                          />
                          <input
                            type="text"
                            value={rev.package}
                            onChange={(e) => {
                              const newRevs = [...formData.testimonials.items];
                              newRevs[rIdx].package = e.target.value;
                              setFormData({
                                ...formData,
                                testimonials: { ...formData.testimonials, items: newRevs }
                              });
                            }}
                            className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-lg p-1.5 text-xs"
                            placeholder="Package Booked"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newRevs = formData.testimonials.items.filter((_, i) => i !== rIdx);
                            setFormData({
                              ...formData,
                              testimonials: { ...formData.testimonials, items: newRevs }
                            });
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={3}
                        value={rev.text}
                        onChange={(e) => {
                          const newRevs = [...formData.testimonials.items];
                          newRevs[rIdx].text = e.target.value;
                          setFormData({
                            ...formData,
                            testimonials: { ...formData.testimonials, items: newRevs }
                          });
                        }}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-2.5 text-xs"
                      />

                      <input
                        type="text"
                        value={rev.badge || ''}
                        onChange={(e) => {
                          const newRevs = [...formData.testimonials.items];
                          newRevs[rIdx].badge = e.target.value;
                          setFormData({
                            ...formData,
                            testimonials: { ...formData.testimonials, items: newRevs }
                          });
                        }}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-lg p-1.5 text-xs text-bt-gold font-semibold"
                        placeholder="Badge quote (e.g. Luxury Experience)"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. CONTACT & SOCIALS TAB */}
            {activeCmsTab === 'contact' && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white border-b pb-3 dark:border-bt-dark-border">
                  📱 Phone, WhatsApp & Instagram
                </h4>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Phone / WhatsApp Number (UK)
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm font-bold text-green-600"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Format: +447511693329 or 07511 693 329
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm font-bold text-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Booking Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                  />
                </div>
              </div>
            )}

            {/* 8. SECURITY & PASSWORD TAB */}
            {activeCmsTab === 'password' && (
              <div className="space-y-6 max-w-xl">
                <h4 className="font-serif font-bold text-xl text-bt-black dark:text-white border-b pb-3 dark:border-bt-dark-border">
                  🔒 Change Admin Password & Backups
                </h4>

                <div className="bg-gray-50 dark:bg-bt-dark-card p-6 rounded-3xl border border-gray-200 dark:border-bt-dark-border space-y-4">
                  <h5 className="font-serif font-bold text-base text-bt-black dark:text-white">
                    Set Custom Password
                  </h5>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password..."
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-bt-dark-border rounded-xl p-3 text-sm"
                    />
                  </div>

                  {pwdMessage && <p className="text-red-500 text-xs font-bold">{pwdMessage}</p>}
                </div>

                <div className="pt-4 border-t dark:border-bt-dark-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset all website content back to factory default?')) {
                        resetContent();
                        setIsAdminOpen(false);
                      }
                    }}
                    className="text-xs text-red-500 hover:text-red-700 font-bold uppercase flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Factory Reset
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="text-xs text-gray-500 hover:text-bt-black dark:hover:text-white font-bold uppercase"
                  >
                    Lock & Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
