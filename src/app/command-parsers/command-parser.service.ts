import { Injectable } from '@angular/core';

import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';
import { ParseFunction, FunctionData } from './parse-function';
import { CommandRegistry } from './command-registry';
import { fsCommands } from './commands/filesystem-commands';
import { coreCommands } from './commands/core-commands';


@Injectable({
  providedIn: 'any'
})
export class CommandParserService {

  private commandRegistry: CommandRegistry;

  constructor() {
    this.commandRegistry = new CommandRegistry();
    this.commandRegistry.merge(coreCommands);
    this.commandRegistry.merge(fsCommands);
  }

  public parse(terminal: Terminal, application: Application, command: string): void {
    const parseFunctionData = {
      command: command,
      application: application,
      terminal: terminal,
      aggregatedRegistry: this.commandRegistry,
    }
    const parseFunction = this.commandRegistry.getParseFunction(command);
    if (parseFunction) {
      parseFunction(parseFunctionData);
    } else {
      this.commandNotFound(terminal, command);
    }
  }

  private commandNotFound(terminal: Terminal, command: string) {
    terminal.printAsMachine([
      `${command}: command not found`,
    ]);
  }
}
