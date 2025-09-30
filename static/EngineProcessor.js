import * as modulee_engine_wasm_bg from '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.js';
import {
	__wbg_set_wasm,
	Graph,
	initialize_logging,
	set_panic_hook,
} from '/node_modules/modulee-engine-wasm/modulee_engine_wasm_bg.js';

// It comes from the current implementation on the browsers. It may change in
// the future.
const BUFFER_SIZE = 128;

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

		this.graph = new Graph(sampleRate);
		this.buffer0Pointer = this.graph.get_buffer_0_pointer();
		this.buffer1Pointer = this.graph.get_buffer_1_pointer();
	}

	process(inputs, outputs) {
		if (!this.graph) return true;

		this.graph.process_block();

		if (this.isMuted) return true;

		outputs[0][0].set(new Float32Array(this.wasm.memory.buffer, this.buffer0Pointer, BUFFER_SIZE));
		outputs[0][1].set(new Float32Array(this.wasm.memory.buffer, this.buffer1Pointer, BUFFER_SIZE));

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
			updateControl: this.updateControl,
		};

		// The command data have it's own `data` and `type`
		const callback = callbacksByType[type];
		callback(messageEvent.data.data);
	};

	// TODO check if all these warns are really needed
	setGraph = ({ graphEngineData }) => {
		const graphJson = JSON.stringify(graphEngineData, null, 2);
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

	updateControl = ({ id, value }) => {
		this.graph.update_control(id, value);
	};
}

registerProcessor('EngineProcessor', EngineProcessor);
