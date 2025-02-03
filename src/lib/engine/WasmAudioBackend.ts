import type { AudioBackend } from './AudioBackend';
import type { NodeEngineData } from './NodeEngineData';

export class WasmAudioBackend implements AudioBackend {
	engineNode?: AudioWorkletNode;

	constructor() {
		this.initialize();
	}

	async initialize() {
		const response = await fetch('node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.wasm');
		const bytes = await response.arrayBuffer();

		const audioContext = new AudioContext();
		await audioContext.audioWorklet.addModule('/engine-processor.js');

		const engineNode = new AudioWorkletNode(audioContext, 'engine-processor', {
			processorOptions: { bytes },
		});
		engineNode.connect(audioContext.destination);
	}

	setNodes(nodesEngineData: NodeEngineData[]): void {
		// DEBUG
		return;

		if (!this.engineNode) {
			console.warn('Attempt to set nodes engine data without audio worklet initialized');
		}
		this.engineNode?.port.postMessage({
			type: 'setNodes',
			data: { nodes: nodesEngineData },
		});
	}
}
