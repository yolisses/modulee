<script lang="ts">
	import { faDownload, faHeart } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModulesData: ExternalModuleData[];
	}

	const { externalModulesData }: Props = $props();

	function getHref(externalModuleData: ExternalModuleData) {
		return '/externalModule/' + externalModuleData.id;
	}
</script>

{#each externalModulesData as externalModulesData (externalModulesData.id)}
	<div class="rounded-md p-2">
		<div class="block overflow-hidden text-ellipsis whitespace-nowrap">
			{externalModulesData.name}
		</div>
		<div class="block max-h-10 overflow-hidden text-ellipsis text-sm text-white/75">
			{externalModulesData.description}
		</div>
		<div class="text-sm opacity-50">
			<a href="/users/{externalModulesData.userId}" class="hover:underline">
				By
				{externalModulesData.user.username}
			</a>
			• Used {externalModulesData.usageCount} times • Liked {externalModulesData.likeCount} times
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
{/each}
