<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import { faCalendarAlt, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import DeleteExternalModuleButton from './DeleteExternalModuleButton.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';
	import LikeButton from './LikeButton.svelte';
	import UseExternalModuleButton from './UseExternalModuleButton.svelte';

	interface Props {
		showCloseButton: boolean;
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData, showCloseButton }: Props = $props();
</script>

<ListPageLayout title={externalModuleData.name} {showCloseButton}>
	{#snippet badges()}
		<div class="self-center rounded bg-white/10 px-2 text-sm">
			{externalModuleData.moduleType}
		</div>
	{/snippet}
	<div class="flex flex-col gap-4">
		<div class="flex flex-row">
			<UseExternalModuleButton {externalModuleData} />
			<LikeButton externalModuleId={externalModuleData.id} />
			<DeleteExternalModuleButton />
		</div>
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
			{#if externalModuleData.description}
				<h2 class="opacity-50">Description</h2>
				{#each externalModuleData.description?.split('\n') as text}
					<p>{text}</p>
				{/each}
			{:else}
				<h2 class="opacity-50">No description</h2>
			{/if}
		</div>
	</div>
</ListPageLayout>
