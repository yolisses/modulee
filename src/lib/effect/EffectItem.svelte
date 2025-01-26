<script lang="ts">
	import SimpleItem from '$lib/ui/SimpleItem.svelte';
	import type { EffectData } from './EffectData';

	interface Props {
		effectData: EffectData;
	}

	const { effectData }: Props = $props();
</script>

<SimpleItem route="/effects/[id]" item={effectData}></SimpleItem>
