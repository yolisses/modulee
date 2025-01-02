import type { NodeData } from '../NodeData';

export const devNodesData: NodeData[] = [
	{
		id: 'Qiu0TEWRxm5siwHw5X5oA5',
		inputs: [
			{ id: 'llhibJ9q2jL7xq8JIHPHnH', name: 'input1' },
			{ id: 'Lmr5u5oPwNSDg1fVWEeGri', name: 'input2' },
			{ id: 'NkoIM7njHyWeKIAMtST3YG', name: 'input3' },
		],
		outputs: [
			{ id: 'RMQsV4r4BlDdhUQuqpHI6B', name: 'output1' },
			{ id: 't0SytXtzjOrh0i56iJQsw9', name: 'output2' },
		],
		position: { x: 0, y: 0 },
	},
	{
		id: 'q5mZTharXy4VcuIs0nCK9c',
		inputs: [
			{ id: 'ruV5iYXvm0xkD55hXd8fvx', name: 'input1', connectedOutputId: 't0SytXtzjOrh0i56iJQsw9' },
			{ id: '4lJuJgrKr0Y4TbjnT2MU5l', name: 'input2' },
			{ id: 'nOORajxulQlHG4qmiD6nCF', name: 'input3' },
		],
		outputs: [
			{ id: 'jnzwAGONgNlTPSSaP5CTke', name: 'output1' },
			{ id: 'tHe0uuTlzmk3iLuEwDGFs9', name: 'output2' },
		],
		position: { x: 8, y: 8 },
	},
	// {
	// 	id: '2dnLGjCkHDAmyiVllBiWvu',
	// 	inputs: [
	// 		{ id: 'gJ5yfwibHVMHIHD6JRWlXw', name: 'input1' },
	// 		{ id: 'grhuk6RwbYyXewICBn3qoB', name: 'input2' },
	// 		{ id: 'rBd4Il2mrZPdt4tKpcgjY2', name: 'input3' },
	// 	],
	// 	outputs: [
	// 		{ id: 'swNlAiRYLdYYqrjYvglhGx', name: 'output1' },
	// 		{ id: 'wqR7FgbMbKRUGArK6qd7ej', name: 'output2' },
	// 	],
	// 	position: { x: 3, y: 5 },
	// },
];
