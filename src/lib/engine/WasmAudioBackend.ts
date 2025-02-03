import type { AudioBackend } from './AudioBackend';
import type { NodeEngineData } from './NodeEngineData';

export class WasmAudioBackend implements AudioBackend {
	audioContext?: AudioContext;
	engineNode?: AudioWorkletNode;
	lastUnsetNodes?: NodeEngineData[];

	constructor() {
		this.initialize();
	}

	async initialize() {
		const wasmFilePath = '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.wasm';
		const response = await fetch(wasmFilePath);
		const bytes = await response.arrayBuffer();

		this.audioContext = new AudioContext();
		await this.audioContext.audioWorklet.addModule('/engine-processor.js');

		this.engineNode = new AudioWorkletNode(this.audioContext, 'engine-processor', {
			processorOptions: { bytes },
		});
		this.engineNode.connect(this.audioContext.destination);

		if (this.lastUnsetNodes) {
			this.setNodes(this.lastUnsetNodes);
		}

		// If the audio context can't start because of the user hasn't
		// interacted with the page
		if (this.audioContext.state !== 'running') {
			window.addEventListener('keydown', this.startAudioContext);
			window.addEventListener('pointerdown', this.startAudioContext);
		}
	}

	startAudioContext = () => {
		this.audioContext?.resume();
		window.removeEventListener('keydown', this.startAudioContext);
		window.removeEventListener('pointerdown', this.startAudioContext);
	};

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
