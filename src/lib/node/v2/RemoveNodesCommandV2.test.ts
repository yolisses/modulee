import { ById } from '$lib/editor/ById';
import type { GraphDataContext } from '$lib/graph/graphDataContext';
import type { Contexts } from '$lib/shortcut/contexts';
import type { SvelteSet } from 'svelte/reactivity';
import { expect, test } from 'vitest';
import type { SelectedNodeIdsContext } from '../../../../../nodes-editor/dist/selection/selectedNodeIdsContext';
import { RemoveNodesCommandV2 } from './RemoveNodesCommandV2';

test('RemoveNodesCommandV2', () => {
	const graphDataContext = {
		graphData: {
			nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
		},
	} as GraphDataContext;

	const selectedNodeIdsContext: SelectedNodeIdsContext = {
		selectedNodeIds: new Set(['node2']) as SvelteSet<string>,
	};

	const contexts = { graphDataContext, selectedNodeIdsContext } as Contexts;

	const command = new RemoveNodesCommandV2();
	command.execute(contexts);

	expect(contexts.graphDataContext.graphData.nodes).toEqual(
		ById.fromItems([{ id: 'node1' }, { id: 'node3' }]),
	);

	command.undo(contexts);

	expect(contexts.graphDataContext.graphData.nodes).toEqual(
		ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	);
});
