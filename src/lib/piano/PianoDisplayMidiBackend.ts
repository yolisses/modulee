import type { AudioBackend } from '$lib/audio/AudioBackend';

export class PianoDisplayMidiBackend {
	pitchesToClear = new Set<number>();

	constructor(
		public audioBackend: AudioBackend,
		public activePitches: Set<number>,
	) {}

	handlePointerEnter = (e: PointerEvent, pitch: number) => {
		if (!e.buttons) return;
		this.setNoteOn(pitch);
	};

	handlePointerLeave = (e: PointerEvent, pitch: number) => {
		if (!e.buttons) return;
		this.setNoteOff(pitch);
	};

	handleBlur = () => {
		this.pitchesToClear.values().forEach(this.setNoteOff);
	};

	setNoteOn = (pitch: number) => {
		this.audioBackend.setNoteOn(pitch);
		this.activePitches.add(pitch);
		this.pitchesToClear.add(pitch);
	};

	setNoteOff = (pitch: number) => {
		this.audioBackend.setNoteOff(pitch);
		this.activePitches.delete(pitch);
		this.pitchesToClear.delete(pitch);
	};

	initialize = () => {
		window.addEventListener('blur', this.handleBlur);
	};

	destroy = () => {
		window.removeEventListener('blur', this.handleBlur);
	};
}
