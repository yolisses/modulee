<script lang="ts">
	import type { EffectData } from './EffectData';
	import EffectItem from './EffectItem.svelte';

	interface Props {
		effectsData: EffectData[];
	}

	const { effectsData }: Props = $props();
</script>

{#each effectsData as effectData (effectData.id)}
	<EffectItem {effectData} />
{/each}
