import { ParseFunction } from './parse-function';


interface RegistrationData {
  commands: string[];
  parseFunction: ParseFunction;
  shortDescription?: string;
  longDescription?: string;
}

interface Registry {
  [command: string]: RegistrationData;
}

export class CommandRegistry {

  private registry: Registry = {};

  getParseFunction(command: string): ParseFunction | null {
    const result = this.registry[command];
    return (result && result.parseFunction) || null;
  }

  getCommands(): string[] {
    return Object.keys(this.registry);
  }

  registerCommand(data: RegistrationData): void {
    for (const command of data.commands) {
      this.registry[command] = data;
    }
  }

  merge(otherRegistry: CommandRegistry) {
    this.registry = {
      ...this.registry,
      ...otherRegistry.registry
    }
  }
}
