import type { AudioBackend } from './AudioBackend';
import type { GroupEngineData } from './GroupEngineData';

export class JuceAudioBackend implements AudioBackend {
	static canBeCreated() {
		return !!window.__JUCE__;
	}

	destroy(): void {
		throw new Error('Method not implemented.');
	}

	setGroups(groupsEngineData: GroupEngineData[]) {
		window.__JUCE__?.backend.emitEvent('graphChange', {
			groupsData: JSON.stringify(groupsEngineData),
		});
	}

	setNoteOn(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('noteOn', { pitch });
	}

	setNoteOff(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('noteOff', { pitch });
	}
}
