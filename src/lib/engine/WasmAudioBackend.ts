import type { AudioBackend } from './AudioBackend';
import type { NodeEngineData } from './NodeEngineData';

export class WasmAudioBackend implements AudioBackend {
	engineNode?: AudioWorkletNode;
	lastUnsetNodes?: NodeEngineData[];

	constructor() {
		this.initialize();
	}

	async initialize() {
		const wasmFilePath = '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.wasm';
		const response = await fetch(wasmFilePath);
		const bytes = await response.arrayBuffer();

		const audioContext = new AudioContext();
		await audioContext.audioWorklet.addModule('/engine-processor.js');

		this.engineNode = new AudioWorkletNode(audioContext, 'engine-processor', {
			processorOptions: { bytes },
		});
		this.engineNode.connect(audioContext.destination);

		if (this.lastUnsetNodes) {
			this.setNodes(this.lastUnsetNodes);
		}
	}

	setNodes(nodesEngineData: NodeEngineData[]): void {
		if (!this.engineNode) {
			this.lastUnsetNodes = nodesEngineData;
			console.warn('Attempt to set nodes engine data without audio worklet initialized');
			return;
		}

		this.engineNode.port.postMessage({
			type: 'setNodes',
			data: { nodes: nodesEngineData },
		});
	}
}
