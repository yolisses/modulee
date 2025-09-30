export class ScopeHandler {
	workletNode?: AudioWorkletNode;
	data?: Float32Array;

	constructor(public audioContext: AudioContext) {}

	async initialize() {
		await this.audioContext.audioWorklet.addModule('/OscilloscopeProcessor.js');
		this.workletNode = new AudioWorkletNode(this.audioContext, 'OscilloscopeProcessor');
		this.workletNode.connect(this.audioContext.destination);
		this.workletNode.port.onmessage = (e: MessageEvent) => {
			this.data = e.data;
		};
	}
}
