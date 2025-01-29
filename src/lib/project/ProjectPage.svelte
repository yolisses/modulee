<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { instantiateCommand } from '$lib/editor/instantiateCommand';
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

	const editor = new Editor({ nodes: [], groups: [] });
	const editorContext = $state({ editor });
	setEditorContext(editorContext);

	// TODO find a more encapsulated way to execute this initial changes
	editor.groups.push(projectData.mainGroup);

	projectData.commands.map((commandData) => {
		const command = instantiateCommand(commandData);
		editor.execute(command);
	});

	editor.onExecute = (command) => {
		projectsRepository.addCommand(command.commandData);
	};

	$effect(() => {
		handleGraphChange(editor.nodes);
	});
</script>

<NodesPage>
	{#snippet topBarChildren()}
		<HomeButton />
	{/snippet}
</NodesPage>
