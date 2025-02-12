<script lang="ts" generics="T">
	interface Props {
		value: T;
		text: string;
		onClick: (value: T) => void;
	}

	const { text, value, onClick }: Props = $props();

	function handleClick() {
		onClick(value);
	}
</script>

<button onclick={handleClick} class="common-button">
	{text}
</button>
