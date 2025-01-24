<script lang="ts">
	import { Editor, NodesPage } from 'modulee-nodes-editor';
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();
	const editor = new Editor({ nodes: [] });
</script>

<NodesPage {editor} projectId={projectData.id}></NodesPage>
