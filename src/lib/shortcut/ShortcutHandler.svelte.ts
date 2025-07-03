import { actionCommandClassesByType } from './actionCommandClassesByType';
import { contextsContextKey, getRequiredContext } from './contextsContext';
import { defaultShortcuts } from './defaultShortcuts';
import { getAreKeyListsEqual } from './getAreKeyListsEqual';
import { getEventKeys } from './getEventKeys';
import { getIsTextEdit } from './getIsTextEdit';

export class ShortcutHandler {
	shortcuts = defaultShortcuts;
	contextsContext = getRequiredContext(contextsContextKey);

	handleKeyDown = (e: KeyboardEvent) => {
		if (getIsTextEdit(e)) return;

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

		const { contexts } = this.contextsContext;
		const commandClass = actionCommandClassesByType[shortcut.commandType];

		if (commandClass) {
			e.preventDefault();
			e.stopPropagation();
			const command = new commandClass();
			command.execute(contexts);
		}
	};

	initialize() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	destroy() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	getShortcutForCommandType(commandType: string) {
		return this.shortcuts.find((shortcut) => {
			return shortcut.commandType === commandType;
		});
	}

	getShortcutStringForCommandType(commandType: string) {
		const shortcut = this.getShortcutForCommandType(commandType);
		if (!shortcut) return '';
		return '(' + shortcut.keys.join('+') + ')';
	}
}
