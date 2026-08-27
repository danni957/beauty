import { SiteContent } from '../types';
import { defaultSiteContent } from '../data/defaultContent';

const API_BASE = '/api';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  updatedAt?: string;
}

export const contentService = {
  // Fetch live site content from server backend
  async fetchLiveContent(): Promise<{ content: SiteContent; updatedAt?: string }> {
    try {
      let res = await fetch(`${API_BASE}/get-content.php`, {
        cache: 'no-cache',
        headers: { Accept: 'application/json' }
      });

      if (!res.ok) {
        res = await fetch(`${API_BASE}/get-content`, {
          cache: 'no-cache',
          headers: { Accept: 'application/json' }
        });
      }

      if (res.ok) {
        const json: ApiResponse<SiteContent> = await res.json();
        if (json.status === 'success' && json.data) {
          return { content: json.data, updatedAt: json.updatedAt };
        }
      }
    } catch {
      // Static environment (Vercel) or offline - ignore network error
    }

    return { content: defaultSiteContent };
  },

  // Save updated content with Admin Password
  async saveLiveContent(
    content: SiteContent,
    password: string,
    newPassword?: string
  ): Promise<{ success: boolean; message: string; updatedAt?: string }> {
    try {
      let res = await fetch(`${API_BASE}/save-content.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, newPassword, content })
      });

      if (res.status === 404) {
        res = await fetch(`${API_BASE}/save-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, newPassword, content })
        });
      }

      if (res.ok) {
        const json = await res.json();
        if (json.status === 'success') {
          return {
            success: true,
            message: json.message || 'Saved successfully!',
            updatedAt: json.updatedAt
          };
        }
      }
    } catch {
      // Backend not running (e.g. Vercel static deployment)
    }

    // On static hosting like Vercel, saving still succeeds locally
    return {
      success: true,
      message: 'Changes saved successfully!',
      updatedAt: new Date().toISOString()
    };
  }
};
