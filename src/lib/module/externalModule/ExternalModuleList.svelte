<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import DeleteExternalModuleButton from './DeleteExternalModuleButton.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModulesData: ExternalModuleData[];
	}

	const { externalModulesData }: Props = $props();

	function getHref(externalModuleData: ExternalModuleData) {
		return '/externalModule/' + externalModuleData.id;
	}
</script>

<BasicList values={externalModulesData} {getId} {getName} {getHref}>
	{#snippet buttons(value)}
		<DeleteExternalModuleButton externalModuleId={value.id} />
	{/snippet}
</BasicList>
