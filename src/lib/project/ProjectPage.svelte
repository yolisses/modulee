<script lang="ts">
	import { passSomeString } from '$dev/passSomeString';
	import { Editor, NodesPage, instantiateCommand } from 'modulee-nodes-editor';
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

	passSomeString('from code');
</script>

<NodesPage {editor} projectId={projectData.id}></NodesPage>
