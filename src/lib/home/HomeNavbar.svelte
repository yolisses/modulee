<script lang="ts">
	import { page } from '$app/state';
	import { faGuitar, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import UserButton from './UserButton.svelte';

	const route = $derived(page.route.id || '');
</script>

<div
	class="flex justify-around border-black/50 max-md:border-t-2 md:order-1 md:flex-col md:border-r-2"
>
	<a
		aria-label="Home"
		class="max-md:hidden"
		title="Go to projects page"
		href="/externalModules/instruments"
	>
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo-with-name.svg"
		/>
	</a>
	<a
		href="/externalModules/instruments"
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={route.startsWith('/(home)/externalModules/instruments')}
	>
		<Fa fw icon={faGuitar} />
		<div class="max-md:hidden">Instruments</div>
	</a>
	<a
		href="/projects"
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={route.startsWith('/(home)/projects')}
	>
		<Fa fw icon={faProjectDiagram} rotate={180} flip="vertical" />
		<div class="max-md:hidden">Projects</div>
	</a>
	<div class="flex-1 max-md:hidden"></div>
	<UserButton {route} />
</div>
