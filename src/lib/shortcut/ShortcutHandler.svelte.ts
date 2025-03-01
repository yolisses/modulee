import { getZoomContext } from '$lib/ui/zoomContext';
import { commandClassesByType } from './commandClassesByType';
import { defaultShortcuts } from './defaultShortcuts';
import { getAreKeyListsEqual } from './getAreKeyListsEqual';
import { getEventKeys } from './getEventKeys';

export class ShortcutHandler {
	shortcuts = defaultShortcuts;
	zoomContext = getZoomContext();

	constructor() {}

	getContexts() {
		return {
			zoomContext: this.zoomContext,
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
			const command = new commandClass(contexts);
			command.execute();
		}
	};

	initialize() {
		window.addEventListener('keydown', this.handleKeyPress);
	}

	destroy() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}
}
