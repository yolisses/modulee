<script lang="ts">
	import { page } from '$app/state';
	import { faGuitar, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import UserButton from './UserButton.svelte';

	const route = $derived(page.route.id || '');
</script>

<div class="flex flex-row border-r-2 border-black/50 md:order-1 md:flex-col">
	<a
		aria-label="Home"
		class="vertical-tab hidden md:flex"
		title="Go to projects page"
		href="/externalModules/instruments"
	>
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo with name.svg"
		/>
	</a>
	<a
		class="vertical-tab"
		href="/externalModules/instruments"
		class:vertical-tab-selected={route.startsWith('/(home)/externalModules/instruments')}
	>
		<Fa fw icon={faGuitar} />
		<div class="hidden md:flex">Instruments</div>
	</a>
	<a
		href="/projects"
		class="vertical-tab"
		class:vertical-tab-selected={route.startsWith('/(home)/projects')}
	>
		<Fa fw icon={faProjectDiagram} rotate={180} flip="vertical" />
		<div class="hidden md:flex">Projects</div>
	</a>
	<div class="flex-1"></div>
	<UserButton {route} />
</div>
