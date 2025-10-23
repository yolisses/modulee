import type { AudioBackend } from './AudioBackend';
import type { GraphEngineData } from './data/GraphEngineData';

type Message = {
	type: string;
	data: object;
};

export class WebAudioBackend implements AudioBackend {
	engineNode?: AudioWorkletNode;
	pendingMessages: Message[] = [];

	constructor(public audioContext: AudioContext) {}

	async initialize() {
		const wasmFilePath = '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.wasm';
		const response = await fetch(wasmFilePath);
		const bytes = await response.arrayBuffer();

		await this.audioContext.audioWorklet.addModule('/EngineProcessor.js');

		this.engineNode = new AudioWorkletNode(this.audioContext, 'EngineProcessor', {
			processorOptions: { bytes },
			channelCount: 2,
			channelCountMode: 'explicit',
		});
		this.engineNode.connect(this.audioContext.destination);

		this.pendingMessages.forEach((message) => {
			this.engineNode?.port.postMessage(message);
		});
		this.pendingMessages = [];
	}

	postOrSaveMessage(message: Message) {
		if (this.engineNode) {
			this.engineNode.port.postMessage(message);
		} else {
			this.pendingMessages.push(message);
		}
	}

	setGraph(graphEngineData: GraphEngineData): void {
		this.postOrSaveMessage({
			type: 'setGraph',
			data: { graphEngineData },
		});
	}

	setNoteOn(pitch: number): void {
		this.postOrSaveMessage({
			type: 'setNoteOn',
			data: { pitch },
		});
	}

	setNoteOff(pitch: number): void {
		this.postOrSaveMessage({
			type: 'setNoteOff',
			data: { pitch },
		});
	}

	setIsMuted(isMuted: boolean): void {
		this.postOrSaveMessage({
			type: 'setIsMuted',
			data: { isMuted },
		});
	}

	updateControl(id: number, value: number): void {
		this.postOrSaveMessage({
			type: 'updateControl',
			data: { id, value },
		});
	}
}
