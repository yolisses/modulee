<script lang="ts">
	import { ById } from '$lib/editor/ById';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { getOs } from './getOs';

	type OsOption = {
		id: string;
		name: string;
		icon: IconDefinition;
	};

	let os = $state<Os>('windows');
	const osOptions = ById.fromItems<OsOption>([
		{ id: 'windows', name: 'Windows', icon: faWindows },
		{ id: 'macos', name: 'MacOs', icon: faApple },
		{ id: 'linux', name: 'Linux', icon: faLinux },
	]);
	const osOption = $derived(osOptions.get(os));

	onMount(() => {
		os = getOs() || 'windows';
	});
</script>

<ListPageLayout title="Plugin">
	<div class="flex h-full flex-1 flex-col items-center justify-between gap-2">
		<div></div>
		<div class="flex flex-col items-center gap-2">
			<p>The Modulee audio plugin allows you to use it in your DAW</p>
			<a class="button primary-button" href="/download">
				<Fa icon={osOption.icon} />
				Download for {osOption.name}
			</a>
		</div>
		<div>
			<hr class="w-full border border-t border-white/10" />
			<div>Other options</div>
			<div class="flex flex-row gap-2">
				{#each osOptions.values().filter((osOption) => osOption.id !== os) as osOption}
					<a class="button common-button" href="/download">
						<Fa icon={osOption.icon} />
						Download for {osOption.name}
					</a>
				{/each}
			</div>
		</div>
	</div>
</ListPageLayout>
