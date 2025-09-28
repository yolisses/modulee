export class ScopeHandler {
	workletNode?: AudioWorkletNode;
	data?: Float32Array;

	constructor(public audioContext: AudioContext) {}

	async initialize() {
		await this.audioContext.audioWorklet.addModule('/waveProcessor.js');
		this.workletNode = new AudioWorkletNode(this.audioContext, 'wave-processor');
		this.workletNode.connect(this.audioContext.destination);
		this.workletNode.port.onmessage = (e: MessageEvent) => {
			this.data = e.data;
		};
	}
}
