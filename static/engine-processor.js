import * as modulee_engine_wasm_bg from './modulee_engine_wasm_bg.js';
import { __wbg_set_wasm, Graph, initialize_logging } from './modulee_engine_wasm_bg.js';

class EngineProcessor extends AudioWorkletProcessor {
	constructor(params) {
		super();
		const { bytes } = params.processorOptions;
		this.initializeWasm(bytes);
	}

	async initializeWasm(bytes) {
		const result = await WebAssembly.instantiate(bytes, {
			'./modulee_engine_wasm_bg.js': modulee_engine_wasm_bg,
		});
		const wasm = result.instance.exports;
		__wbg_set_wasm(wasm);
		initialize_logging();

		this.graph = new Graph();
		this.graph.set_debug_string('test');
		console.log(this.graph.get_debug_value());
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
