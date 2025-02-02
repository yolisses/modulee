import { TextDecoder, TextEncoder } from './text-encoder-and-decoder-polyfill.js';

let wasm;
export function __wbg_set_wasm(val) {
	wasm = val;
}

const lTextDecoder =
	typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
	if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
		cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
	}
	return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder =
	typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString =
	typeof cachedTextEncoder.encodeInto === 'function'
		? function (arg, view) {
				return cachedTextEncoder.encodeInto(arg, view);
			}
		: function (arg, view) {
				const buf = cachedTextEncoder.encode(arg);
				view.set(buf);
				return {
					read: arg.length,
					written: buf.length,
				};
			};

function passStringToWasm0(arg, malloc, realloc) {
	if (realloc === undefined) {
		const buf = cachedTextEncoder.encode(arg);
		const ptr = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0()
			.subarray(ptr, ptr + buf.length)
			.set(buf);
		WASM_VECTOR_LEN = buf.length;
		return ptr;
	}

	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;

	const mem = getUint8ArrayMemory0();

	let offset = 0;

	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 0x7f) break;
		mem[ptr + offset] = code;
	}

	if (offset !== len) {
		if (offset !== 0) {
			arg = arg.slice(offset);
		}
		ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0;
		const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
		const ret = encodeString(arg, view);

		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}

	WASM_VECTOR_LEN = offset;
	return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
	if (
		cachedDataViewMemory0 === null ||
		cachedDataViewMemory0.buffer.detached === true ||
		(cachedDataViewMemory0.buffer.detached === undefined &&
			cachedDataViewMemory0.buffer !== wasm.memory.buffer)
	) {
		cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
	}
	return cachedDataViewMemory0;
}

function getArrayU8FromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
	if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
		cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
	}
	return cachedFloat32ArrayMemory0;
}

function passArrayF32ToWasm0(arg, malloc) {
	const ptr = malloc(arg.length * 4, 4) >>> 0;
	getFloat32ArrayMemory0().set(arg, ptr / 4);
	WASM_VECTOR_LEN = arg.length;
	return ptr;
}

export function set_panic_hook() {
	wasm.set_panic_hook();
}

export function initialize_logging() {
	wasm.initialize_logging();
}

export function greet() {
	wasm.greet();
}

const GraphFinalization =
	typeof FinalizationRegistry === 'undefined'
		? { register: () => {}, unregister: () => {} }
		: new FinalizationRegistry((ptr) => wasm.__wbg_graph_free(ptr >>> 0, 1));

export class Graph {
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		GraphFinalization.unregister(this);
		return ptr;
	}

	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_graph_free(ptr, 0);
	}
	/**
	 * @returns {number}
	 */
	get_debug_value() {
		const ret = wasm.graph_get_debug_value(this.__wbg_ptr);
		return ret;
	}
	/**
	 * @param {string} debug_string
	 */
	set_debug_string(debug_string) {
		const ptr0 = passStringToWasm0(debug_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		wasm.graph_set_debug_string(this.__wbg_ptr, ptr0, len0);
	}
	/**
	 * @param {string} nodes_data
	 */
	set_nodes(nodes_data) {
		const ptr0 = passStringToWasm0(nodes_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		wasm.graph_set_nodes(this.__wbg_ptr, ptr0, len0);
	}
	constructor() {
		const ret = wasm.graph_new();
		this.__wbg_ptr = ret >>> 0;
		GraphFinalization.register(this, this.__wbg_ptr, this);
		return this;
	}
	/**
	 * @param {number} ptr
	 */
	static destroy_graph_pointer(ptr) {
		wasm.graph_destroy_graph_pointer(ptr);
	}
	/**
	 * @param {Float32Array} buffer
	 * @param {number} length
	 */
	process_block(buffer, length) {
		var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
		var len0 = WASM_VECTOR_LEN;
		wasm.graph_process_block(this.__wbg_ptr, ptr0, len0, buffer, length);
	}
}

export function __wbg_alert_83b7e8ac3e6d766c(arg0, arg1) {
	alert(getStringFromWasm0(arg0, arg1));
}

export function __wbg_debug_e17b51583ca6a632(arg0, arg1, arg2, arg3) {
	console.debug(arg0, arg1, arg2, arg3);
}

export function __wbg_error_524f506f44df1645(arg0) {
	console.error(arg0);
}

export function __wbg_error_7534b8e9a36f1ab4(arg0, arg1) {
	let deferred0_0;
	let deferred0_1;
	try {
		deferred0_0 = arg0;
		deferred0_1 = arg1;
		console.error(getStringFromWasm0(arg0, arg1));
	} finally {
		wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
	}
}

export function __wbg_error_80de38b3f7cc3c3c(arg0, arg1, arg2, arg3) {
	console.error(arg0, arg1, arg2, arg3);
}

export function __wbg_info_033d8b8a0838f1d3(arg0, arg1, arg2, arg3) {
	console.info(arg0, arg1, arg2, arg3);
}

export function __wbg_log_cad59bb680daec67(arg0, arg1, arg2, arg3) {
	console.log(arg0, arg1, arg2, arg3);
}

export function __wbg_new_8a6f238a6ece86ea() {
	const ret = new Error();
	return ret;
}

export function __wbg_stack_0ed75d68575b0f3c(arg0, arg1) {
	const ret = arg1.stack;
	const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
	const len1 = WASM_VECTOR_LEN;
	getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
	getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbg_warn_aaf1f4664a035bd6(arg0, arg1, arg2, arg3) {
	console.warn(arg0, arg1, arg2, arg3);
}

export function __wbindgen_copy_to_typed_array(arg0, arg1, arg2) {
	new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(
		getArrayU8FromWasm0(arg0, arg1),
	);
}

export function __wbindgen_init_externref_table() {
	const table = wasm.__wbindgen_export_3;
	const offset = table.grow(4);
	table.set(0, undefined);
	table.set(offset + 0, undefined);
	table.set(offset + 1, null);
	table.set(offset + 2, true);
	table.set(offset + 3, false);
}

export function __wbindgen_string_new(arg0, arg1) {
	const ret = getStringFromWasm0(arg0, arg1);
	return ret;
}

export function __wbindgen_throw(arg0, arg1) {
	throw new Error(getStringFromWasm0(arg0, arg1));
}
