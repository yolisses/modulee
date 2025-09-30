import { OscilloscopeBuffer } from './OscilloscopeBuffer.js';

class OscilloscopeProcessor extends AudioWorkletProcessor {
	constructor() {
		super();
		this.frameCount = 0;
		const resolution = 128;
		this.oscilloscopeBuffer = new OscilloscopeBuffer(resolution);
		this.port.onmessage = this.handleMessage;
		this.throttle = 4; // Post every 4th frame (~12ms at 44100Hz, 128 samples)
	}

	process(inputs) {
		const input = inputs[0][0];

		for (let i = 0; i < input.length; i++) {
			const value = input[i];
			this.oscilloscopeBuffer.push(value);
		}

		if (input) {
			if (this.frameCount >= this.throttle) {
				this.port.postMessage(this.oscilloscopeBuffer.buffer);
				this.frameCount = 0;
			}
			this.frameCount++;
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
		const { length } = this.oscilloscopeBuffer.buffer;
		const wavelength = this.getWavelength(pitch);
		const multiplier = Math.max(Math.floor(length / wavelength) + 2, 1);
		const ratio = length / wavelength / multiplier;
		this.oscilloscopeBuffer.setRatio(ratio);
	};
}

registerProcessor('OscilloscopeProcessor', OscilloscopeProcessor);
