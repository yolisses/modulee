# Process

`process` is a module for creating the desired behaviors that aren't fundamental
enough to be part of the engine. For instance, the engine can be reused in other
projects, where there's no such a thing as node default input values. Other
behaviors (implemented or not) include creating a stereo copy of the graph and
removing nodes duplication.

It should not change the data format, since it just changes the behavior.

It is not intended to allow engine data conversion.
