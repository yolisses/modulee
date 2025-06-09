<script lang="ts">
	import { page } from '$app/state';
	import { faGuitar, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import UserButton from './UserButton.svelte';

	const route = $derived(page.route.id || '');
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a class="vertical-tab" href="/" aria-label="Home" title="Go to projects page">
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
		class="vertical-tab"
		class:vertical-tab-selected={route.startsWith('/(home)/projects')}
	>
		<Fa fw icon={faProjectDiagram} rotate={180} flip="vertical" /> Projects
	</a>
	<a
		href="/externalModules/instruments"
		class="vertical-tab"
		class:vertical-tab-selected={route.startsWith('/(home)/instruments')}
	>
		<Fa fw icon={faGuitar} /> Instruments
	</a>
	<div class="flex-1"></div>
	<UserButton {route} />
</div>
