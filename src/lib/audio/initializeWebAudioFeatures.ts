import { WebOscilloscopeBackend } from '$lib/audio/WebOscilloscopeBackend';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { activePitchesContextKey } from '$lib/piano/activePitchesContext';
import { audioBackendContextKey } from './audioBackendContext';
import { oscilloscopeBackendContextKey } from './oscilloscopeBackendContext';
import { VirtualPianoMidiBackend } from './VirtualPianoMidiBackend';
import { WebAudioBackend } from './WebAudioBackend';

export function initializeWebAudioFeatures() {
	const activePitchesContext = getRequiredContext(activePitchesContextKey);
	const audioBackendContext = getRequiredContext(audioBackendContextKey);
	const oscilloscopeBackendContext = getRequiredContext(oscilloscopeBackendContextKey);

	const audioContext = new AudioContext();
	const audioBackend = new WebAudioBackend(audioContext);
	audioBackendContext.audioBackend = audioBackend;
	audioBackend.initialize().then(() => {
		const webOscilloscopeBackend = new WebOscilloscopeBackend(audioContext);
		webOscilloscopeBackend.initialize().then(() => {
			audioBackend.engineNode?.connect(webOscilloscopeBackend.oscilloscopeNode!);
			oscilloscopeBackendContext.oscilloscopeBackend = webOscilloscopeBackend;
		});
	});

	const virtualPianoMidiBackend = new VirtualPianoMidiBackend(
		audioBackend,
		activePitchesContext.activePitches,
	);
	virtualPianoMidiBackend.initialize();

	const startAudioContext = () => {
		audioContext.resume();
		window.removeEventListener('keydown', startAudioContext);
		window.removeEventListener('pointerdown', startAudioContext);
	};
	// If the audio context can't start because of the user hasn't
	// interacted with the page
	if (audioContext.state !== 'running') {
		window.addEventListener('keydown', startAudioContext);
		window.addEventListener('pointerdown', startAudioContext);
	}

	return () => {
		virtualPianoMidiBackend.destroy();
		audioContext.close();
	};
}
