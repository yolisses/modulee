<script lang="ts">
	import { faGuitar, faProjectDiagram, faQuestion } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import UserButton from './UserButton.svelte';
	import { getHomeNavbarSelectionContext } from './homeNavbarSelectionContext';

	const homeNavbarSelectionContext = getHomeNavbarSelectionContext();
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
