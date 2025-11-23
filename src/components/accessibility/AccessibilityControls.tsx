import type { AccessibilitySettings, FontSize, Theme } from '../../types/accessibility.ts';
import { FontSizeControls } from './FontSizeControls';
import { ThemeToggle } from './ThemeToggle';

interface AccessibilityControlsProps {
  settings: AccessibilitySettings;
  onFontSizeChange: (size: FontSize) => void;
  onThemeChange: (theme: Theme) => void;
}

export const AccessibilityControls = ({
  settings,
  onFontSizeChange,
  onThemeChange,
}: AccessibilityControlsProps) => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 shadow-md sticky top-0 z-50">
      <div className="w-full px-3 sm:px-4 md:px-6 py-2 md:py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
          <div className="flex items-center justify-center md:justify-start">
            <h1 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1 md:gap-2" aria-label="Dashboard title">
              <span className="text-lg md:text-2xl lg:text-3xl">⚡</span>
              Energy Dashboard
            </h1>
          </div>

          <nav className="flex items-center justify-center md:justify-end gap-3 md:gap-4" aria-label="Accesability controls">
            <FontSizeControls 
              currentSize={settings.fontSize}
              onSizeChange={onFontSizeChange}
            />
            
            <ThemeToggle 
              currentTheme={settings.theme}
              onThemeChange={onThemeChange}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};
