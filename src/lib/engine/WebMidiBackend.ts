import { WebMidi, type NoteMessageEvent } from 'webmidi';
import type { AudioBackend } from './AudioBackend';

export class WebMidiBackend {
	webMidi?: typeof WebMidi;

	constructor(public audioBackend: AudioBackend) {}

	async initialize() {
		this.webMidi = await WebMidi.enable();
		this.webMidi.inputs.forEach((device) => {
			device.addListener('noteon', this.onNoteOn);
			device.addListener('noteoff', this.onNoteOff);
		});
	}

	onNoteOn = (e: NoteMessageEvent) => {
		this.audioBackend?.setNoteOn(e.note.number);
	};

	onNoteOff = (e: NoteMessageEvent) => {
		this.audioBackend?.setNoteOff(e.note.number);
	};
}
