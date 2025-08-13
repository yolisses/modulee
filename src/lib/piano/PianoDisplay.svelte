<script lang="ts">
	import { range } from '$lib/fake/range';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { activePitchesContextKey } from './activePitchesContext';

	const activePitchesContext = getRequiredContext(activePitchesContextKey);

	const keys = range(10 * 12 + 8);

	function getIsBlack(key: number) {
		return [1, 3, 6, 8, 10].includes(key % 12);
	}
</script>

<div class="overflow-auto">
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<div class="relative flex min-w-fit flex-row">
		<div class="flex h-10 flex-1 flex-row">
			{#each keys as key}
				{#if !getIsBlack(key)}
					<button
						class="flex min-w-3 flex-1 flex-col justify-end text-xs text-black outline outline-black hover:bg-neutral-200 active:bg-blue-500"
						class:bg-white={!activePitchesContext.activePitches.has(key)}
						class:bg-blue-500={activePitchesContext.activePitches.has(key)}
					>
					</button>
				{/if}
			{/each}
		</div>
		<div class="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-3/4 flex-row">
			{#each keys as key}
				<div class="flex flex-1 flex-col items-center" class:self-start={!getIsBlack(key)}>
					{#if getIsBlack(key)}
						<button
							class="pointer-events-auto w-full flex-1 hover:bg-neutral-800"
							class:bg-black={!activePitchesContext.activePitches.has(key)}
							class:bg-blue-500={activePitchesContext.activePitches.has(key)}
						>
						</button>
					{/if}
				</div>
			{/each}
			<div class="flex flex-[0.5] flex-col items-center"></div>
		</div>
	</div>
</div>
