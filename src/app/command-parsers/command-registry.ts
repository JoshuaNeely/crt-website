import { ParseFunction } from './parse-function';


interface Registry {
  [command: string]: ParseFunction;
}

export class CommandRegistry {

  private registry: Registry = {};

  getParseFunction(command: string): ParseFunction | null {
    return this.registry[command] || null;
  }

  registerCommand(
    command: string,
    parseFunction: ParseFunction
  ): void {
    this.registry[command] = parseFunction;
  }

  merge(otherRegistry: CommandRegistry) {
    this.registry = {
      ...this.registry,
      ...otherRegistry
    }
  }
}
