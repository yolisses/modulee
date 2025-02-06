import type { AudioBackend } from './AudioBackend';
import type { NodeEngineData } from './NodeEngineData';

export class JuceAudioBackend implements AudioBackend {
	static canBeCreated() {
		return !!window.__JUCE__;
	}

	destroy(): void {
		throw new Error('Method not implemented.');
	}

	setNodes(nodesEngineData: NodeEngineData[]) {
		window.__JUCE__?.backend.emitEvent('graphChange', {
			nodesData: JSON.stringify(nodesEngineData),
		});
	}

	setNoteOn(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('noteOn', { pitch });
	}

	setNoteOff(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('noteOff', { pitch });
	}
}
