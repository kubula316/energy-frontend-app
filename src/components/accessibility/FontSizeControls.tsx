import { FontSize } from '../../types/accessibility.ts';

interface FontSizeControlsProps {
  currentSize: FontSize;
  onSizeChange: (size: FontSize) => void;
}

export const FontSizeControls = ({ currentSize, onSizeChange }: FontSizeControlsProps) => {
  const buttonBaseClass = "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200";
  const activeClass = "bg-blue-600 text-white shadow-md ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-800 scale-105";
  const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        Font:
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onSizeChange(FontSize.SMALL)}
          className={`${buttonBaseClass} text-xs ${
            currentSize === FontSize.SMALL ? activeClass : inactiveClass
          }`}
          aria-label="Small font"
          aria-pressed={currentSize === FontSize.SMALL}
        >
          A
        </button>
        <button
          onClick={() => onSizeChange(FontSize.MEDIUM)}
          className={`${buttonBaseClass} text-base ${
            currentSize === FontSize.MEDIUM ? activeClass : inactiveClass
          }`}
          aria-label="Medium font"
          aria-pressed={currentSize === FontSize.MEDIUM}
        >
          A
        </button>
        <button
          onClick={() => onSizeChange(FontSize.LARGE)}
          className={`${buttonBaseClass} text-lg ${
            currentSize === FontSize.LARGE ? activeClass : inactiveClass
          }`}
          aria-label="Large font"
          aria-pressed={currentSize === FontSize.LARGE}
        >
          A
        </button>
      </div>
    </div>
  );
};
