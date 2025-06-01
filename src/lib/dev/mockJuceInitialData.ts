export function mockJuceInitialData() {
	window.__JUCE__ = {
		initialisationData: {
			authToken: ['testAuthToken'],
			isRunningOnJucePlugin: [true],
		},
	};
}
