<script lang="ts">
	import { Editor, NodesPage } from 'modulee-nodes-editor';
	import type { ProjectData } from './ProjectData';
	import type { ProjectsRepository } from './ProjectsRepository';

	interface Props {
		projectData: ProjectData;
		projectsRepository: ProjectsRepository;
	}

	const { projectData, projectsRepository }: Props = $props();
	const editor = new Editor({ nodes: [] });
	editor.onExecute = (command) => {
		projectsRepository.addCommand(command.commandData).then(console.log);
	};
</script>

<NodesPage {editor} projectId={projectData.id}></NodesPage>
