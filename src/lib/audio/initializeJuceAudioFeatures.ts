import { getRequiredContext } from '$lib/global/getRequiredContext';
import { activePitchesContextKey } from '$lib/piano/activePitchesContext';
import { audioBackendContextKey } from './audioBackendContext';
import { JuceAudioBackend } from './JuceAudioBackend';
import { JuceOscilloscopeBackend } from './JuceOscilloscopeBackend';
import { oscilloscopeBackendContextKey } from './oscilloscopeBackendContext';
import { VirtualPianoMidiBackend } from './VirtualPianoMidiBackend';

export function initializeJuceAudioFeatures() {
	const audioBackendContext = getRequiredContext(audioBackendContextKey);
	const activePitchesContext = getRequiredContext(activePitchesContextKey);
	const oscilloscopeBackendContext = getRequiredContext(oscilloscopeBackendContextKey);

	const juceAudioBackend = new JuceAudioBackend();
	audioBackendContext.audioBackend = juceAudioBackend;

	const virtualPianoMidiBackend = new VirtualPianoMidiBackend(
		juceAudioBackend,
		activePitchesContext.activePitches,
	);
	virtualPianoMidiBackend.initialize();

	const juceOscilloscopeBackend = new JuceOscilloscopeBackend();
	oscilloscopeBackendContext.oscilloscopeBackend = juceOscilloscopeBackend;

	return () => {
		virtualPianoMidiBackend.destroy();
	};
}
