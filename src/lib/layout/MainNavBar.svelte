<script lang="ts">
	import { faBolt, faDiagramProject, faFile, faGuitar } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<div class="border-r border-white/10">
	<a class="common-button" href="/projects">
		<Fa icon={faFile} />
	</a>
	<a class="common-button" href="/effects">
		<Fa icon={faBolt} />
	</a>
	<a class="common-button" href="/instruments">
		<Fa icon={faGuitar} />
	</a>
	<a class="common-button fa-flip-horizontal" href="/nodes">
		<Fa icon={faDiagramProject} flip="horizontal" />
	</a>
</div>
