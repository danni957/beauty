import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, PackageItem } from '../types';
import { defaultSiteContent } from '../data/defaultContent';
import { contentService } from '../services/api';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  saveToBackend: (newContent: SiteContent, newPassword?: string) => Promise<{ success: boolean; message: string }>;
  resetContent: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isSyncing: boolean;
  lastSyncedAt?: string;
}

const STORAGE_KEY = 'beauty_trap_site_content_v4';
const AUTH_KEY = 'beauty_trap_admin_auth';

export const sanitizeContent = (raw: any): SiteContent => {
  if (!raw || typeof raw !== 'object') return defaultSiteContent;

  // Validate package items to ensure every package has a valid pricing array
  const sanitizePackageItems = (items: any[]): PackageItem[] => {
    if (!Array.isArray(items) || items.length === 0) return defaultSiteContent.packages.items;
    
    // If any item is missing 'pricing' array, fallback to default
    const isValid = items.every(item => item && Array.isArray(item.pricing) && item.pricing.length > 0);
    if (!isValid) return defaultSiteContent.packages.items;

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

  return {
    phone: typeof raw.phone === 'string' && raw.phone ? raw.phone : defaultSiteContent.phone,
    instagram: typeof raw.instagram === 'string' && raw.instagram ? raw.instagram : defaultSiteContent.instagram,
    email: typeof raw.email === 'string' && raw.email ? raw.email : defaultSiteContent.email,
    depositText: typeof raw.depositText === 'string' && raw.depositText ? raw.depositText : defaultSiteContent.depositText,
    hero: {
      badge: raw.hero?.badge || defaultSiteContent.hero.badge,
      titleLine1: raw.hero?.titleLine1 || defaultSiteContent.hero.titleLine1,
      titleHighlight: raw.hero?.titleHighlight || defaultSiteContent.hero.titleHighlight,
      titleLine2: raw.hero?.titleLine2 || defaultSiteContent.hero.titleLine2,
      subtitle: raw.hero?.subtitle || defaultSiteContent.hero.subtitle,
      description: raw.hero?.description || defaultSiteContent.hero.description,
      videoUrl: raw.hero?.videoUrl || defaultSiteContent.hero.videoUrl
    },
    packages: {
      scriptTitle: raw.packages?.scriptTitle || defaultSiteContent.packages.scriptTitle,
      mainTitle: raw.packages?.mainTitle || defaultSiteContent.packages.mainTitle,
      subtitle: raw.packages?.subtitle || defaultSiteContent.packages.subtitle,
      items: sanitizePackageItems(raw.packages?.items),
      partyIncludes: Array.isArray(raw.packages?.partyIncludes) && raw.packages.partyIncludes.length > 0
        ? raw.packages.partyIncludes
        : defaultSiteContent.packages.partyIncludes,
      treatmentCategories: Array.isArray(raw.packages?.treatmentCategories) && raw.packages.treatmentCategories.length > 0
        ? raw.packages.treatmentCategories
        : defaultSiteContent.packages.treatmentCategories,
      extraTreatments13Plus: Array.isArray(raw.packages?.extraTreatments13Plus) && raw.packages.extraTreatments13Plus.length > 0
        ? raw.packages.extraTreatments13Plus
        : defaultSiteContent.packages.extraTreatments13Plus
    },
    coverage: {
      title: raw.coverage?.title || defaultSiteContent.coverage.title,
      subtitle: raw.coverage?.subtitle || defaultSiteContent.coverage.subtitle,
      areas: Array.isArray(raw.coverage?.areas) && raw.coverage.areas.length > 0
        ? raw.coverage.areas
        : defaultSiteContent.coverage.areas,
      radiusInfo: raw.coverage?.radiusInfo || defaultSiteContent.coverage.radiusInfo
    },
    testimonials: {
      scriptTitle: raw.testimonials?.scriptTitle || defaultSiteContent.testimonials.scriptTitle,
      mainTitle: raw.testimonials?.mainTitle || defaultSiteContent.testimonials.mainTitle,
      items: Array.isArray(raw.testimonials?.items) && raw.testimonials.items.length > 0
        ? raw.testimonials.items
        : defaultSiteContent.testimonials.items
    }
  };
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      // Clear old versions
      localStorage.removeItem('beauty_trap_site_content_v1');
      localStorage.removeItem('beauty_trap_site_content_v2');
      localStorage.removeItem('beauty_trap_site_content_v3');
      
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return sanitizeContent(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Using default content:', e);
    }
    return defaultSiteContent;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return sessionStorage.getItem(AUTH_KEY) || '';
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
    const res = await contentService.saveLiveContent(content, password);
    if (res.success) {
      setAdminPassword(password);
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, password);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminPassword('');
    setIsAuthenticated(false);
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
    const res = await contentService.saveLiveContent(clean, adminPassword, newPassword);
    setIsSyncing(false);

    if (res.success) {
      setContent(clean);
      setLastSyncedAt(res.updatedAt || new Date().toISOString());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
      if (newPassword) {
        setAdminPassword(newPassword);
        sessionStorage.setItem(AUTH_KEY, newPassword);
      }
      return { success: true, message: 'Saved and updated live on server!' };
    } else {
      return { success: false, message: res.message };
    }
  };

  const resetContent = () => {
    setContent(defaultSiteContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset local storage', e);
    }
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
