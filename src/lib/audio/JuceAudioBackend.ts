import type { AudioBackend } from './AudioBackend';
import type { GraphEngineData } from './data/GraphEngineData';

export class JuceAudioBackend implements AudioBackend {
	setGraph(graphEngineData: GraphEngineData) {
		window.__JUCE__?.backend.emitEvent('setGraph', {
			graphEngineData: JSON.stringify(graphEngineData),
		});
	}

	setNoteOn(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setNoteOn', { pitch });
	}

	setNoteOff(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setNoteOff', { pitch });
	}

	setIsMuted(isMuted: boolean): void {
		window.__JUCE__?.backend.emitEvent('setIsMuted', { isMuted });
	}

	updateControl(id: number, value: number): void {
		window.__JUCE__?.backend.emitEvent('updateControl', { id, value });
	}
}
