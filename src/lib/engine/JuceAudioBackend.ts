import type { AudioBackend } from './AudioBackend';
import type { NodeEngineData } from './NodeEngineData';

export class JuceAudioBackend implements AudioBackend {
	static canBeCreated() {
		return !!window.__JUCE__;
	}

	setNodes(nodesEngineData: NodeEngineData[]) {
		window.__JUCE__?.backend.emitEvent('graphChange', {
			nodesData: JSON.stringify(nodesEngineData),
		});
	}
}
