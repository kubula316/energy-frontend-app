import { useAccessibility } from './hooks';
import { AccessibilityControls } from './components/AccessibilityControls';

function App() {
  const {
    settings,
    setFontSize,
    setTheme,
  } = useAccessibility();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <AccessibilityControls
        settings={settings}
        onFontSizeChange={setFontSize}
        onThemeChange={setTheme}
      />

      <main className="transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        </div>
      </main>
    </div>
  );
}

export default App;
