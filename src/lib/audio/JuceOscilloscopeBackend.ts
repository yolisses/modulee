import type { OscilloscopeBackend } from './OscilloscopeBackend';

export class JuceOscilloscopeBackend implements OscilloscopeBackend {
	async initialize() {}

	setPitch(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setOscilloscopePitch', { pitch });
	}

	async getData() {
		// Lazy load the Juce module to avoid errors during SSR
		const getOscilloscopeData = (await import('$lib/juce')).getNativeFunction(
			'getOscilloscopeData',
		);
		const data = await getOscilloscopeData();
		return new Float32Array(data);
	}
}
