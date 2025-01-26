<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import { instantiateCommand } from '$lib/editor/instantiateCommand';
	import { handleGraphChange } from '$lib/engine/handleGraphChange';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import HomeButton from '$lib/ui/HomeButton.svelte';
	import type { ProjectData } from './ProjectData';
	import type { ProjectsRepository } from './ProjectsRepository';

	interface Props {
		projectData: ProjectData;
		projectsRepository: ProjectsRepository;
	}

	const { projectData, projectsRepository }: Props = $props();

	const editor = new Editor({ nodes: [] });

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

<NodesPage {editor} projectId={projectData.id}>
	{#snippet topBarChildren()}
		<HomeButton />
	{/snippet}
</NodesPage>
