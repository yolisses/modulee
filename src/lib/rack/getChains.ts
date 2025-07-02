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

		const inputChain = chains.find((chain) => chain.includes(input));
		if (!inputChain) {
			// This handles an invalid state. Unfortun
			if (input === node) {
				chains.push([node]);
				return;
			} else {
				throw new Error('Input missing in the chains', { cause: input });
			}
		}

		const inputIndex = inputChain.indexOf(input);

		if (inputIndex === inputChain.length - 1) {
			// Input is the tail of the chain; append node to the end
			inputChain.push(node);
		} else {
			// If the input is not the tail, split the chain at this point
			const newChain = inputChain.splice(inputIndex + 1);
			chains.push(newChain);
			chains.push([node]);
		}
	});

	return chains;
}
