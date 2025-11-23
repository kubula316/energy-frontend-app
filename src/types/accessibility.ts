export const FontSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type FontSize = typeof FontSize[keyof typeof FontSize];

export const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

export interface AccessibilitySettings {
  fontSize: FontSize;
  theme: Theme;
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  fontSize: FontSize.MEDIUM,
  theme: Theme.DARK,
};
