import type { AudioBackend } from './AudioBackend';
import type { GroupEngineData } from './GroupEngineData';
import { hashToUsize } from './hashToUsize';

export class WasmAudioBackend implements AudioBackend {
	audioContext?: AudioContext;
	engineNode?: AudioWorkletNode;
	lastUnsetGroups?: GroupEngineData[];

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

		if (this.lastUnsetGroups) {
			this.setGroups(this.lastUnsetGroups);
		}

		// If the audio context can't start because of the user hasn't
		// interacted with the page
		if (this.audioContext.state !== 'running') {
			window.addEventListener('keydown', this.startAudioContext);
			window.addEventListener('pointerdown', this.startAudioContext);
		}
	}

	destroy(): void {
		this.audioContext?.close();
	}

	startAudioContext = () => {
		this.audioContext?.resume();
		window.removeEventListener('keydown', this.startAudioContext);
		window.removeEventListener('pointerdown', this.startAudioContext);
	};

	setGroups(groupsEngineData: GroupEngineData[]): void {
		if (!this.engineNode) {
			this.lastUnsetGroups = groupsEngineData;
			return;
		}

		this.engineNode.port.postMessage({
			type: 'setGroups',
			data: { groupsEngineData },
		});
	}

	setNoteOn(pitch: number): void {
		if (!this.engineNode) return;
		this.engineNode.port.postMessage({
			type: 'setNoteOn',
			data: { pitch },
		});
	}

	setNoteOff(pitch: number): void {
		if (!this.engineNode) return;
		this.engineNode.port.postMessage({
			type: 'setNoteOff',
			data: { pitch },
		});
	}

	setMainGroupId(mainGroupId: string): void {
		if (!this.engineNode) return;
		this.engineNode.port.postMessage({
			type: 'setMainGroupId',
			data: { mainGroupId: hashToUsize(mainGroupId) },
		});
	}
}
