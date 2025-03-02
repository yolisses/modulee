import { getGraphContext } from '$lib/data/graphContext';
import { getEditorContext } from '$lib/editor/editorContext';
import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
import { getIsMutedContext } from '$lib/engine/isMutedContexts';
import { getGraphDataContext } from '$lib/graph/graphDataContext';
import { getGroupIdContext } from '$lib/group/groupIdContext';
import { getProjectDataContext } from '$lib/project/projectDataContext';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { getSelectedNodeIdsContext } from '../../../../nodes-editor/dist/selection/selectedNodeIdsContext';
import { actionCommandClassesByType } from './actionCommandClassesByType';
import type { Contexts } from './contexts';
import { defaultShortcuts } from './defaultShortcuts';
import { getAreKeyListsEqual } from './getAreKeyListsEqual';
import { getEventKeys } from './getEventKeys';

export class ShortcutHandler {
	shortcuts = defaultShortcuts;
	zoomContext = getZoomContext();
	graphContext = getGraphContext();
	editorContext = getEditorContext();
	groupIdContext = getGroupIdContext();
	isMutedContext = getIsMutedContext();
	graphDataContext = getGraphDataContext();
	projectDataContext = getProjectDataContext();
	audioBackendContext = getAudioBackendContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();

	constructor() {}

	getContexts(): Contexts {
		return {
			zoomContext: this.zoomContext,
			graphContext: this.graphContext,
			editorContext: this.editorContext,
			groupIdContext: this.groupIdContext,
			isMutedContext: this.isMutedContext,
			graphDataContext: this.graphDataContext,
			projectDataContext: this.projectDataContext,
			audioBackendContext: this.audioBackendContext,
			selectedNodeIdsContext: this.selectedNodeIdsContext,
		};
	}

	handleKeyPress = (e: KeyboardEvent) => {
		const eventKeys = getEventKeys(e);
		console.log(eventKeys);
		const eventKeysWithoutShift = eventKeys.filter((key) => key !== 'Shift');

		let shortcut = this.shortcuts.find((shortcut) => {
			return getAreKeyListsEqual(eventKeys, shortcut.keys);
		});

		if (!shortcut) {
			shortcut = this.shortcuts.find((shortcut) => {
				return getAreKeyListsEqual(eventKeysWithoutShift, shortcut.keys);
			});
		}

		if (!shortcut) return;

		const contexts = this.getContexts();
		const commandClass = actionCommandClassesByType[shortcut.commandType];

		if (commandClass) {
			e.preventDefault();
			e.stopPropagation();
			const command = new commandClass();
			command.execute(contexts);
		}
	};

	initialize() {
		window.addEventListener('keydown', this.handleKeyPress);
	}

	destroy() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}
}
