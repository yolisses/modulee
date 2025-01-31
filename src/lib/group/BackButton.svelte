<script lang="ts">
	import { page } from '$app/state';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let isActive = $state(false);
	let url = $state(page.url.pathname);

	// Receives a url like "/projects/projectId/.../groupIdN/"
	// and returns "/projects/projectId/.../groupIdN-1/"
	$effect(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);
		isActive = parts.length > 2;
		if (isActive) {
			parts.pop();
		}
		url = '/' + parts.join('/');
	});
</script>

<a href={url} aria-disabled={!isActive} class:disabled={!isActive} class="common-button">
	<Fa icon={faArrowLeft} />
</a>
