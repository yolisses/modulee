import type { EditorData } from '$lib/editor/EditorData';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { range } from '$lib/fake/range';
import { getGraphData } from '$lib/project/getGraphData';
import { createMinimalGraphRegistry } from './createMinimalGraphRegistry';
import { editorMonkeyClasses } from './editorMonkeyClasses';

export function createGraphWithMonkeys(iterations: number = 100) {
	const graphRegistry = createMinimalGraphRegistry();

	const editorData: EditorData = {
		history: [],
		undoneHistory: [],
	};

	range(iterations).forEach(() => {
		const MonkeyClass = getRandomItem(editorMonkeyClasses);
		const monkey = new MonkeyClass();
		const canBeUsed = monkey.getCanBeUsed(graphRegistry, editorData);
		if (!canBeUsed) return;
		const command = monkey.createCommand(graphRegistry, editorData);
		command.execute(graphRegistry, editorData);
	});

	return getGraphData(graphRegistry);
}
