# Node Types

Modulee uses a small set of nodes that users can combine to create modules of
increasing complexity. Below is a list of node types, grouped by category,
describing what each does.

Some nodes have boolean inputs or output. It means they are only interpreted as
one of two options: true or false. A boolean input value is true if it is
greater than 0.5, and false otherwise. A boolean output value is 1 for true and
0 to false.

## Math

- **Add**: Adds two numbers together.
- **Modulo**: Finds the remainder after dividing one number by another.
- **Divide**: Divides one number by another.
- **Greater**: Outputs true the first value is greater than the second, and
  false otherwise.
- **Subtract**: Subtracts one number from another.
- **Multiply**: Multiplies two numbers.

## Basic

- **Gate**: Outputs true if the current note is pressed. In a voice module only
  the note that created the module is considered.
- **Time**: Outputs the current time since the module creation.
- **Pitch**: Outputs the current note MIDI pitch.
- **Phase**: Outputs a time varying phase for a frequency.
- **Frequency**: Outputs the correspondent frequency for a MIDI pitch.
- **Constant**: Outputs a specified value.
- **Hold**: Outputs the input at the moment the trigger input become true.
- **Delay**: Delays a value based on a time input. It has a maximum time input
  to prevent wasting all device's memory.
- **Envelope**: Creates an envelope signal using attack, decay, sustain, and
  release parameters.

## Filter

- **All-pass**: Passes all frequencies equally, modifies phase.
- **Low-pass**: Attenuates high frequencies, passes low frequencies.
- **High-pass**: Attenuates low frequencies, passes high frequencies.
- **Peak**: Attenuates specific frequency, passes others.

## Random

- **Noise**: Outputs random noise.
- **Random from value**: Outputs a fixed random value based on an input.

## Module

- **Module**: Creates module instance.
- **Module voices**: Creates a module instance for each note. Outputs the the
  sum of the module instance outputs.
- **Output**: Sets the current module output value.
- **Input**: Defines an input for the module it is contained in. The minimum,
  maximum and default values can when unconnected can be customized.
- **Audio input**: Defines an audio input, which is auto connected in the rack
  view.

## Wave

- **Sine wave**: Outputs a sine wave based on a phase input.
- **Sawtooth wave**: Outputs a sawtooth wave based on a phase input.
- **Triangle wave**: Outputs a triangle wave based on a phase input.
- **Pulse wave**: Outputs a pulse wave based on a phase input and duty cycle.

## Logic

- **Not**: Inverts a boolean input (true becomes false, false becomes true).
- **Or**: Outputs true if either of two inputs is true.
- **And**: Outputs true only if both inputs are true.
- **If**: Outputs the first value if condition is true and the the second value
  if false.
