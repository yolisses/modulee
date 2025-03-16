<script lang="ts">
	import { faProjectDiagram, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a class="common-button" href="/" aria-label="Home">
		<img
			src="/logo with name.svg"
			height="16"
			alt="Modulee logo"
			style="height: 1rem;"
			class="my-1"
		/>
	</a>
	<a class="common-button" href="/projects">
		<Fa icon={faProjectDiagram} rotate={180} flip="vertical" /> Projects
	</a>
	<a class="common-button" href="/externalModules">
		<Fa icon={faPuzzlePiece} /> External modules
	</a>
</div>
