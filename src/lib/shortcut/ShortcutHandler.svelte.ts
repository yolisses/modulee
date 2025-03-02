import { getGraphDataContext } from '$lib/graph/graphDataContext';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { getSelectedNodeIdsContext } from '../../../../nodes-editor/dist/selection/selectedNodeIdsContext';
import { commandClassesByType } from './commandClassesByType';
import type { Contexts } from './contexts';
import { defaultShortcuts } from './defaultShortcuts';
import { getAreKeyListsEqual } from './getAreKeyListsEqual';
import { getEventKeys } from './getEventKeys';

export class ShortcutHandler {
	shortcuts = defaultShortcuts;
	zoomContext = getZoomContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();
	graphDataContext = getGraphDataContext();

	constructor() {}

	getContexts(): Contexts {
		return {
			zoomContext: this.zoomContext,
			graphDataContext: this.graphDataContext,
			selectedNodeIdsContext: this.selectedNodeIdsContext,
		};
	}

	handleKeyPress = (e: KeyboardEvent) => {
		const eventKeys = getEventKeys(e);
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
		const commandClass = commandClassesByType[shortcut.commandType];

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
