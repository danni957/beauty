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
      // Try PHP endpoint first (for Hostinger), or fallback to dev route
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
    } catch (err) {
      console.warn('Backend API fetch error, falling back to cached/default data:', err);
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
        // Fallback for dev server
        res = await fetch(`${API_BASE}/save-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, newPassword, content })
        });
      }

      const json = await res.json();

      if (res.ok && json.status === 'success') {
        return {
          success: true,
          message: json.message || 'Saved successfully!',
          updatedAt: json.updatedAt
        };
      } else {
        return {
          success: false,
          message: json.message || 'Failed to save changes'
        };
      }
    } catch (err: any) {
      console.error('Error saving content:', err);
      return {
        success: false,
        message: err.message || 'Network error while contacting server'
      };
    }
  },

  // Verify Admin Password
  async verifyPassword(password: string): Promise<boolean> {
    // Quick probe check
    try {
      const res = await fetch(`${API_BASE}/save-content.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, content: defaultSiteContent })
      });
      return res.status !== 401;
    } catch {
      return password === 'beautytrap2026';
    }
  }
};
