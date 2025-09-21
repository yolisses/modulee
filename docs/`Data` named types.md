The types named with `Data` are intended to represent the raw data of a
potential class. For instance, `NodeData` contains the data that describes a
single node. A node can have multiple connections to other nodes, but `NodeData`
does not include them since they do not refer to the data of a single node.
`Node`, on the other hand, can have complicated attributes using getters since
it's a class.

A `Data` named type should be a POJO, allowing them to be easily transmitted to
other modules, even in a different language or machine.
