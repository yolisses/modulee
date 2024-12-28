import type { Editor } from "./editor";

export abstract class Command {
    abstract execute(editor: Editor): void
    abstract undo(editor: Editor): void
}