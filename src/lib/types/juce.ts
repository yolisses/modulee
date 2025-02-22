export {}; // This makes the file an external module

declare global {
	interface Window {
		__JUCE__?: {
			backend: {
				emitEvent(eventId: string, eventData: object): void;
			};
			postMessage: () => void;
			initialisationData: {
				isRunningOnJucePlugin?: [boolean];
			};
		};
	}
}
