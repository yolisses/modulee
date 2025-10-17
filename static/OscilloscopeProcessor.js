import { OscilloscopeBuffer } from './OscilloscopeBuffer.js';

class OscilloscopeProcessor extends AudioWorkletProcessor {
	constructor() {
		super();
		this.frameCount = 0;
		const resolution = 128;
		this.oscilloscopeBuffers = [
			new OscilloscopeBuffer(resolution),
			new OscilloscopeBuffer(resolution),
		];
		this.port.onmessage = this.handleMessage;
		this.throttle = 4; // Post every 4th frame (~12ms at 44100Hz, 128 samples)
	}

	process(inputs) {
		const { length } = inputs[0][0];

		for (let i = 0; i < length; i++) {
			this.oscilloscopeBuffers[0].push(inputs[0][0][i]);
			this.oscilloscopeBuffers[1].push(inputs[0][1][i]);
		}

		this.frameCount++;
		if (this.frameCount >= this.throttle) {
			this.port.postMessage([
				this.oscilloscopeBuffers[0].buffer,
				this.oscilloscopeBuffers[1].buffer,
			]);
			this.frameCount = 0;
		}
		return true;
	}

	/**
	 * @param {MessageEvent} messageEvent
	 */
	handleMessage = (messageEvent) => {
		// The data of the command is passed through `messageEvent.data`.
		const { type } = messageEvent.data;

		const callbacksByType = {
			setPitch: this.setPitch,
		};

		// The command data have it's own `data` and `type`
		const callback = callbacksByType[type];
		callback(messageEvent.data.data);
	};

	getWavelength = (pitch) => {
		const frequency = 440 * Math.pow(2, (pitch - 69) / 12);
		return sampleRate / frequency;
	};

	setPitch = ({ pitch }) => {
		const { length } = this.oscilloscopeBuffers[0].buffer;
		const wavelength = this.getWavelength(pitch);
		const multiplier = Math.max(Math.floor(length / wavelength) + 2, 1);
		const ratio = length / wavelength / multiplier;
		this.oscilloscopeBuffers[0].setRatio(ratio);
		this.oscilloscopeBuffers[1].setRatio(ratio);
	};
}

registerProcessor('OscilloscopeProcessor', OscilloscopeProcessor);
