import { useAccessibility } from './hooks';
import { AccessibilityControls } from './components/accessibility';
import { EnergyMixPanel } from './components/energyMix';
import { OptimalChargingPanel } from './components/optimalCharging';

function App() {
  const {
    settings,
    setFontSize,
    setTheme,
  } = useAccessibility();

  return (
    <div className="min-h-screen bg-gray-150 dark:bg-gray-900 transition-colors">
      <AccessibilityControls settings={settings} onFontSizeChange={setFontSize} onThemeChange={setTheme}/>

      <main className="transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <EnergyMixPanel fontSize={settings.fontSize} />
          <OptimalChargingPanel fontSize={settings.fontSize} />
        </div>
      </main>

    </div>
  );
}

export default App;
