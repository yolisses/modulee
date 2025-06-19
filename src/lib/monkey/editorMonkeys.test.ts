import type { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorData } from '$lib/editor/EditorData';
import { range } from '$lib/fake/range';
import { expect, test } from 'vitest';
import { createMinimalGraphRegistry } from './createMinimalGraphRegistry';
import { editorMonkeys } from './editorMonkeys';
import { getRandomItem } from '$lib/fake/getRandomItem';

test('editorMonkeys', () => {
	const iterations = 20;
	const graphRegistry = createMinimalGraphRegistry();

	const editorData: EditorData = {
		history: [],
		undoneHistory: [],
	};

	const commands: EditorCommand[] = [];
	const versions = [structuredClone(graphRegistry)];
	range(iterations).forEach((iteration) => {
		console.info();
		console.info('Iteration', iteration);
		const MonkeyClass = getRandomItem(editorMonkeys);
		console.info('MonkeyClass', MonkeyClass);
		const monkey = new MonkeyClass();
		const canBeUsed = monkey.getCanBeUsed(graphRegistry);
		console.info('canBeUsed', canBeUsed);
		if (!canBeUsed) return;
		const command = monkey.createCommand(graphRegistry);
		command.execute(graphRegistry);
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
