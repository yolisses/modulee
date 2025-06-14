<script lang="ts">
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		useInNodeId: string;
	}

	const { useInNodeId }: Props = $props();
</script>

<button class="common-button">
	<Fa icon={faDownload} />
	Use
</button>
