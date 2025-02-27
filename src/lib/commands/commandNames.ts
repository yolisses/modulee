// This object is someway similar to internationalization. It should not be
// interpreted as important to the logic of the application
// TODO implement real internationalization.
export const commandNames: Record<string, string> = {
	RedoCommand: 'Redo last command',
	UndoCommand: 'Undo last command',
	AddNodeCommand: 'Add node',
	AddGroupCommand: 'Add group',
	MoveNodeCommand: 'Move node',
	MoveNodesCommand: 'Move nodes',
	DisconnectCommand: 'Disconnect node',
	GroupNodesCommand: 'Group selected nodes',
	RemoveNodeCommand: 'Remove node',
	RemoveGroupCommand: 'Remove group',
	RenameGroupCommand: 'Rename group',
	SetConnectionCommand: 'Connect node',
	SetConstantNodeValueCommand: 'Set constant node value',
	SetGroupNodeTargetGroupIdCommand: 'Set group of group node',
};
