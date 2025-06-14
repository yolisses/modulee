<script lang="ts">
	import { page } from '$app/state';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import type { ExternalModuleData } from './ExternalModuleData';
	import LikeButton from './LikeButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const baseRouteContext = getBaseRouteContext();
	const { externalModuleData }: Props = $props();
</script>

<div class="border-b border-white/10 p-2 pb-6 last:border-none">
	<div class="flex flex-row items-center">
		<div class="flex-1">
			<a
				class="hover:underline"
				href="{baseRouteContext.baseRoute}/externalModules/{externalModuleData.id}?closePath={page.url}"
			>
				{externalModuleData.name}
			</a>
		</div>
		<LikeButton externalModuleId={externalModuleData.id} />
	</div>
	<div class="block max-h-10 overflow-hidden text-sm text-ellipsis text-white/75">
		{externalModuleData.description}
	</div>
	<div class="text-sm opacity-50">
		By
		<a
			class="hover:underline"
			href="{baseRouteContext.baseRoute}/users/{externalModuleData.userId}?closePath={page.url}"
		>
			{externalModuleData.user?.username}
		</a>
		• Created at {new Date(externalModuleData.createdAt).toLocaleDateString()}
		<!-- • Used {externalModuleData.usageCount} times  -->
		• Liked {externalModuleData.likeCount} times
	</div>
</div>
