export interface OscilloscopeBackend {
	initialize(): Promise<void>;
	setPitch(pitch: number): void;
	getData(): Promise<Float32Array>;
}
