import { getRequiredContext } from '$lib/global/getRequiredContext';
import { activePitchesContextKey } from '$lib/piano/activePitchesContext';
import { WebOscilloscopeBackend } from '$lib/project/ui/WebOscilloscopeBackend';
import { audioBackendContextKey } from './audioBackendContext';
import { oscilloscopeBackendContextKey } from './oscilloscopeBackendContext';
import { VirtualPianoMidiBackend } from './VirtualPianoMidiBackend';
import { WasmAudioBackend } from './WasmAudioBackend';

export function initializeWebAudioFeatures() {
	const activePitchesContext = getRequiredContext(activePitchesContextKey);
	const audioBackendContext = getRequiredContext(audioBackendContextKey);
	const oscilloscopeBackendContext = getRequiredContext(oscilloscopeBackendContextKey);

	const audioBackend = new WasmAudioBackend();
	audioBackendContext.audioBackend = audioBackend;
	audioBackend.initialize().then(() => {
		const webOscilloscopeBackend = new WebOscilloscopeBackend(audioBackend.audioContext!);
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

	return () => {
		audioBackend.destroy();
		virtualPianoMidiBackend.destroy();
	};
}
