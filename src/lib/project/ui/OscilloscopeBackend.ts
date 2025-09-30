export interface OscilloscopeBackend {
	initialize(): Promise<void>;
	setPitch(pitch: number): void;
	getData(): Float32Array;
}
