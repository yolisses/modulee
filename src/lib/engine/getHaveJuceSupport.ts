export function getHaveJuceSupport() {
	return !!window.__JUCE__?.initialisationData.isRunningOnJucePlugin;
}
