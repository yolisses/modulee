import type { GraphData } from '$lib/data/GraphData';
import type { ExternalModuleData } from './ExternalModuleData';

export const debugExternalModulesData = [
	{
		id: 'debug1',
		projectId: 'debugProject1',
		version: { major: 1, minor: 0, patch: 0 },
		description: 'This is a debug module for testing purposes.',
		name: 'Debug Module 1',
		graph: {
			nodes: [],
			connections: [],
			internalModules: [],
			externalModuleReferences: [],
			mainInternalModuleId: 'debugInternalModule1',
		} as GraphData,
	},
	{
		id: 'debug2',
		projectId: 'debugProject2',
		version: { major: 99, minor: 99, patch: 99 },
		name: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui ad, iste quis incidunt alias ipsam qui',
		graph: {
			nodes: [],
			connections: [],
			internalModules: [],
			externalModuleReferences: [],
			mainInternalModuleId: 'debugInternalModule1',
		},
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem unde distinctio id inventore eos itaque fugit voluptas cumque libero, error odio autem repudiandae mollitia quod odit dicta aliquid facere aspernatur?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste deleniti delectus sunt nesciunt quidem voluptatem minus molestias fugit doloribus sint? Fugit ea quas beatae laborum magni asperiores, cupiditate saepe. Nihil!
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis aliquid necessitatibus omnis odio suscipit nobis consequatur eius molestias ut, ipsam illum officia nulla voluptates, iusto voluptate doloribus tenetur, qui quae.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, incidunt dolores nesciunt sapiente aut voluptates asperiores animi. Eaque molestiae incidunt ipsa at porro, neque culpa eos dolorum aliquid minima. Exercitationem.
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet asperiores voluptatem laudantium ab magnaed`,
	},
	{
		id: 'debug3',
		projectId: 'debugProject3',
		version: { major: 1, minor: 0, patch: 0 },
		description: `The Luscious, Velvety Ambience You've Been Craving
Step into a world of rich, dreamy reverberation with Sweet Reverb, the ultimate plugin for adding warmth, depth, and a touch of magic to your tracks. Designed for producers, mixers, and sound designers who crave smooth, natural decays with a hint of vintage sweetness, this reverb delivers an irresistibly lush soundscape.
Features:
Silky Smooth Tails - No harsh digital artifacts, just buttery-smooth decay that melts into your mix.
Vintage-Inspired Modes - Choose from classic plate, spring, and hall emulations with a warm, analog vibe.
Sweetness Control - Dial in the perfect amount of harmonic richness, from subtle shimmer to euphoric saturation.
3D Width Modulation - Adds subtle movement to your reverb tails for a more immersive, spatial experience.
Low-CPU Magic - Ultra-efficient processing that sounds expensive without taxing your system.
Whether you're drenching vocals in ethereal ambience, giving guitars a spacious glow, or adding depth to electronic beats, Sweet Reverb makes everything sound… well, sweeter.
"Like pouring honey on your sound." - Fake Audio Magazine`,
		name: 'Sweet Reverb',
		graph: {
			nodes: [],
			connections: [],
			internalModules: [],
			externalModuleReferences: [],
			mainInternalModuleId: 'debugInternalModule1',
		},
	},
] as ExternalModuleData[];
