export function passSomeString(someString: string) {
	window.__JUCE__?.backend.emitEvent('passSomeString', { someString });
}
