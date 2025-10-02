export function getHasJuceSupport() {
	return !!window.__JUCE__?.initialisationData?.versionString;
}
