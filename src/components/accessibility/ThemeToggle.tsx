import { Theme } from '../../types/Accessibility';

interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeToggle = ({ currentTheme, onThemeChange }: ThemeToggleProps) => {
  const buttonBaseClass = "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200";
  const activeClass = "bg-blue-600 text-white shadow-md ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-800 scale-105";
  const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        Motyw:
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onThemeChange(Theme.LIGHT)}
          className={`${buttonBaseClass} ${
            currentTheme === Theme.LIGHT ? activeClass : inactiveClass
          }`}
          aria-label="Jasny motyw"
          aria-pressed={currentTheme === Theme.LIGHT}
        >
          ☀️ Jasny
        </button>
        <button
          onClick={() => onThemeChange(Theme.DARK)}
          className={`${buttonBaseClass} ${
            currentTheme === Theme.DARK ? activeClass : inactiveClass
          }`}
          aria-label="Ciemny motyw"
          aria-pressed={currentTheme === Theme.DARK}
        >
          🌙 Ciemny
        </button>
      </div>
    </div>
  );
};
