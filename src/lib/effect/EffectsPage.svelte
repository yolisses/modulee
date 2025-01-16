<script lang="ts">
	import { devEffectsData } from './devEffectsData';
	import EffectList from './EffectList.svelte';
	import TextSearchInput from './TextSearchInput.svelte';
</script>

<div>
	<div class="flex-row items-center justify-between border-b border-white/10">
		<h1 class="pl-2 text-lg font-medium">Effects</h1>
		<TextSearchInput />
	</div>
	<EffectList effectsData={devEffectsData} />
</div>
