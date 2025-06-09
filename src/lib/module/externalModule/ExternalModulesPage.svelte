<script lang="ts">
	import { page } from '$app/state';
	import type { ModuleType } from '$lib/project/ModuleType';
	import { getProjectDataContextOrUndefined } from '$lib/project/projectDataContext';
	import { getUserDataContext } from '$lib/user/userDataContext';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleItem from './ExternalModuleItem.svelte';
	import ExternalModulesFiltersForm from './ExternalModulesFiltersForm.svelte';
	import InfiniteList from './InfiniteList.svelte';
	import { Loader } from './Loader.svelte';

	interface Props {
		title: string;
		moduleType?: ModuleType;
	}

	const userDataContext = getUserDataContext();
	const { title, moduleType }: Props = $props();
	let values = $state({ text: '', sort: '', group: '' });
	const projectDataContext = getProjectDataContextOrUndefined();
	const closePath = $derived(page.url.searchParams.get('closePath'));

	function getPath(loader: Loader<ExternalModuleData>) {
		const queryParams = new URLSearchParams();
		const { text, sort, group } = values;

		if (text) {
			queryParams.append('text', text);
		}

		if (sort) {
			queryParams.append('sort', sort);
		}

		if (moduleType) {
			queryParams.append('moduleType', moduleType);
		}

		if (group === 'liked') {
			queryParams.append('likedBy', userDataContext.userData.id);
		}

		if (projectDataContext?.projectData && group === 'used') {
			queryParams.append('usedIn', projectDataContext.projectData.id);
		}

		if (loader.cursor) queryParams.append('cursor', loader.cursor);

		let path = '/api/externalModules';
		if (queryParams.size > 0) {
			path += '?' + queryParams.toString();
		}
		return path;
	}
	const loader = new Loader(getPath);
</script>

<svelte:head>
	<title>{title} - Modulee</title>
</svelte:head>

<div class="flex flex-row border-b-2 border-black/50">
	<h1 class="px-2 py-2 text-xl font-medium">{title}</h1>
	<div class="flex flex-1"></div>
	{#if closePath}
		<a href={closePath} class="common-button">
			<Fa icon={faTimes} />
			Close
		</a>
	{/if}
</div>
<div class="flex flex-1 flex-row overflow-hidden">
	<div class="border-r-2 border-black/50 p-4">
		<ExternalModulesFiltersForm bind:values {loader} />
	</div>
	<div class="flex-1 overflow-auto">
		<div class="flex h-[100dvh] flex-col items-center">
			<div class="flex w-full max-w-xl flex-col gap-4 p-2">
				<InfiniteList {loader}>
					{#snippet children(externalModuleData: ExternalModuleData)}
						<ExternalModuleItem {externalModuleData} />
					{/snippet}
				</InfiniteList>
			</div>
		</div>
	</div>
</div>
