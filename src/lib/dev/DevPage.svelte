<script>
	import Connection from './Connection.svelte';
	import { ConnectionHandler } from './ConnectionHandler.svelte';
	import Connector from './Connector.svelte';

	const connectionHandler = new ConnectionHandler();
</script>

<div class="h-[300px] w-[300px] overflow-auto border">
	<div class="relative flex h-[600px] w-[600px] touch-pan-x touch-pan-y flex-col gap-10">
		<Connector {connectionHandler} id="1" />
		<Connector {connectionHandler} id="2" />
		{#if connectionHandler.startPosition && connectionHandler.endPosition}
			<Connection
				endPosition={connectionHandler.endPosition}
				startPosition={connectionHandler.startPosition}
			/>
			here
		{/if}
	</div>
</div>
<div>start {connectionHandler.start}</div>
<div>start position {connectionHandler.startPosition}</div>
<div>end {connectionHandler.end}</div>
<div>end position {connectionHandler.endPosition}</div>
