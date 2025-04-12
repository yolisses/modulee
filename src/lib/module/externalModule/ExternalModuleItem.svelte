<script lang="ts">
	import type { ExternalModuleData } from './ExternalModuleData';
	import LikeButton from './LikeButton.svelte';
	import UseButton from './UseButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
</script>

<div class="rounded-md p-2">
	<div class="block overflow-hidden text-ellipsis whitespace-nowrap">
		{externalModuleData.name}
	</div>
	<div class="block max-h-10 overflow-hidden text-ellipsis text-sm text-white/75">
		{externalModuleData.description}
	</div>
	<div class="text-sm opacity-50">
		By
		<a href="/users/{externalModuleData.userId}" class="hover:underline">
			{externalModuleData.user.username}
		</a>
		• Used {externalModuleData.usageCount} times • Liked {externalModuleData.likeCount} times
	</div>
	<div class="flex flex-row gap-2">
		<UseButton />
		<LikeButton />
	</div>
</div>
