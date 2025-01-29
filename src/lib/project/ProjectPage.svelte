<script lang="ts">
	import { createCommand } from '$lib/editor/createCommand';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { handleGraphChange } from '$lib/engine/handleGraphChange';
	import { setGroupIdContext } from '$lib/group/groupIdContext';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import HomeButton from '$lib/ui/HomeButton.svelte';
	import { setDefaultContexts } from 'nodes-editor';
	import type { ProjectData } from './ProjectData';
	import { setProjectIdContext } from './projectIdContext';
	import type { ProjectsRepository } from './ProjectsRepository';

	interface Props {
		projectData: ProjectData;
		projectsRepository: ProjectsRepository;
	}

	setDefaultContexts();

	const { projectData, projectsRepository }: Props = $props();

	const groupContext = $state({ groupId: projectData.mainGroup.id });
	setGroupIdContext(groupContext);

	const projectIdContext = $state({ projectId: projectData.id });
	setProjectIdContext(projectIdContext);

	// TODO find a more encapsulated way to execute this initial changes
	const editor = new Editor({
		nodes: [],
		history: [],
		undoneHistory: [],
		groups: [structuredClone(projectData.mainGroup)],
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

	$effect(() => {
		handleGraphChange(editor.nodes);
	});
</script>

<NodesPage>
	{#snippet topBarChildren()}
		<HomeButton />
	{/snippet}
</NodesPage>
