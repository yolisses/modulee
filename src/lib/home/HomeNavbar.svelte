<script lang="ts">
	import { dev } from '$app/environment';
	import { getHasJuceSupport } from '$lib/audio/getHasJuceSupport';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import {
		faComputer,
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
		class="md:vertical-tab max-md:hidden"
		href="/projects"
		title="Go to projects page"
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
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'projects'}
		href="/projects"
	>
		<Fa fw icon={faProjectDiagram} rotate={180} flip="vertical" />
		<div class="max-md:hidden">Projects</div>
	</a>
	<a
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'instruments'}
		href="/externalModules/instruments"
	>
		<Fa fw icon={faGuitar} />
		<div class="max-md:hidden">Instruments</div>
	</a>
	{#if hasJuceSupport === false}
		<a
			class="max-md:horizontal-tab md:vertical-tab"
			data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'plugin'}
			href="/plugin"
		>
			<Fa fw icon={faDownload} />
			<div class="max-md:hidden">Get the plugin</div>
		</a>
	{/if}
	<div class="flex-1 max-md:hidden"></div>

	{#if dev}
		<a
			class="max-md:horizontal-tab md:vertical-tab"
			data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'dev'}
			href="/dev"
		>
			<Fa fw icon={faComputer} />
			<div class="max-md:hidden">Dev</div>
		</a>
	{/if}
	<a
		class="max-md:horizontal-tab md:vertical-tab"
		data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'about'}
		href="/about"
	>
		<Fa fw icon={faQuestion} />
		<div class="max-md:hidden">About</div>
	</a>
	<UserButton />
</div>
