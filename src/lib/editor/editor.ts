import type { Command } from "./command";

export class Editor {
    history: Command[] = []

    run(command: Command) {
        command.execute(this)
        this.history.push(command)
    }
}