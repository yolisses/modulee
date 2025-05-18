<script lang="ts">
	import { faHeart } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getLikedExternalModulesContext } from './likedExternalModulesContext';

	interface Props {
		externalModuleId: string;
	}

	const { externalModuleId }: Props = $props();
	const likedExternalModulesContext = getLikedExternalModulesContext();

	let liked = $state(likedExternalModulesContext.likedExternalModules.has(externalModuleId));

	async function handleCLick() {
		liked = !liked;

		if (liked) {
			likedExternalModulesContext.likedExternalModules.add(externalModuleId);
		} else {
			likedExternalModulesContext.likedExternalModules.delete(externalModuleId);
		}

		await fetch(`/api/externalModules/${externalModuleId}/like`, {
			method: liked ? 'POST' : 'DELETE',
		});
	}
</script>

<button class="common-button" onclick={handleCLick}>
	<Fa fw icon={faHeart} color={liked ? 'oklch(64.5% .246 16.439)' : undefined} />
	{liked ? 'Liked' : 'Like'}
</button>
