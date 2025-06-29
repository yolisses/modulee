<script lang="ts">
	import { getProjectDataContextOrUndefined } from '$lib/project/ui/projectDataContext';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import { faCalendarAlt, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import LikeButton from './LikeButton.svelte';
	import UseExternalModuleButton from './UseExternalModuleButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const projectDataContext = getProjectDataContextOrUndefined();
</script>

<ListPageLayout title={externalModuleData.name}>
	{#snippet badges()}
		<div class="self-center rounded bg-white/10 px-2 text-sm">
			{externalModuleData.moduleType}
		</div>
	{/snippet}
	{#snippet topChildren()}
		<LikeButton externalModuleId={externalModuleData.id} />
		<UseExternalModuleButton {externalModuleData} />
	{/snippet}
	<div class="flex flex-col gap-4">
		<div class="flex flex-row items-center gap-2">
			<Fa icon={faUser} class="opacity-50" />
			<span>
				By
				<a href="/users/{externalModuleData.userId}" class="hover:underline">
					{externalModuleData.user?.username}
				</a>
			</span>
		</div>
		<div class="flex flex-row items-center gap-2">
			<Fa icon={faCalendarAlt} class="opacity-50" />
			Created at {new Date(externalModuleData.createdAt).toLocaleDateString()}
		</div>
		<div class="flex flex-row items-center gap-2">
			<Fa icon={faHeart} class="opacity-50" />
			Liked {externalModuleData.likeCount} times
		</div>
		<div class="flex flex-col gap-2">
			<h2 class="opacity-50">Description</h2>
			{#if externalModuleData.description}
				{#each externalModuleData.description?.split('\n') as text}
					<p>{text}</p>
				{/each}
			{/if}
		</div>
	</div>
</ListPageLayout>
