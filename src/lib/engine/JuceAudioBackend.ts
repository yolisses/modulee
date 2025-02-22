import type { AudioBackend } from './AudioBackend';
import type { GraphEngineData } from './data/GraphEngineData';

export class JuceAudioBackend implements AudioBackend {
	static canBeCreated() {
		// TODO find a more elegant solution
		return window.__JUCE__?.postMessage.length ?? 0 > 0;
	}

	destroy(): void {
		throw new Error('destroy not implemented.');
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

	setIsMuted(isMuted: boolean): void {
		throw new Error('setIsMuted not implemented.');
	}
}
