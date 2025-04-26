<script lang="ts">
	interface Props {
		module: { name: string };
	}

	const { module }: Props = $props();
	const inputs = ['attack', 'decay', 'sustain', 'release'];
</script>

<div class="rounded border-1 border-white/10 p-2">
	{module.name}
	<div>
		{#each inputs as input}
			<label class="panel-grid grid gap-1">
				<div>{input}</div>
				<input type="range" />
				<input type="text" value={0.2} class="text-center" />
			</label>
		{/each}
	</div>
</div>

<style lang="postcss">
	@reference '../../app.css';

	.panel-grid {
		grid-template-columns: auto 8rem 2rem;
	}

	/********** Range Input Styles **********/
	/*Range Reset*/
	input[type='range'] {
		-webkit-appearance: none;
	}

	/*Range Reset*/
	input[type='range'] {
		@apply appearance-none bg-transparent active:cursor-grabbing;
	}

	/***** Chrome, Safari, Opera and Edge Chromium styles *****/
	/* slider track */
	input[type='range']::-webkit-slider-runnable-track {
		@apply h-2 rounded-full bg-white/10;
	}

	/* slider thumb */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
	}

	/* slider thumb */
	input[type='range']::-webkit-slider-thumb {
		@apply -mt-0.5 h-3 w-3 appearance-none rounded-full bg-blue-500;
	}

	/******** Firefox styles ********/
	/* slider track */
	input[type='range']::-moz-range-track {
		@apply h-2 rounded-full bg-white/10;
	}

	input[type='range']::-moz-range-progress {
		@apply h-2 rounded-full bg-blue-500;
	}

	input[type='range']::-webkit-slider-progress-track {
		@apply h-2 rounded-full bg-blue-500;
	}

	/* slider thumb */
	input[type='range']::-moz-range-thumb {
		border: none; /*Removes extra border that Firefox applies*/
	}

	/* slider thumb */
	input[type='range']::-moz-range-thumb {
		@apply -mt-0.5 h-3 w-3 appearance-none rounded-full bg-blue-500;
	}
</style>
