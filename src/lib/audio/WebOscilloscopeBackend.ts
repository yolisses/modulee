import type { OscilloscopeBackend } from './OscilloscopeBackend';

type Message = {
	type: string;
	data: object;
};

export class WebOscilloscopeBackend implements OscilloscopeBackend {
	oscilloscopeNode?: AudioWorkletNode;
	pendingMessages: Message[] = [];
	data = new Float32Array([0]);

	constructor(public audioContext: AudioContext) {}

	getData(): Float32Array {
		return this.data;
	}

	async initialize() {
		await this.audioContext.audioWorklet.addModule('/OscilloscopeProcessor.js');

		this.oscilloscopeNode = new AudioWorkletNode(this.audioContext, 'OscilloscopeProcessor', {
			channelCount: 2,
			channelCountMode: 'explicit',
		});
		this.oscilloscopeNode.connect(this.audioContext.destination);

		this.pendingMessages.forEach((message) => {
			this.oscilloscopeNode?.port.postMessage(message);
		});
		this.pendingMessages = [];

		this.oscilloscopeNode.port.onmessage = (e: MessageEvent) => {
			this.data = e.data;
		};
	}

	postOrSaveMessage(message: Message) {
		if (this.oscilloscopeNode) {
			this.oscilloscopeNode.port.postMessage(message);
		} else {
			this.pendingMessages.push(message);
		}
	}

	setPitch(pitch: number): void {
		this.postOrSaveMessage({
			type: 'setPitch',
			data: { pitch },
		});
	}
}
