<script lang="ts">
	import type { EffectData } from './EffectData';

	interface Props {
		effectData: EffectData;
	}

	const { effectData }: Props = $props();
</script>

<button class="common-button">
	{effectData.name}
</button>
