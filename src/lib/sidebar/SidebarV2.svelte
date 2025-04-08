<script lang="ts">
	import { getProjectDataContext } from '$lib/project/projectDataContext';

	const projectDataContext = getProjectDataContext();
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a class="common-button" href="/projects/{projectDataContext.projectData.id}">Nodes</a>
	<a class="common-button" href="{baseUrl}/modules">Modules</a>
	<div class="flex-1" />
	<a class="common-button" href="/" aria-label="Home">
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo with name.svg"
		/>
	</a>
</div>
