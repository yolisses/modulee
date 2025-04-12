<script lang="ts">
	import { faDownload, faHeart } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';

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
		<button class="common-button">
			<Fa icon={faDownload} />
			Use
		</button>
		<button class="common-button">
			<Fa icon={faHeart} />
			Like
		</button>
	</div>
</div>
