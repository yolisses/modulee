<script lang="ts">
	import type { Command } from './Command';

	interface Props {
		command: Command;
	}

	const { command }: Props = $props();
</script>

<!-- {command.constructor.name} -->
<div class="bg-gray-500">
	{command.id}
</div>
