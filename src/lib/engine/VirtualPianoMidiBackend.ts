import type { AudioBackend } from './AudioBackend';
import { virtualPianoKeyOffsets } from './virtualPianoKeyOffsets';

export class VirtualPianoMidiBackend {
	pressedKeys: Record<string, true> = {};
	constructor(public audioBackend: AudioBackend) {}

	async initialize() {
		window.addEventListener('keyup', this.handleKeyUp);
		window.addEventListener('keydown', this.handleKeyDown);
	}

	async destroy() {
		window.removeEventListener('keyup', this.handleKeyUp);
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	getKeyPitch(key: string) {
		const offset = virtualPianoKeyOffsets[key];
		if (offset === undefined) return;

		const cPitch = 60;
		const pitch = cPitch + offset;
		return pitch;
	}

	handleKeyDown = (e: KeyboardEvent) => {
		const key = e.key.toUpperCase();
		if (this.pressedKeys[key]) return;
		this.pressedKeys[key] = true;

		const pitch = this.getKeyPitch(key);
		if (pitch === undefined) return;

		this.audioBackend?.setNoteOn(pitch);
	};

	handleKeyUp = (e: KeyboardEvent) => {
		const key = e.key.toUpperCase();
		delete this.pressedKeys[key];

		const pitch = this.getKeyPitch(key);
		if (pitch === undefined) return;

		this.audioBackend?.setNoteOff(pitch);
	};
}
