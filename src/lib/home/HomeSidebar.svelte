<script lang="ts">
	import { page } from '$app/state';
	import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import UserButton from './UserButton.svelte';

	const route = $derived(page.route.id || '');
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a class="common-button rounded-none" href="/" aria-label="Home">
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
	<div class="flex-1"></div>
	<UserButton {route} />
</div>
