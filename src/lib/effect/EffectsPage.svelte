<script lang="ts">
	import { devEffectsData } from './devEffectsData';
	import EffectList from './EffectList.svelte';
	import TextSearchInput from './TextSearchInput.svelte';
</script>

<div class="flex-row items-center justify-between border-b border-white/10">
	<h1 class="pl-2 text-lg font-medium">Effects</h1>
	<TextSearchInput />
</div>
<div class="overflow-auto">
	<EffectList effectsData={devEffectsData} />
</div>
