<script lang="ts">
	import type { CommandClass } from '$lib/commands/CommandClass';
	import { commandClasses } from '$lib/commands/commandClasses';
	import { commandNames } from '$lib/commands/commandNames';
	import BasicList from '$lib/ui/BasicList.svelte';

	let values = commandClasses;

	function getName(commandClass: CommandClass) {
		return commandNames[commandClass.name];
	}

	function handleClick() {}
</script>

<div
	class="fixed top-0 flex max-h-[50vh] max-w-[50vw] flex-col gap-2 rounded border border-black bg-zinc-800 p-2"
>
	<input type="text" class="rounded border border-white/20 bg-transparent p-2" />
	<div class="overflow-auto">
		<BasicList {values} getId={(commandClass) => commandClass} {getName} onClick={handleClick} />
	</div>
</div>
