import { ParseFunction } from './parse-function';


interface Registry {
  [command: string]: ParseFunction;
}

export class CommandRegistry {

  private registry: Registry = {};

  getParseFunction(command: string): ParseFunction | null {
    return this.registry[command] || null;
  }

  getCommands(): string[] {
    return Object.keys(this.registry);
  }

  registerCommand(
    commands: string[],
    parseFunction: ParseFunction
  ): void {
    for (const command of commands) {
      this.registry[command] = parseFunction;
    }
  }

  merge(otherRegistry: CommandRegistry) {
    this.registry = {
      ...this.registry,
      ...otherRegistry.registry
    }
  }
}
