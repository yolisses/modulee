<script>
	import { Editor, NodesPage } from 'modulee-nodes-editor';
	import { devEditorData } from '../../dev/devEditorData';

	const editor = new Editor(devEditorData);
	const projectId = 'devNodesPage';
</script>

<div class="min-h-screen">
	<NodesPage {editor} {projectId} />
</div>
