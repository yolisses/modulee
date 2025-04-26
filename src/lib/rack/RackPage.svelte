<script lang="ts">
	import { createId } from '$lib/data/createId';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const debugModules = [
		{ id: createId(), name: 'Module 1' },
		{ id: createId(), name: 'Module 2' },
		{ id: createId(), name: 'Module 3' },
		{ id: createId(), name: 'Module 4' },
		{ id: createId(), name: 'Module 5' },
		{ id: createId(), name: 'Module 6' },
	];
	const inputs = ['attack', 'decay', 'sustain', 'release'];
	const modules = debugModules;
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="flex w-full max-w-xl flex-row self-center">
		<h1 class="py-2 text-xl font-medium">Rack</h1>
		<div class="flex-1"></div>
		<button class="primary-button">
			<Fa icon={faPlus} />
			Add effect
		</button>
	</div>
	<div class="flex flex-row flex-wrap justify-center gap-1">
		{#each modules as module}
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
		{/each}
	</div>
</div>

<style>
	.panel-grid {
		grid-template-columns: auto 8rem 2rem;
	}
</style>
