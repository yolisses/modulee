<script lang="ts">
	import type { NodeType } from './NodeType';

	interface Props {
		nodeType: NodeType;
		closeModal: () => void;
	}

	const { nodeType, closeModal }: Props = $props();

	function handleClick() {
		closeModal();
	}
</script>

<button onclick={handleClick} class="common-button">
	{nodeType.name}
</button>
