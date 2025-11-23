import { useState, useEffect } from 'react';
import type { AccessibilitySettings, FontSize, Theme } from '../types/accessibility.ts';
import { DEFAULT_ACCESSIBILITY_SETTINGS } from '../types/accessibility.ts';

const STORAGE_KEY = 'energy-app-accessibility';

const getInitialSettings = (): AccessibilitySettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_ACCESSIBILITY_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.error('Failed to load accessibility settings:', error);
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return {
    ...DEFAULT_ACCESSIBILITY_SETTINGS,
    theme: prefersDark ? 'dark' : 'light',
  };
};

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(getInitialSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }

    const htmlElement = document.documentElement;
    
    if (settings.theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    htmlElement.setAttribute('data-font-size', settings.fontSize);
  }, [settings]);

  const setFontSize = (fontSize: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const setTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
  };

  return {
    settings,
    setFontSize,
    setTheme,
    resetSettings,
  };
};
