<script lang="ts">
	import { enhance } from '$app/forms';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { InstrumentData } from './InstrumentData';

	interface Props {
		instrumentData: InstrumentData;
	}

	const { instrumentData }: Props = $props();

	function handleClick() {}
</script>

<form action="/projects?/createFromExternalModule" method="post" use:enhance>
	<input type="hidden" name="externalModuleId" value={instrumentData.id} />
	<button class="common-button" onclick={handleClick}>
		<Fa fw icon={faDownload} />
		Use
	</button>
</form>
