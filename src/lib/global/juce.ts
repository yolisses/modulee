export {}; // This makes the file an external module

declare global {
	interface Window {
		__JUCE__?: {
			backend: {
				emitEvent(eventId: string, eventData: object): void;
				addEventListener(eventId: string, callback: (value: any) => void): void;
			};
			postMessage: () => void;
			initialisationData: {
				lastPage: [string];
				authToken?: [string];
				// TODO remove isRunningOnJucePlugin
				isRunningOnJucePlugin: [boolean];
			};
		};
	}
}
