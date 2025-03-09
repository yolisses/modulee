import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById';
import type { ProjectData } from './ProjectData';

// This will be deprecated once the projectData contains graphData
export function createInitialGraphRegistry(projectData: ProjectData): GraphRegistry {
	return {
		nodes: new ById<NodeData>(),
		connections: new ById<ConnectionData>(),
		mainGroupId: projectData.mainGroup.id,
		groups: ById.fromItems([structuredClone(projectData.mainGroup)]),
	};
}
