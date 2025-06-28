import { createId } from '$lib/data/createId';
import type { ExternalModuleReference } from '$lib/data/ExternalModuleReference';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleReference } from '$lib/data/InternalModuleReference';
import type { EditorCommand } from '$lib/editor/EditorCommand';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';
import { SetModuleNodeModuleReferenceCommand } from './SetModuleNodeModuleReferenceCommand';

export class SetModuleNodeModuleReferenceMonkey extends EditorMonkey {
	getSomeModuleNodes(graphRegistry: GraphRegistry) {
		return graphRegistry.nodes.values().filter(getIsSomeModuleNodeData);
	}

	getRandomModuleReference(graphRegistry: GraphRegistry) {
		const externalModuleReferences: ExternalModuleReference[] = graphRegistry.externalModules
			.values()
			.map((externalModuleData) => {
				return { type: 'external', moduleId: externalModuleData.id };
			});
		const internalModuleReferences: InternalModuleReference[] = graphRegistry.internalModules
			.values()
			.map((internalModuleData) => {
				return { type: 'internal', moduleId: internalModuleData.id };
			});
		return getRandomItem([...externalModuleReferences, ...internalModuleReferences, undefined]);
	}

	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return this.getSomeModuleNodes(graphRegistry).length > 0;
	}

	createCommand(graphRegistry: GraphRegistry): EditorCommand {
		const moduleNode = getRandomItem(this.getSomeModuleNodes(graphRegistry));
		// const references :ModuleReference[] =
		return new SetModuleNodeModuleReferenceCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			projectId: FAKE_PROJECT_ID,
			type: 'SetModuleNodeModuleReferenceCommand',
			details: {
				moduleNodeId: moduleNode.id,
				moduleReference: this.getRandomModuleReference(graphRegistry),
			},
		});
	}
}
