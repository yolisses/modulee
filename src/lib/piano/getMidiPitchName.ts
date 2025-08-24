export function getMidiPitchName(midiNote: number): string {
	const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	const octave = Math.floor(midiNote / 12) - 1;
	const noteIndex = midiNote % 12;
	return `${noteNames[noteIndex]}${octave}`;
}
