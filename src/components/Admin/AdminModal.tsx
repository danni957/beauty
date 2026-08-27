import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { X, Save, RotateCcw, CheckCircle, Lock, Key, Cloud, AlertCircle, LogOut } from 'lucide-react';
import { SiteContent } from '../../types';

export const AdminModal: React.FC = () => {
  const {
    content,
    saveToBackend,
    resetContent,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    login,
    logout,
    lastSyncedAt
  } = useContent();

  const [formData, setFormData] = useState<SiteContent>(JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState<'packages' | 'contact' | 'hero' | 'coverage' | 'security'>('packages');
  const [passwordInput, setPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'idle' | 'saving' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(content)));
  }, [content]);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    const ok = await login(passwordInput.trim());
    setIsLoggingIn(false);
    if (!ok) {
      setLoginError('Incorrect Admin Password. Default is: beautytrap2026');
    }
  };

  const handleSave = async () => {
    setSaveStatus({ type: 'saving', message: 'Saving changes to server...' });
    const res = await saveToBackend(formData, newPassword.trim() || undefined);
    if (res.success) {
      setSaveStatus({ type: 'success', message: 'Content saved & live for all visitors!' });
      if (newPassword.trim()) {
        setNewPassword('');
      }
      setTimeout(() => {
        setSaveStatus({ type: 'idle', message: '' });
        setIsAdminOpen(false);
      }, 1500);
    } else {
      setSaveStatus({ type: 'error', message: res.message || 'Failed to save to server.' });
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content back to original defaults?')) {
      resetContent();
      setFormData(content);
      setIsAdminOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-bt-gold/30 animate-fade-in">
        {/* Modal Header */}
        <div className="bg-bt-black text-white px-6 py-4 flex items-center justify-between border-b border-bt-gold/30">
          <div>
            <h3 className="text-xl font-serif font-bold text-bt-gold flex items-center gap-2">
              <Cloud className="w-5 h-5 text-bt-gold" />
              <span>Beauty Trap</span> Live CMS Backend
            </h3>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Connected to Production Backend
              {lastSyncedAt && ` • Synced: ${new Date(lastSyncedAt).toLocaleTimeString()}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-xs text-gray-400 hover:text-red-400 px-2 py-1 rounded flex items-center gap-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. If NOT Authenticated: Show Password Login */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 bg-bt-pink-light text-bt-gold rounded-full flex items-center justify-center mx-auto shadow-inner border border-bt-gold/40">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-bt-black">Admin Access Required</h4>
              <p className="text-xs text-gray-500 mt-1">
                Please enter your admin password to edit prices, packages, and site content.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Admin Password</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:border-bt-gold focus:outline-none focus:bg-white"
                  />
                </div>
                {loginError && (
                  <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-bt-black text-white hover:bg-bt-gold hover:text-bt-black py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoggingIn ? 'Verifying...' : 'Unlock CMS Dashboard'}
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                Default Password: <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">beautytrap2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* 2. Authenticated CMS Dashboard */
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 px-6 pt-3 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-colors ${activeTab === 'packages' ? 'bg-white text-bt-gold border-t-2 border-bt-gold shadow-sm font-extrabold' : 'text-gray-600 hover:text-black'}`}
              >
                💰 Bronze, Silver, Gold Packages
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-colors ${activeTab === 'contact' ? 'bg-white text-bt-gold border-t-2 border-bt-gold shadow-sm font-extrabold' : 'text-gray-600 hover:text-black'}`}
              >
                📞 Phone & Socials
              </button>
              <button
                onClick={() => setActiveTab('hero')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-colors ${activeTab === 'hero' ? 'bg-white text-bt-gold border-t-2 border-bt-gold shadow-sm font-extrabold' : 'text-gray-600 hover:text-black'}`}
              >
                ✨ Hero & Titles
              </button>
              <button
                onClick={() => setActiveTab('coverage')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-colors ${activeTab === 'coverage' ? 'bg-white text-bt-gold border-t-2 border-bt-gold shadow-sm font-extrabold' : 'text-gray-600 hover:text-black'}`}
              >
                📍 Coverage & Deposit
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-colors ${activeTab === 'security' ? 'bg-white text-bt-gold border-t-2 border-bt-gold shadow-sm font-extrabold' : 'text-gray-600 hover:text-black'}`}
              >
                🔒 Change Password
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              {activeTab === 'packages' && (
                <div className="space-y-6">
                  <p className="text-xs text-gray-500">
                    Edit guest tier pricing for Bronze, Silver, and Gold packages. Any changes you save will update the live site immediately:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(formData?.packages?.items || []).map((pkg, idx) => (
                      <div key={pkg.id || idx} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-bt-black">{pkg.name}</h4>
                          {pkg.popular && <span className="bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Popular</span>}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase">Treatments Tag</label>
                          <input
                            type="text"
                            value={pkg.treatmentsCount || ''}
                            onChange={(e) => {
                              const updated = [...(formData.packages?.items || [])];
                              updated[idx].treatmentsCount = e.target.value;
                              setFormData({ ...formData, packages: { ...formData.packages, items: updated } });
                            }}
                            className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-lg text-xs"
                          />
                        </div>

                        <div className="space-y-2 pt-2 border-t border-gray-200">
                          <label className="block text-[11px] font-bold text-gray-500 uppercase">Tier Prices</label>
                          {(pkg.pricing || []).map((tier, tIdx) => (
                            <div key={tIdx} className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={tier.guests || ''}
                                onChange={(e) => {
                                  const updated = [...(formData.packages?.items || [])];
                                  if (!updated[idx].pricing) updated[idx].pricing = [];
                                  updated[idx].pricing[tIdx].guests = e.target.value;
                                  setFormData({ ...formData, packages: { ...formData.packages, items: updated } });
                                }}
                                className="p-1.5 bg-white border border-gray-300 rounded text-xs"
                              />
                              <input
                                type="text"
                                value={tier.price || ''}
                                onChange={(e) => {
                                  const updated = [...(formData.packages?.items || [])];
                                  if (!updated[idx].pricing) updated[idx].pricing = [];
                                  updated[idx].pricing[tIdx].price = e.target.value;
                                  setFormData({ ...formData, packages: { ...formData.packages, items: updated } });
                                }}
                                className="p-1.5 bg-white border border-gray-300 rounded text-xs font-bold text-bt-gold"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp & Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+447511693329"
                      className="w-full p-3 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Instagram Username (without @)</label>
                    <input
                      type="text"
                      value={formData.instagram || ''}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="beautytrappamperbus"
                      className="w-full p-3 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Danielletheo84@gmail.com"
                      className="w-full p-3 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'hero' && (
                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Top Badge Text</label>
                    <input
                      type="text"
                      value={formData.hero?.badge || ''}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, badge: e.target.value } })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={formData.hero?.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Description</label>
                    <textarea
                      rows={3}
                      value={formData.hero?.description || ''}
                      onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value } })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'coverage' && (
                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Deposit Notice</label>
                    <input
                      type="text"
                      value={formData.depositText || ''}
                      onChange={(e) => setFormData({ ...formData, depositText: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Radius Info</label>
                    <textarea
                      rows={3}
                      value={formData.coverage?.radiusInfo || ''}
                      onChange={(e) => setFormData({ ...formData, coverage: { ...formData.coverage, radiusInfo: e.target.value } })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4 max-w-md">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800">
                    <p className="font-bold mb-1">Change Admin Password</p>
                    <p>Enter a new password below. It will be saved securely to the backend when you click "Save Live Changes".</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">New Admin Password</label>
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave blank to keep current password"
                      className="w-full p-3 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-bold uppercase tracking-wider py-2 px-3 rounded hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4" /> Reset Defaults
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {saveStatus.type === 'saving' && (
                  <span className="flex items-center gap-1 text-bt-gold text-xs font-bold animate-pulse">
                    <Cloud className="w-4 h-4 animate-spin" /> Saving to Server...
                  </span>
                )}
                {saveStatus.type === 'success' && (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-bold animate-fade-in">
                    <CheckCircle className="w-4 h-4" /> {saveStatus.message}
                  </span>
                )}
                {saveStatus.type === 'error' && (
                  <span className="flex items-center gap-1 text-red-600 text-xs font-bold">
                    <AlertCircle className="w-4 h-4" /> {saveStatus.message}
                  </span>
                )}

                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveStatus.type === 'saving'}
                  className="flex items-center gap-2 bg-bt-black text-white hover:bg-bt-gold hover:text-bt-black px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-all"
                >
                  <Save className="w-4 h-4" /> Save Live Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
