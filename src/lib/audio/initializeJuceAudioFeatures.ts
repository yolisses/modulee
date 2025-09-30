import { getRequiredContext } from '$lib/global/getRequiredContext';
import { activePitchesContextKey } from '$lib/piano/activePitchesContext';
import { audioBackendContextKey } from './audioBackendContext';
import { JuceAudioBackend } from './JuceAudioBackend';
import { VirtualPianoMidiBackend } from './VirtualPianoMidiBackend';

export function initializeJuceAudioFeatures() {
	const audioBackendContext = getRequiredContext(audioBackendContextKey);
	const activePitchesContext = getRequiredContext(activePitchesContextKey);

	const audioBackend = new JuceAudioBackend();
	audioBackendContext.audioBackend = audioBackend;

	const virtualPianoMidiBackend = new VirtualPianoMidiBackend(
		audioBackend,
		activePitchesContext.activePitches,
	);
	virtualPianoMidiBackend.initialize();

	return () => {
		audioBackend.destroy();
		virtualPianoMidiBackend.destroy();
	};
}
