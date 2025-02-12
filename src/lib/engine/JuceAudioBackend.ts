import type { AudioBackend } from './AudioBackend';
import type { GroupEngineData } from './GroupEngineData';
import { hashToUsize } from './hashToUsize';

export class JuceAudioBackend implements AudioBackend {
	static canBeCreated() {
		return !!window.__JUCE__;
	}

	destroy(): void {
		throw new Error('Method not implemented.');
	}

	setNoteOn(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setNoteOn', { pitch });
	}

	setNoteOff(pitch: number): void {
		window.__JUCE__?.backend.emitEvent('setNoteOff', { pitch });
	}

	setGroups(groupsEngineData: GroupEngineData[]) {
		window.__JUCE__?.backend.emitEvent('setGroups', {
			groupsData: JSON.stringify(groupsEngineData),
		});
	}

	setMainGroupId(mainGroupId: string): void {
		window.__JUCE__?.backend.emitEvent('setMainGroupId', {
			mainGroupId: hashToUsize(mainGroupId),
		});
	}
}
