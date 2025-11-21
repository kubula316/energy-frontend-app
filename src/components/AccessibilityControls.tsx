import { FontSize, Theme } from '../types/Accessibility';
import type { AccessibilitySettings } from '../types/Accessibility';

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
  const buttonBaseClass = "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200";
  const activeClass = "bg-blue-600 text-white shadow-md ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-800 scale-105";
  const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600";

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 shadow-md sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">⚡</span>
              Energy Dashboard
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-4 lg:gap-6" aria-label="Ustawienia dostępności">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Czcionka:
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => onFontSizeChange(FontSize.SMALL)}
                  className={`${buttonBaseClass} text-xs ${
                    settings.fontSize === FontSize.SMALL ? activeClass : inactiveClass
                  }`}
                  aria-label="Mała czcionka"
                  aria-pressed={settings.fontSize === FontSize.SMALL}
                >
                  A
                </button>
                <button
                  onClick={() => onFontSizeChange(FontSize.MEDIUM)}
                  className={`${buttonBaseClass} text-base ${
                    settings.fontSize === FontSize.MEDIUM ? activeClass : inactiveClass
                  }`}
                  aria-label="Średnia czcionka"
                  aria-pressed={settings.fontSize === FontSize.MEDIUM}
                >
                  A
                </button>
                <button
                  onClick={() => onFontSizeChange(FontSize.LARGE)}
                  className={`${buttonBaseClass} text-lg ${
                    settings.fontSize === FontSize.LARGE ? activeClass : inactiveClass
                  }`}
                  aria-label="Duża czcionka"
                  aria-pressed={settings.fontSize === FontSize.LARGE}
                >
                  A
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Motyw:
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => onThemeChange(Theme.LIGHT)}
                  className={`${buttonBaseClass} ${
                    settings.theme === Theme.LIGHT ? activeClass : inactiveClass
                  }`}
                  aria-label="Jasny motyw"
                  aria-pressed={settings.theme === Theme.LIGHT}
                >
                  ☀️ Jasny
                </button>
                <button
                  onClick={() => onThemeChange(Theme.DARK)}
                  className={`${buttonBaseClass} ${
                    settings.theme === Theme.DARK ? activeClass : inactiveClass
                  }`}
                  aria-label="Ciemny motyw"
                  aria-pressed={settings.theme === Theme.DARK}
                >
                  🌙 Ciemny
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
