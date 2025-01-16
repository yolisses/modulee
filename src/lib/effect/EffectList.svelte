<script lang="ts">
	import type { EffectData } from './EffectData';
	import EffectItem from './EffectItem.svelte';

	interface Props {
		effectsData: EffectData[];
	}

	const { effectsData }: Props = $props();
</script>

<div>
	{#each effectsData as effectData (effectData.id)}
		<EffectItem {effectData} />
	{/each}
</div>
