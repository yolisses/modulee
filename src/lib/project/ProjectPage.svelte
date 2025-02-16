<script lang="ts">
	import { ById } from '$lib/editor/ById.svelte';
	import { createCommand } from '$lib/editor/createCommand';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
	import { setGroupIdContext } from '$lib/group/groupIdContext';
	import LateralBar from '$lib/lateralBar/LateralBar.svelte';
	import { setSelectedTabContext } from '$lib/lateralBar/selectedTabContext';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import HomeButton from '$lib/ui/HomeButton.svelte';
	import { setDefaultContexts } from 'nodes-editor';
	import { type Snippet } from 'svelte';
	import type { ProjectData } from './ProjectData';
	import { setProjectDataContext } from './projectDataContext';
	import type { ProjectsRepository } from './ProjectsRepository';

	interface Props {
		children: Snippet;
		projectData: ProjectData;
		projectsRepository: ProjectsRepository;
	}

	setDefaultContexts();

	const { children, projectData, projectsRepository }: Props = $props();

	const selectedTabContext = $state({ selectedTab: 'group' });
	setSelectedTabContext(selectedTabContext);

	const groupContext = $state({ groupId: projectData.mainGroup.id });
	setGroupIdContext(groupContext);

	const projectDataContext = $state({ projectData });
	setProjectDataContext(projectDataContext);

	// TODO find a more encapsulated way to execute this initial changes
	const editor = new Editor({
		history: [],
		undoneHistory: [],
		nodes: new ById(),
		connections: new ById(),
		groups: new ById([structuredClone(projectData.mainGroup)]),
	});

	projectData.commands.map((commandData) => {
		const command = createCommand(commandData);
		editor.execute(command);
	});

	editor.onExecute = (command) => {
		projectsRepository.addCommand(command.commandData);
	};

	const editorContext = $state({ editor });
	setEditorContext(editorContext);

	const audioBackendContext = getAudioBackendContext();
	$effect(() => {
		const groupsEngineData = getGraphEngineData(editorContext.editor.editorData);

		// TODO replace by setGraph
		audioBackendContext.audioBackend?.setGroups(groupsEngineData.groups);

		const mainGroupId = projectData.mainGroup.id;
		audioBackendContext.audioBackend?.setMainGroupId(mainGroupId);
	});
</script>

<div class="flex flex-row">
	<NodesPage>
		{#snippet topBarChildren()}
			<HomeButton />
		{/snippet}
	</NodesPage>
	<LateralBar />
</div>

<!-- TODO consider removing it -->
<!-- This is here only to allow other +page.svelte files to use the contexts
declared. -->
{@render children?.()}
