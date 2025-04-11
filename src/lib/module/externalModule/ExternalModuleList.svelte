<script lang="ts">
	import { faDownload, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
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
		<div class="flex flex-row gap-2 text-sm">
			<a
				href="/users/{externalModulesData.userId}"
				class="flex flex-row items-center gap-1 hover:underline"
			>
				<Fa icon={faUser} />
				{externalModulesData.user.username}
			</a>
			<div class="hover-bg flex flex-row items-center gap-1 p-1">
				<Fa icon={faDownload} />
				{externalModulesData.usageCount}
			</div>
			<div class="hover-bg flex flex-row items-center gap-1 p-1">
				<Fa icon={faHeart} />
				{externalModulesData.likeCount}
			</div>
		</div>
		<div class="block max-h-10 overflow-hidden text-ellipsis text-sm text-white/75">
			{externalModulesData.description}
		</div>
	</div>
{/each}
