<script lang="ts">
	import { devEffectsData } from './devEffectsData';
	import EffectList from './EffectList.svelte';
</script>

<div>
	<h1 class="text-lg font-medium">Effects</h1>
	<div class="overflow-auto">
		<EffectList effectsData={devEffectsData} />
	</div>
</div>
