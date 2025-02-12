<script lang="ts" generics="T">
	interface Props {
		value: T;
		text: string;
		href: string;
		onClick: (value: T) => void;
	}

	const { text, value, href, onClick }: Props = $props();

	function handleClick() {
		onClick(value);
	}
</script>

<a {href} onclick={handleClick} class="common-button">
	{text}
</a>
