<script lang="ts">
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { InstrumentData } from './InstrumentData';

	interface Props {
		instrumentData: InstrumentData;
	}

	const { instrumentData }: Props = $props();

	function handleClick() {
		// TODO
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Use
</button>
