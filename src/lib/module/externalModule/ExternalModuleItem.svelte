<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { baseRouteContextKey } from '$lib/ui/baseRouteContext';
	import type { ExternalModuleData } from './ExternalModuleData';
	import LikeButton from './LikeButton.svelte';
	import UseExternalModuleButton from './UseExternalModuleButton.svelte';

	interface Props {
		externalModuleData: ExternalModuleData;
		handleModuleHover?: (externalModuleData: ExternalModuleData) => void;
	}

	const { externalModuleData, handleModuleHover }: Props = $props();
	const baseRouteContext = getRequiredContext(baseRouteContextKey);
</script>

<div
	class="rounded border-b border-white/10 p-2 last:border-none hover:bg-white/10"
	onpointerenter={() => handleModuleHover?.(externalModuleData)}
>
	<a
		class="hover:underline"
		href="{baseRouteContext.baseRoute}/externalModules/{externalModuleData.id}"
	>
		{externalModuleData.name}
	</a>
	<div class="block max-h-10 overflow-hidden text-sm text-ellipsis text-white/75">
		{externalModuleData.description}
	</div>
	<div class="text-sm opacity-50">
		Created at {new Date(externalModuleData.createdAt).toLocaleDateString()}
		• By
		<a
			class="hover:underline"
			href="{baseRouteContext.baseRoute}/users/{externalModuleData.userId}"
		>
			{externalModuleData.user?.username}
		</a>
		• Liked {externalModuleData.likeCount} times
	</div>
	<div class="flex flex-row">
		<UseExternalModuleButton {externalModuleData} />
		<LikeButton externalModuleId={externalModuleData.id} />
	</div>
</div>
