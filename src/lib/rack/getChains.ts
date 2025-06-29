import type { TopologicalMap } from '$lib/connection/TopologicalMap';

/**
 * Returns the chains. Each chain is a list of nodes connected without branches.
 * Requires graph to be topologically sorted.
 */
export function getChains(graph: TopologicalMap): string[][] {
	const chains: string[][] = [];

	graph.forEach((inputs, node) => {
		if (inputs.length > 1) {
			throw new Error('Node with more than one input');
		}

		const input = inputs[0];

		// If the node has no inputs, create a new chain for it.
		if (!input) {
			chains.push([node]);
			return;
		}

		const inputChain = chains.find((chain) => {
			return chain.some((node) => {
				return node === input;
			});
		});
		if (!inputChain) {
			throw new Error('Input missing in the chains', { cause: input });
		}

		const inputIndex = inputChain.indexOf(input);

		// If the input is the tail of the chain, just add the node at the end
		if (inputIndex === inputChain.length - 1) {
			inputChain.push(node);
			return;
		}

		// Otherwise create a new chain from beyond input, since there's a branching
		const newInputChain = inputChain.splice(inputIndex + 1, inputChain.length - (inputIndex + 1));
		chains.push(newInputChain);
		chains.push([node]);
	});

	return chains;
}
