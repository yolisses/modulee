import type { AudioBackend } from './AudioBackend';
import type { NodeEngineData } from './NodeEngineData';

export class WasmAudioBackend implements AudioBackend {
	constructor() {}

	async initialize() {
		const wasmFilePath = 'node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.wasm';
		const response = await fetch(wasmFilePath);
		const bytes = await response.arrayBuffer();

		const audioContext = new AudioContext();
		await audioContext.audioWorklet.addModule('engine-processor.js');
		const engineNode = new AudioWorkletNode(audioContext, 'engine-processor', {
			// TODO rename bytes to something WASM related
			processorOptions: { bytes },
		});
		engineNode.connect(audioContext.destination);
	}

	setNodes(nodesEngineData: NodeEngineData[]): void {
		throw new Error('Method not implemented.');
	}
}
