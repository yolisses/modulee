<script>
	import GoogleSignInButton from './GoogleSignInButton.svelte';
</script>

<div class="flex min-h-[100dvh] flex-col items-center">
	<div class="flex w-full max-w-xl flex-1 flex-col gap-4 p-4">
		<div class="flex h-10 flex-row items-center justify-between gap-2">
			<h1 class="pl-2 text-xl font-medium">Accounts</h1>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<GoogleSignInButton />
			</div>
		</div>
		<div class="h-10"></div>
	</div>
</div>
