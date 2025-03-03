import * as modulee_engine_wasm_bg from '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.js';
import {
	__wbg_set_wasm,
	Graph,
	initialize_logging,
	set_panic_hook,
} from '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.js';

class EngineProcessor extends AudioWorkletProcessor {
	constructor(params) {
		super();
		this.isMuted = false;
		const { bytes } = params.processorOptions;
		const messageEventsBeforeInitialization = [];

		this.port.onmessage = (e) => {
			messageEventsBeforeInitialization.push(e);
		};

		this.initializeWasm(bytes).then(() => {
			messageEventsBeforeInitialization.forEach((messageEvent) => {
				this.handleMessage(messageEvent);
			});
			this.port.onmessage = this.handleMessage;
		});
	}

	async initializeWasm(bytes) {
		const result = await WebAssembly.instantiate(bytes, {
			'./modulee_engine_wasm_bg.js': modulee_engine_wasm_bg,
		});

		this.wasm = result.instance.exports;
		__wbg_set_wasm(this.wasm);

		set_panic_hook();
		initialize_logging();

		this.graph = new Graph();
		this.bufferPointer = this.graph.get_buffer_pointer();
	}

	process(inputs, outputs) {
		if (!this.graph) return true;

		this.graph.process_block();

		if (this.isMuted) return true;

		const outputBuffer = new Float32Array(this.wasm.memory.buffer, this.bufferPointer, 128);

		const output = outputs[0];
		for (let channel = 0; channel < output.length; channel++) {
			output[channel].set(outputBuffer);
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
			setGraph: this.setGraph,
			setNoteOn: this.setNoteOn,
			setNoteOff: this.setNoteOff,
			setIsMuted: this.setIsMuted,
		};

		// The command data have it's own `data` and `type`
		const callback = callbacksByType[type];
		callback(messageEvent.data.data);
	};

	// TODO check if all these warns are really needed
	setGraph = ({ graphEngineData }) => {
		const graphJson = JSON.stringify(graphEngineData);
		this.graph.set_graph(graphJson);
	};

	setNoteOn = ({ pitch }) => {
		this.graph.set_note_on(pitch);
	};

	setNoteOff = ({ pitch }) => {
		this.graph.set_note_off(pitch);
	};

	setIsMuted = ({ isMuted }) => {
		this.isMuted = isMuted;
	};
}

registerProcessor('engine-processor', EngineProcessor);
