import type { AudioBackend } from './AudioBackend';
import type { GraphEngineData } from './data/GraphEngineData';

export class JuceAudioBackend implements AudioBackend {
	static canBeCreated() {
		return !!window.__JUCE__;
	}

	destroy(): void {
		throw new Error('Method not implemented.');
	}

	setGraph(graphEngineData: GraphEngineData) {
		window.__JUCE__?.backend.emitEvent('setGraph', {
			groupsData: JSON.stringify(graphEngineData),
		});
	}

	setNoteOn(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setNoteOn', { pitch });
	}

	setNoteOff(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setNoteOff', { pitch });
	}
}
