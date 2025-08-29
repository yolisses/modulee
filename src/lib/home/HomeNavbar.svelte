<script lang="ts">
	import { getHasJuceSupport } from '$lib/audio/getHasJuceSupport';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import {
		faDownload,
		faGuitar,
		faProjectDiagram,
		faQuestion,
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { homeNavbarSelectionContextKey } from './homeNavbarSelectionContext';
	import UserButton from './UserButton.svelte';

	const homeNavbarSelectionContext = getRequiredContext(homeNavbarSelectionContextKey);

	let hasJuceSupport = $state<boolean>();

	onMount(() => {
		hasJuceSupport = getHasJuceSupport();
	});
</script>

<div
	class="flex justify-around border-black/50 max-md:border-t-2 md:order-1 md:flex-col md:border-r-2"
>
	<a
		aria-label="Home"
		title="Go to projects page"
		href="/externalModules/instruments"
		class="md:vertical-tab max-md:hidden"
	>
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo-with-name-beta.svg"
		/>
	</a>
	<a
		href="/externalModules/instruments"
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'instruments'}
	>
		<Fa fw icon={faGuitar} />
		<div class="max-md:hidden">Instruments</div>
	</a>
	<a
		href="/projects"
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'projects'}
	>
		<Fa fw icon={faProjectDiagram} rotate={180} flip="vertical" />
		<div class="max-md:hidden">Projects</div>
	</a>
	{#if hasJuceSupport === false}
		<a
			href="/plugin"
			class="max-md:horizontal-tab md:vertical-tab"
			data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'plugin'}
		>
			<Fa fw icon={faDownload} />
			<div class="max-md:hidden">Get the plugin</div>
		</a>
	{/if}
	<div class="flex-1 max-md:hidden"></div>
	<a
		href="/help"
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'help'}
	>
		<Fa fw icon={faQuestion} />
		<div class="max-md:hidden">Help</div>
	</a>
	<UserButton />
</div>
