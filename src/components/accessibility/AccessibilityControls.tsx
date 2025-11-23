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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2" aria-label="Dashboard title">
              <span className="text-3xl">⚡</span>
              Energy Dashboard
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-4 lg:gap-6" aria-label="Accesability controls">
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
