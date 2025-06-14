<script lang="ts" generics="T extends ModuleType">
	import type { ModuleType } from '$lib/project/ModuleType';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import type { Snippet } from 'svelte';
	import type { ExternalModuleData } from './ExternalModuleData';
	import LikeButton from './LikeButton.svelte';

	interface Props {
		buttons: Snippet<[ExternalModuleData<T>]>;
		externalModuleData: ExternalModuleData<T>;
	}

	const baseRouteContext = getBaseRouteContext();
	const { buttons, externalModuleData }: Props = $props();
</script>

<div class="border-b border-white/10 p-2 pb-6 last:border-none">
	<div class="flex flex-row items-center">
		<div class="flex-1">
			<a
				class="hover:underline"
				href="{baseRouteContext.baseRoute}/externalModules/{externalModuleData.id}"
			>
				{externalModuleData.name}
			</a>
		</div>
		<LikeButton externalModuleId={externalModuleData.id} />
		{@render buttons?.(externalModuleData)}
	</div>
	<div class="block max-h-10 overflow-hidden text-sm text-ellipsis text-white/75">
		{externalModuleData.description}
	</div>
	<div class="text-sm opacity-50">
		By
		<a href="/users/{externalModuleData.userId}" class="hover:underline">
			{externalModuleData.user?.username}
		</a>
		• Created at {new Date(externalModuleData.createdAt).toLocaleDateString()}
		<!-- • Used {externalModuleData.usageCount} times  -->
		• Liked {externalModuleData.likeCount} times
	</div>
</div>
