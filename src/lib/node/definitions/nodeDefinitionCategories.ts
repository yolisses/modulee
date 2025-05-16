import type { NodeDefinitionCategory } from './NodeDefinitionCategory';

// TODO consider normalizing it
//
// TODO consider creating a type for node type input
export const nodeDefinitionCategories: NodeDefinitionCategory[] = [
    {
        name: "math",
        nodeDefinitions: [
            {
                category: "math",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input1",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 1,
                        isBoolean: false,
                        key: "input2",
                        max: 4,
                        min: -4
                    }
                ],
                name: "AddNode"
            },
            {
                category: "math",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input1",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 2,
                        isBoolean: false,
                        key: "input2",
                        max: 4,
                        min: -4
                    }
                ],
                name: "ModuloNode"
            },
            {
                category: "math",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input1",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 2,
                        isBoolean: false,
                        key: "input2",
                        max: 4,
                        min: -4
                    }
                ],
                name: "DivideNode"
            },
            {
                category: "math",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input1",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input2",
                        max: 4,
                        min: -4
                    }
                ],
                name: "GreaterNode"
            },
            {
                category: "math",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input1",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 1,
                        isBoolean: false,
                        key: "input2",
                        max: 4,
                        min: -4
                    }
                ],
                name: "SubtractNode"
            },
            {
                category: "math",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input1",
                        max: 2,
                        min: 0
                    },
                    {
                        defaultValue: 2,
                        isBoolean: false,
                        key: "input2",
                        max: 2,
                        min: 0
                    }
                ],
                name: "MultiplyNode"
            }
        ]
    },
    {
        name: "basic",
        nodeDefinitions: [
            {
                category: "basic",
                defaultExtras: {},
                inputs: [],
                name: "GateNode"
            },
            {
                category: "basic",
                defaultExtras: {},
                inputs: [],
                name: "TimeNode"
            },
            {
                category: "basic",
                defaultExtras: {},
                inputs: [],
                name: "PitchNode"
            },
            {
                category: "basic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 261.625565,
                        isBoolean: false,
                        key: "frequency",
                        max: 22000,
                        min: 0
                    }
                ],
                name: "PhaseNode"
            },
            {
                category: "basic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 60,
                        isBoolean: false,
                        key: "pitch",
                        max: 127,
                        min: 0
                    }
                ],
                name: "FrequencyNode"
            },
            {
                category: "basic",
                defaultExtras: {
                    value: 1
                },
                inputs: [],
                name: "ConstantNode"
            },
            {
                category: "basic",
                defaultExtras: {
                    value: 0
                },
                inputs: [],
                name: "ControlNode"
            },
            {
                category: "basic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 0,
                        isBoolean: true,
                        key: "trigger",
                        max: 1,
                        min: 0
                    }
                ],
                name: "HoldNode"
            },
            {
                category: "basic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0.01,
                        isBoolean: false,
                        key: "attack",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 0.1,
                        isBoolean: false,
                        key: "decay",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 0.7,
                        isBoolean: false,
                        key: "sustain",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 0.2,
                        isBoolean: false,
                        key: "release",
                        max: 1,
                        min: 0
                    }
                ],
                name: "EnvelopeNode"
            }
        ]
    },
    {
        name: "filter",
        nodeDefinitions: [
            {
                category: "filter",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 1000,
                        isBoolean: false,
                        key: "frequency",
                        max: 22000,
                        min: 0
                    },
                    {
                        defaultValue: 0.7071067811865476,
                        isBoolean: false,
                        key: "resonance",
                        max: 1,
                        min: 0
                    }
                ],
                name: "AllPassNode"
            },
            {
                category: "filter",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 1000,
                        isBoolean: false,
                        key: "frequency",
                        max: 22000,
                        min: 0
                    },
                    {
                        defaultValue: 0.7071067811865476,
                        isBoolean: false,
                        key: "resonance",
                        max: 1,
                        min: 0
                    }
                ],
                name: "LowPassNode"
            },
            {
                category: "filter",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 1000,
                        isBoolean: false,
                        key: "frequency",
                        max: 22000,
                        min: 0
                    },
                    {
                        defaultValue: 0.7071067811865476,
                        isBoolean: false,
                        key: "resonance",
                        max: 1,
                        min: 0
                    }
                ],
                name: "HighPassNode"
            },
            {
                category: "filter",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 1000,
                        isBoolean: false,
                        key: "frequency",
                        max: 22000,
                        min: 0
                    },
                    {
                        defaultValue: 0.7071067811865476,
                        isBoolean: false,
                        key: "resonance",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 1,
                        isBoolean: false,
                        key: "gain",
                        max: 20,
                        min: -20
                    }
                ],
                name: "PeakNode"
            }
        ]
    },
    {
        name: "random",
        nodeDefinitions: [
            {
                category: "random",
                defaultExtras: {},
                inputs: [],
                name: "NoiseNode"
            },
            {
                category: "random",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "value",
                        max: 4,
                        min: -4
                    }
                ],
                name: "RandomFromValueNode"
            }
        ]
    },
    {
        name: "module",
        nodeDefinitions: [
            {
                category: "module",
                defaultExtras: {},
                inputs: [],
                name: "ModuleNode"
            },
            {
                category: "module",
                defaultExtras: {},
                inputs: [],
                name: "ModuleVoicesNode"
            },
            {
                category: "module",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input",
                        max: 4,
                        min: -4
                    }
                ],
                name: "OutputNode"
            },
            {
                category: "module",
                defaultExtras: {
                    name: "new input"
                },
                inputs: [],
                name: "InputNode"
            }
        ]
    },
    {
        name: "wave",
        nodeDefinitions: [
            {
                category: "wave",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "phase",
                        max: 1,
                        min: 0
                    }
                ],
                name: "SineWaveNode"
            },
            {
                category: "wave",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "phase",
                        max: 1,
                        min: 0
                    }
                ],
                name: "SawtoothWaveNode"
            },
            {
                category: "wave",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "phase",
                        max: 1,
                        min: 0
                    }
                ],
                name: "TriangleWaveNode"
            },
            {
                category: "wave",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "phase",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "duty_cycle",
                        max: 1,
                        min: 0
                    }
                ],
                name: "PulseWaveNode"
            }
        ]
    },
    {
        name: "logic",
        nodeDefinitions: [
            {
                category: "logic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: true,
                        key: "input",
                        max: 1,
                        min: 0
                    }
                ],
                name: "NotNode"
            },
            {
                category: "logic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: true,
                        key: "input1",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 0,
                        isBoolean: true,
                        key: "input2",
                        max: 1,
                        min: 0
                    }
                ],
                name: "OrNode"
            },
            {
                category: "logic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: true,
                        key: "input1",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 0,
                        isBoolean: true,
                        key: "input2",
                        max: 1,
                        min: 0
                    }
                ],
                name: "AndNode"
            },
            {
                category: "logic",
                defaultExtras: {},
                inputs: [
                    {
                        defaultValue: 0,
                        isBoolean: true,
                        key: "condition",
                        max: 1,
                        min: 0
                    },
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input1",
                        max: 4,
                        min: -4
                    },
                    {
                        defaultValue: 0,
                        isBoolean: false,
                        key: "input2",
                        max: 4,
                        min: -4
                    }
                ],
                name: "IfNode"
            }
        ]
    }
];
