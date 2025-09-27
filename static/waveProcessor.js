/**
 * AudioWorkletProcessor for processing audio data and sending it to the main thread.
 * @class
 * @extends AudioWorkletProcessor
 */
class WaveProcessor extends AudioWorkletProcessor {
	/**
	 * Initializes the processor.
	 */
	constructor() {
		super();
		this.port.onmessage = () => {};
		this.frameCount = 0;
		this.throttle = 4; // Post every 4th frame (~12ms at 44100Hz, 128 samples)
	}

	/**
	 * Processes audio input and sends it to the main thread with throttling.
	 * @param {Float32Array[][]} inputs - The input audio buffers.
	 * @param {Float32Array[][]} outputs - The output audio buffers.
	 * @returns {boolean} - Whether the processor should continue.
	 */
	process(inputs) {
		const input = inputs[0][0];
		if (input) {
			if (this.frameCount >= this.throttle) {
				this.port.postMessage(input);
				this.frameCount = 0;
			}
			this.frameCount++;
		}
		return true;
	}
}

/**
 * Registers the WaveProcessor with the name 'wave-processor'.
 */
registerProcessor('wave-processor', WaveProcessor);
