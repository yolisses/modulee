// This object is someway similar to internationalization. It should not be
// interpreted as important to the logic of the application
//
// TODO implement real internationalization.
export const editorCommandNames: Record<string, string> = {
	RedoCommand: 'Redo last command',
	UndoCommand: 'Undo last command',
	AddNodeCommand: 'Add node',
	AddInternalModuleCommand: 'Add internalModule',
	MoveNodeCommand: 'Move node',
	MoveNodesCommand: 'Move nodes',
	DisconnectCommand: 'Disconnect node',
	GroupNodesCommand: 'InternalModule selected nodes',
	RemoveNodeCommand: 'Remove node',
	RemoveInternalModuleCommand: 'Remove internalModule',
	RenameInternalModuleCommand: 'Rename internalModule',
	SetConnectionCommand: 'Connect node',
	SetConstantNodeValueCommand: 'Set constant node value',
	SetModuleNodeModuleReferenceCommand: 'Set internalModule of internalModule node',
};
