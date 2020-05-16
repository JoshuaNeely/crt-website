import { Injectable } from '@angular/core';

import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';
import { ParseFunction, FunctionData } from './parse-function';
import { CommandRegistry } from './command-registry';
import { fsCommands } from './filesystem-commands';


@Injectable({
  providedIn: 'any'
})
export class CommandParserService {

  private commandRegistry: CommandRegistry;

  constructor() {
    this.commandRegistry = new CommandRegistry();
    this.commandRegistry.registerCommand(['help', '?'], this.help);
    this.commandRegistry.merge(fsCommands);
  }

  public parse(terminal: Terminal, application: Application, command: string): void {
    const parseFunctionData = {
      command: command,
      application: application,
      terminal: terminal
    }
    const parseFunction = this.commandRegistry.getParseFunction(command);
    if (parseFunction) {
      parseFunction(parseFunctionData);
    } else if (command === '') {
      // no-op
    } else {
      this.commandNotFound(terminal, command);
    }
  }

  private commandNotFound(terminal: Terminal, command: string) {
    terminal.printAsMachine([
      `${command}: command not found`,
    ]);
  }

  private help(data: FunctionData) {
    data.terminal.printAsMachine([
      `Website ${data.application.getVersion()}`,
      'Help Message Here',
      'Available commands',
      'etc',
      'etc',
    ]);
  }

  private ls(terminal: Terminal, command: string) {
    terminal.printAsMachine([
      'directory contents here',
    ]);
  }

  private cd(terminal: Terminal, command: string) {
  }
}
