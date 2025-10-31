import { FlatteningModuleNode } from './FlatteningModuleNode';
import type { FlatteningNode } from './FlatteningNode';

function getFlatteningModuleNodesInOrderStep(
	moduleNode: FlatteningModuleNode,
	result: FlatteningModuleNode[],
) {
	if (result.includes(moduleNode)) return;
	result.push(moduleNode);
	moduleNode.targetModule?.nodes.forEach((node) => {
		if (node instanceof FlatteningModuleNode) {
			getFlatteningModuleNodesInOrderStep(node, result);
		}
	});
}

export function getFlatteningModuleNodesInOrder(nodes: FlatteningNode[]) {
	const result: FlatteningModuleNode[] = [];
	nodes.forEach((node) => {
		if (node instanceof FlatteningModuleNode) {
			getFlatteningModuleNodesInOrderStep(node, result);
		}
	});
	return result;
}
