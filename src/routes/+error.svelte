<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-screen flex-1 flex-col items-center justify-center gap-2 p-8">
	<div class="flex flex-1 flex-col items-center justify-end gap-2">
		<h1 class="text-xl">Sorry, we could not open this page.</h1>
		<a href="/" class="primary-button">Go home</a>
	</div>
	<div class="flex flex-1 flex-col items-center justify-center gap-2">
		<div>{page.status}</div>
		<div>{page.error?.message}</div>
	</div>
</div>
