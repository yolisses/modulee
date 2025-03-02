<script lang="ts">
	import { page } from '$app/state';
	import type { AudioBackend } from '$lib/engine/AudioBackend';
	import {
		setAudioBackendContext,
		type AudioBackendContext,
	} from '$lib/engine/audioBackendContext';
	import { setIsMutedContext, type IsMutedContext } from '$lib/engine/isMutedContexts';
	import { JuceAudioBackend } from '$lib/engine/JuceAudioBackend';
	import { WasmAudioBackend } from '$lib/engine/WasmAudioBackend';
	import { WebMidiBackend } from '$lib/engine/WebMidiBackend';
	import { onMount, type Snippet } from 'svelte';
	import { IndexedDBProjectsRepository } from './IndexedDBProjectsRepository.svelte';
	import { JuceProjectsRepository } from './JuceProjectsRepository.svelte';
	import type { ProjectsRepository } from './ProjectsRepository';
	import {
		setProjectsRepositoryContext,
		type ProjectsRepositoryContext,
	} from './projectsRepositoryContext';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	const audioBackendContext: AudioBackendContext = $state({});
	setAudioBackendContext(audioBackendContext);

	const isMutedContext: IsMutedContext = $state({ isMuted: false });
	setIsMutedContext(isMutedContext);

	const projectsRepositoryContext: ProjectsRepositoryContext = $state({});
	setProjectsRepositoryContext(projectsRepositoryContext);

	$effect(() => {
		const { isMuted } = isMutedContext;
		const { audioBackend } = audioBackendContext;
		audioBackend?.setIsMuted(isMuted);
	});

	onMount(() => {
		let audioBackend: AudioBackend;
		let webMidiBackend: WebMidiBackend | undefined;

		if (JuceAudioBackend.canBeCreated()) {
			audioBackend = new JuceAudioBackend();
		} else {
			audioBackend = new WasmAudioBackend();
			webMidiBackend = new WebMidiBackend(audioBackend);
			webMidiBackend.initialize();
		}

		audioBackendContext.audioBackend = audioBackend;

		return () => {
			audioBackend.destroy();
			webMidiBackend?.destroy();
		};
	});

	onMount(() => {
		let projectsRepository: ProjectsRepository;

		if (JuceProjectsRepository.canBeCreated()) {
			projectsRepository = new JuceProjectsRepository();
		} else {
			projectsRepository = new IndexedDBProjectsRepository();
		}

		projectsRepository.initialize();
		projectsRepositoryContext.projectsRepository = projectsRepository;
	});

	$effect(() => {
		const url = new URL(page.url);
		const path = url.pathname;
		window.__JUCE__?.backend.emitEvent('setPath', { path });
	});
</script>

{@render children()}
