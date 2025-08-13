<script lang="ts">
	import { range } from '$lib/fake/range';

	const octaves = 10;
	const whiteKeys = range(octaves * 7 + 5);
	const blackKeys = range(octaves * 7 + 5);

	function getIsBlack(key: number) {
		return [1, 2, 4, 5, 6].includes(key % 7);
	}
</script>

<div class="overflow-auto">
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<div class="relative flex min-w-fit flex-row">
		<div class="flex h-10 flex-1 flex-row">
			{#each whiteKeys as key}
				<button class="min-w-3 flex-1 bg-white outline outline-black"></button>
			{/each}
		</div>
		<div
			class="absolute inset-x-0 top-0 z-10 flex h-3/4 flex-row"
			style="transform: translateX(-{100 / blackKeys.length / 2}%);"
		>
			{#each blackKeys as key}
				{#if key !== -1}
					<div class="flex flex-1 flex-col items-center" class:self-start={!getIsBlack(key)}>
						{#if getIsBlack(key)}
							<button class="w-2/3 flex-1 bg-black"></button>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
