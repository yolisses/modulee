type Message = {
	type: string;
	data: object;
};

export class OscilloscopeHandler {
	oscilloscopeNode?: AudioWorkletNode;
	pendingMessages: Message[] = [];
	data = new Float32Array([0]);

	constructor(public audioContext: AudioContext) {}

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

	setRatio(ratio: number): void {
		this.postOrSaveMessage({
			type: 'setRatio',
			data: { ratio },
		});
	}
}
