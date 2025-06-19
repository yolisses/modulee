import type { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorData } from '$lib/editor/EditorData';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { range } from '$lib/fake/range';
import { expect, test } from 'vitest';
import { createMinimalGraphRegistry } from './createMinimalGraphRegistry';
import { editorMonkeyClasses } from './editorMonkeyClasses';

test('editorMonkeys', () => {
	const iterations = 100;
	const graphRegistry = createMinimalGraphRegistry();

	const editorData: EditorData = {
		history: [],
		undoneHistory: [],
	};

	const commands: EditorCommand[] = [];
	const versions = [structuredClone(graphRegistry)];
	range(iterations).forEach(() => {
		const MonkeyClass = getRandomItem(editorMonkeyClasses);
		const monkey = new MonkeyClass();
		const canBeUsed = monkey.getCanBeUsed(graphRegistry, editorData);
		if (!canBeUsed) return;
		const command = monkey.createCommand(graphRegistry, editorData);
		command.execute(graphRegistry, editorData);
		commands.push(command);
		versions.push(structuredClone(graphRegistry));
	});

	const versionsByUndo = [structuredClone(graphRegistry)];
	commands.toReversed().forEach((command) => {
		command.undo(graphRegistry, editorData);
		versionsByUndo.push(structuredClone(graphRegistry));
	});

	expect(versionsByUndo).toEqual(versions.toReversed());
});
