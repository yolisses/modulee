<script lang="ts">
	import { page } from '$app/state';
	import { faProjectDiagram, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const route = $derived(page.route.id || '');
	$inspect(page);
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a class="common-button" href="/" aria-label="Home">
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo with name.svg"
		/>
	</a>
	<a
		href="/projects"
		class="common-button rounded-none border-white/25"
		class:border-l-4={route.startsWith('/(home)/projects')}
	>
		<Fa fw icon={faProjectDiagram} rotate={180} flip="vertical" /> Projects
	</a>
	<a
		href="/externalModules"
		class="common-button rounded-none border-white/25"
		class:border-l-4={route.startsWith('/(home)/externalModules')}
	>
		<Fa fw icon={faPuzzlePiece} /> External modules
	</a>
</div>
