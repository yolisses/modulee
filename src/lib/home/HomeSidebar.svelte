<script lang="ts">
	import { faProjectDiagram, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
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
	<a class="common-button" href="/projects">
		<Fa fw icon={faProjectDiagram} rotate={180} flip="vertical" /> Projects
	</a>
	<a class="common-button" href="/externalModules">
		<Fa fw icon={faPuzzlePiece} /> External modules
	</a>
</div>
