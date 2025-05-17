<script lang="ts">
	import { faHeart } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		externalModuleId: string;
	}

	const { externalModuleId }: Props = $props();

	let liked = $state(false);

	async function handleCLick() {
		liked = !liked;
		console.log(externalModuleId);
		const res = await fetch(`/api/externalModules/${externalModuleId}/like`, { method: 'POST' });
		const item = await res.json();
		console.log(item);
	}
</script>

<button class="common-button" onclick={handleCLick}>
	<Fa fw icon={faHeart} color={liked ? 'oklch(63.7% 0.237 25.331)' : undefined} />
	{liked ? 'Liked' : 'Like'}
</button>
