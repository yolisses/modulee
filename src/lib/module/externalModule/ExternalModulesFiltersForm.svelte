<script lang="ts" generics="T extends ModuleType">
	import type { ModuleType } from '$lib/project/ModuleType';
	import { getProjectDataContextOrUndefined } from '$lib/project/ui/projectDataContext';
	import { faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';
	import type { Loader } from './Loader.svelte';

	interface Props {
		moduleType?: T;
		loader: Loader<ExternalModuleData<T>>;
		values: { text: string; sort: string; group: string; moduleType: string };
	}

	const { loader, moduleType, values = $bindable() }: Props = $props();
	const projectDataContext = getProjectDataContextOrUndefined();
</script>

<form
	action=""
	method="get"
	class="flex flex-col gap-2"
	onreset={loader.handleReset}
	onsubmit={loader.handleSubmit}
	onchange={loader.handleSubmit}
>
	<label class="flex flex-col">
		Text
		<input bind:value={values.text} type="text" class="common-input" name="text" />
	</label>
	{#if !moduleType}
		<label class="flex flex-col">
			Type
			<select bind:value={values.moduleType} class="common-input" name="moduleType">
				<option class="bg-zinc-800" value=""></option>
				<option class="bg-zinc-800" value="effect">Effect</option>
				<option class="bg-zinc-800" value="utility">Utility</option>
				<option class="bg-zinc-800" value="instrument">Instrument</option>
			</select>
		</label>
	{/if}
	<label class="flex flex-col">
		Sort by
		<select bind:value={values.sort} class="common-input" name="sort">
			<option class="bg-zinc-800" value=""></option>
			<option class="bg-zinc-800" value="likeCount">Likes</option>
			<option class="bg-zinc-800" value="createdAt">Most recent</option>
		</select>
	</label>
	<div>
		<div class="flex flex-col gap-2">
			<label class="common-button grow">
				<input id="effect" type="radio" value="all" bind:group={values.group} />
				All
			</label>
			<label class="common-button grow" title="Only external modules you liked">
				<input type="radio" id="instrument" value="liked" bind:group={values.group} />
				Liked
			</label>
			{#if projectDataContext?.projectData}
				<label class="common-button grow" title="Only external modules used in the current project">
					<input type="radio" id="utility" value="used" bind:group={values.group} />
					Used in project
				</label>
			{/if}
		</div>
	</div>
	<div class="mt-2 flex flex-row items-end justify-end gap-2">
		<button type="reset" class="common-button">
			<Fa fw icon={faEraser} />
			Clear
		</button>
		<button type="submit" class="primary-button">
			<Fa fw icon={faSearch} />
			Search
		</button>
	</div>
</form>
