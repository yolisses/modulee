<script lang="ts">
	import { getProjectDataContextOrUndefined } from '$lib/project/projectDataContext';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import UseEffectButton from '../../effect/UseEffectButton.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';
	import LikeButton from './LikeButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const baseRouteContext = getBaseRouteContext();
	const projectDataContext = getProjectDataContextOrUndefined();
</script>

<ListPageLayout title={externalModuleData.name}>
	{#snippet badges()}
		<a class="rounded bg-white/10 px-2 text-sm" href="{baseRouteContext.baseRoute}/externalModules">
			External module
		</a>
	{/snippet}
	{#snippet topChildren()}
		<LikeButton externalModuleId={externalModuleData.id} />
		<!-- TODO implement condition here -->
		{#if projectDataContext}
			<UseEffectButton {externalModuleData} />
		{/if}
	{/snippet}
	<div class="flex flex-col gap-4">
		<div class="flex flex-row justify-between gap-2">
			<div>
				By
				<a href="/users/{externalModuleData.userId}" class="hover:underline">
					{externalModuleData.user?.username}
				</a>
			</div>
			<div>
				Created at {new Date(externalModuleData.createdAt).toLocaleDateString()}
			</div>
			<div>
				Liked {externalModuleData.likeCount} times
			</div>
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
