export class ScopeHandler {
	drawWave?: (data: Float32Array, bufferLength: number) => void;
	workletNode?: AudioWorkletNode;
	constructor(public audioContext: AudioContext) {}

	async initialize() {
		await this.audioContext.audioWorklet.addModule('/waveProcessor.js');
		this.workletNode = new AudioWorkletNode(this.audioContext, 'wave-processor');
		this.workletNode.connect(this.audioContext.destination);
		this.workletNode.port.onmessage = (e: MessageEvent) => {
			this.drawWave?.(e.data, e.data.length);
		};
	}
}
