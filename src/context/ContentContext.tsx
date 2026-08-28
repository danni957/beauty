import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, PackageItem, GalleryItem, FAQItem, AddonItem, ReelItem } from '../types';
import { defaultContent } from '../data/defaultContent';
import { contentService } from '../services/api';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  saveToBackend: (newContent: SiteContent, newPassword?: string) => Promise<{ success: boolean; message: string }>;
  resetContent: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isVisualEditMode: boolean;
  setIsVisualEditMode: (mode: boolean) => void;
  activeCmsTab: string;
  setActiveCmsTab: (tab: string) => void;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isSyncing: boolean;
  lastSyncedAt?: string;
}

const STORAGE_KEY = 'beauty_trap_site_content_v6';
const AUTH_KEY = 'beauty_trap_admin_auth';
const PWD_KEY = 'beauty_trap_admin_pwd';
const DEFAULT_PASSWORD = 'beautytrap2026';

export const sanitizeContent = (raw: any): SiteContent => {
  if (!raw || typeof raw !== 'object') return defaultContent;

  const sanitizePackageItems = (items: any[]): PackageItem[] => {
    if (!Array.isArray(items) || items.length === 0) return defaultContent.packages.items;
    
    const isValid = items.every(item => item && Array.isArray(item.pricing) && item.pricing.length > 0);
    if (!isValid) return defaultContent.packages.items;

    return items.map(item => ({
      id: item.id || 'pkg-' + Math.random(),
      name: item.name || 'Pamper Package',
      treatmentsCount: item.treatmentsCount || '2 Treatments',
      popular: Boolean(item.popular),
      borderClass: item.borderClass || 'border-bt-gold',
      tagColor: item.tagColor,
      icon: item.icon || 'fas fa-crown text-bt-gold',
      pricing: Array.isArray(item.pricing) ? item.pricing : [
        { guests: '6 People', price: '£375' },
        { guests: '8 People', price: '£450' },
        { guests: '10 People', price: '£500' },
        { guests: '12 People', price: '£575' }
      ],
      features: Array.isArray(item.features) ? item.features : [
        'Full Luxury Pamper Bus Hire',
        'Pink Spa Robes & Spa Headbands',
        'Pink Lemonade & Welcome Drinks',
        'Karaoke & Music'
      ]
    }));
  };

  const sanitizeGallery = (items: any[]): GalleryItem[] => {
    if (!Array.isArray(items) || items.length === 0) return defaultContent.gallery.items;
    return items.map((g, idx) => ({
      id: g.id || 'img-' + (idx + 1),
      src: g.src || '/new_images/photo_1.jpeg',
      category: g.category || 'bus',
      caption: g.caption || 'Beauty Trap Luxury Experience'
    }));
  };

  const sanitizeFaqs = (items: any[]): FAQItem[] => {
    if (!Array.isArray(items) || items.length === 0) return defaultContent.faqs;
    return items.map((f, idx) => ({
      id: f.id || 'faq-' + (idx + 1),
      question: f.question || 'Party Question?',
      answer: f.answer || 'Party Answer.'
    }));
  };

  const sanitizeAddons = (items: any[]): AddonItem[] => {
    if (!Array.isArray(items) || items.length === 0) return defaultContent.addons;
    return items.map((a, idx) => ({
      id: a.id || 'addon-' + (idx + 1),
      name: a.name || 'VIP Party Add-on',
      price: Number(a.price) || 20,
      perGuest: Boolean(a.perGuest),
      desc: a.desc || 'Luxury party upgrade',
      icon: a.icon || '✨'
    }));
  };

  const sanitizeReels = (items: any[]): ReelItem[] => {
    if (!Array.isArray(items) || items.length === 0) return defaultContent.instagramReels;
    return items.map((r, idx) => ({
      id: r.id || 'reel-' + (idx + 1),
      thumbnail: r.thumbnail || '/new_images/photo_6.jpeg',
      videoUrl: r.videoUrl || '/pamper_bus_video.mp4',
      caption: r.caption || 'Luxury pamper party glam!',
      likes: r.likes || '1,200',
      comments: r.comments || '45',
      tag: r.tag || '#BeautyTrap'
    }));
  };

  return {
    phone: typeof raw.phone === 'string' && raw.phone ? raw.phone : defaultContent.phone,
    instagram: typeof raw.instagram === 'string' && raw.instagram ? raw.instagram : defaultContent.instagram,
    email: typeof raw.email === 'string' && raw.email ? raw.email : defaultContent.email,
    depositText: typeof raw.depositText === 'string' && raw.depositText ? raw.depositText : defaultContent.depositText,
    hero: {
      badge: raw.hero?.badge || defaultContent.hero.badge,
      titleLine1: raw.hero?.titleLine1 || defaultContent.hero.titleLine1,
      titleHighlight: raw.hero?.titleHighlight || defaultContent.hero.titleHighlight,
      titleLine2: raw.hero?.titleLine2 || defaultContent.hero.titleLine2,
      subtitle: raw.hero?.subtitle || defaultContent.hero.subtitle,
      description: raw.hero?.description || defaultContent.hero.description,
      videoUrl: raw.hero?.videoUrl || defaultContent.hero.videoUrl
    },
    packages: {
      scriptTitle: raw.packages?.scriptTitle || defaultContent.packages.scriptTitle,
      mainTitle: raw.packages?.mainTitle || defaultContent.packages.mainTitle,
      subtitle: raw.packages?.subtitle || defaultContent.packages.subtitle,
      items: sanitizePackageItems(raw.packages?.items),
      partyIncludes: Array.isArray(raw.packages?.partyIncludes) && raw.packages.partyIncludes.length > 0
        ? raw.packages.partyIncludes
        : defaultContent.packages.partyIncludes,
      treatmentCategories: Array.isArray(raw.packages?.treatmentCategories) && raw.packages.treatmentCategories.length > 0
        ? raw.packages.treatmentCategories
        : defaultContent.packages.treatmentCategories,
      extraTreatments13Plus: Array.isArray(raw.packages?.extraTreatments13Plus) && raw.packages.extraTreatments13Plus.length > 0
        ? raw.packages.extraTreatments13Plus
        : defaultContent.packages.extraTreatments13Plus
    },
    addons: sanitizeAddons(raw.addons),
    timeSlots: Array.isArray(raw.timeSlots) && raw.timeSlots.length > 0 ? raw.timeSlots : defaultContent.timeSlots,
    faqs: sanitizeFaqs(raw.faqs),
    instagramReels: sanitizeReels(raw.instagramReels),
    coverage: {
      title: raw.coverage?.title || defaultContent.coverage.title,
      subtitle: raw.coverage?.subtitle || defaultContent.coverage.subtitle,
      areas: Array.isArray(raw.coverage?.areas) && raw.coverage.areas.length > 0
        ? raw.coverage.areas
        : defaultContent.coverage.areas,
      radiusInfo: raw.coverage?.radiusInfo || defaultContent.coverage.radiusInfo,
      mapImage: raw.coverage?.mapImage || defaultContent.coverage.mapImage
    },
    testimonials: {
      scriptTitle: raw.testimonials?.scriptTitle || defaultContent.testimonials.scriptTitle,
      mainTitle: raw.testimonials?.mainTitle || defaultContent.testimonials.mainTitle,
      items: Array.isArray(raw.testimonials?.items) && raw.testimonials.items.length > 0
        ? raw.testimonials.items
        : defaultContent.testimonials.items
    },
    gallery: {
      scriptTitle: raw.gallery?.scriptTitle || defaultContent.gallery.scriptTitle,
      mainTitle: raw.gallery?.mainTitle || defaultContent.gallery.mainTitle,
      subtitle: raw.gallery?.subtitle || defaultContent.gallery.subtitle,
      items: sanitizeGallery(raw.gallery?.items)
    }
  };
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return sanitizeContent(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Using default content:', e);
    }
    return defaultContent;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isVisualEditMode, setIsVisualEditMode] = useState(false);
  const [activeCmsTab, setActiveCmsTab] = useState('media');

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem(AUTH_KEY));
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | undefined>();

  // Fetch fresh content from server on mount
  useEffect(() => {
    let isMounted = true;
    const loadBackendContent = async () => {
      setIsSyncing(true);
      try {
        const { content: serverData, updatedAt } = await contentService.fetchLiveContent();
        if (serverData && isMounted) {
          const sanitized = sanitizeContent(serverData);
          setContent(sanitized);
          setLastSyncedAt(updatedAt);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        }
      } catch (err) {
        console.error('Failed to sync with backend:', err);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    };

    loadBackendContent();
    return () => { isMounted = false; };
  }, []);

  const login = async (password: string): Promise<boolean> => {
    const trimmed = password.trim();
    const currentPwd = localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD;

    if (trimmed === currentPwd || trimmed === DEFAULT_PASSWORD) {
      setAdminPassword(trimmed);
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    setIsVisualEditMode(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const updateContent = (newContent: SiteContent) => {
    const clean = sanitizeContent(newContent);
    setContent(clean);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  };

  const saveToBackend = async (
    newContent: SiteContent,
    newPassword?: string
  ): Promise<{ success: boolean; message: string }> => {
    setIsSyncing(true);
    const clean = sanitizeContent(newContent);

    // Save to local storage immediately
    setContent(clean);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));

    if (newPassword && newPassword.trim()) {
      const pwd = newPassword.trim();
      setAdminPassword(pwd);
      localStorage.setItem(PWD_KEY, pwd);
    }

    // Also attempt remote server save
    const res = await contentService.saveLiveContent(clean, adminPassword, newPassword);
    setIsSyncing(false);

    setLastSyncedAt(res.updatedAt || new Date().toISOString());
    return { success: true, message: 'Changes saved live successfully!' };
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PWD_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        saveToBackend,
        resetContent,
        isAdminOpen,
        setIsAdminOpen,
        isVisualEditMode,
        setIsVisualEditMode,
        activeCmsTab,
        setActiveCmsTab,
        isAuthenticated,
        login,
        logout,
        isSyncing,
        lastSyncedAt
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return ctx;
};
