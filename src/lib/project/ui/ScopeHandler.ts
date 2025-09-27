export class ScopeHandler {
	drawWave?: (data: Float32Array, bufferLength: number) => void;

	constructor(public audioContext: AudioContext) {}

	async initialize() {
		await this.audioContext.audioWorklet.addModule('/waveProcessor.js');
		const workletNode = new AudioWorkletNode(this.audioContext, 'wave-processor');
		workletNode.connect(this.audioContext.destination);
		workletNode.port.onmessage = (e: MessageEvent) => {
			this.drawWave?.(e.data, e.data.length);
		};
	}
}
