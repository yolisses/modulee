<script lang="ts">
	import '../../app.css';
	import '../../cookieConsent.css';
	import '../../inputTypeRange.css';
	import '../../prettyText.css';
	import { Contexts } from '$lib/shortcut/Contexts.svelte';
	import { dev } from '$app/environment';
	import { handleSignInResponse } from '$lib/session/handleSignInResponse';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { onMount, type Snippet } from 'svelte';
	import { page } from '$app/state';
	import { SESSION_COOKIE_NAME } from '$lib/session/SESSION_COOKIE_NAME';
	import { setBaseRouteContext } from '$lib/ui/baseRouteContext';
	import { setContextsContext } from '$lib/shortcut/contextsContext';
	import { setCopyDataContext } from '$lib/graph/copy/copyDataContext';
	import { setLikedExternalModulesContext } from '$lib/module/externalModule/likedExternalModulesContext';
	import { setShortcutHandlerContext } from '$lib/shortcut/shortcutHandlerContext';
	import { setUserDataContext } from '$lib/user/userDataContext';
	import { ShortcutHandler } from '$lib/shortcut/ShortcutHandler.svelte';
	import cookies from 'js-cookie';
	import ModalRootLayout from '$lib/ui/ModalRootLayout.svelte';
	import type { UserData } from '$lib/user/UserData';

	interface Props {
		children: Snippet;
		userData: UserData;
	}

	const { children, userData }: Props = $props();

	const contexts = new Contexts();
	setContextsContext({ contexts });

	const userDataContext = $state({ userData });
	setUserDataContext(userDataContext);

	const baseRouteContext = $state({ baseRoute: '' });
	setBaseRouteContext(baseRouteContext);

	$effect(() => {
		const url = new URL(page.url);
		const path = url.pathname;
		window.__JUCE__?.backend.emitEvent('setPath', { path });
	});

	// TODO check if it makes sense to not have a state here
	setCopyDataContext({ offset: 0 });

	let likedExternalModulesContext = $state({ likedExternalModules: new Set<string>() });
	setLikedExternalModulesContext(likedExternalModulesContext);

	$effect(() => {
		// observe user changes
		userData;
		fetch(`/api/likes`).then(async (res) => {
			if (res.ok) {
				const data = await res.json();
				likedExternalModulesContext.likedExternalModules = new Set(data);
			}
		});
	});

	onMount(() => {
		window.__JUCE__?.backend.addEventListener('signInResponse', (code: string) =>
			handleSignInResponse(code, userDataContext),
		);
	});

	// this solution is suboptimal, since it may require refreshing the page
	onMount(() => {
		const authToken = cookies.get(SESSION_COOKIE_NAME);
		if (authToken) {
			window.__JUCE__?.backend.emitEvent('setAuthToken', { authToken });
		}
	});

	const shortcutHandler = new ShortcutHandler();
	setShortcutHandlerContext({ shortcutHandler });

	onMount(() => {
		shortcutHandler.initialize();
		return () => shortcutHandler.destroy();
	});

	if (!dev) {
		injectSpeedInsights();
	}
</script>

<ModalRootLayout>
	{@render children()}
</ModalRootLayout>

<div id="sortable-invisible-element" class="hidden"></div>
