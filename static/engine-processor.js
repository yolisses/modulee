import '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.js';
import '/node_modules/modulee-engine-wasm/test.js';

class EngineProcessor extends AudioWorkletProcessor {
	constructor() {
		super();
	}

	process(inputs, outputs, parameters) {
		const output = outputs[0];
		output.forEach((channel) => {
			for (let i = 0; i < channel.length; i++) {
				channel[i] = Math.random() * 2 - 1;
			}
		});
		return true;
	}
}

registerProcessor('engine-processor', EngineProcessor);
