import { getNativeFunction } from '$lib/juce';
import type { OscilloscopeBackend } from './OscilloscopeBackend';

export class JuceOscilloscopeBackend implements OscilloscopeBackend {
	async initialize() {}

	setPitch(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setPitch', { pitch });
	}

	async getData() {
		const getOscilloscopeData = getNativeFunction('getOscilloscopeData');
		const data = await getOscilloscopeData();
		return new Float32Array(data);
	}
}
