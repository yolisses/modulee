<script lang="ts">
	import TextSearchInput from '$lib/effect/TextSearchInput.svelte';
</script>

<div class="flex-row items-center justify-between border-b border-black">
	<h1 class="pl-2 text-lg font-medium">Instruments</h1>
	<TextSearchInput />
</div>
<div class="overflow-auto">
	< effectsData={devEffectsData} />
</div>
