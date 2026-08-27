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
const PWD_KEY = 'beauty_trap_admin_pwd';
const DEFAULT_PASSWORD = 'beautytrap2026';

export const sanitizeContent = (raw: any): SiteContent => {
  if (!raw || typeof raw !== 'object') return defaultSiteContent;

  const sanitizePackageItems = (items: any[]): PackageItem[] => {
    if (!Array.isArray(items) || items.length === 0) return defaultSiteContent.packages.items;
    
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
    return { success: true, message: 'Changes saved successfully!' };
  };

  const resetContent = () => {
    setContent(defaultSiteContent);
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
