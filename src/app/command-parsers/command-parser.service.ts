import { Injectable } from '@angular/core';

import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';
import { ParseFunction } from './parse-function';
import { CommandRegistry } from './command-registry';


@Injectable({
  providedIn: 'any'
})
export class CommandParserService {

  private commandRegistry: CommandRegistry;

  constructor() {
    this.commandRegistry = new CommandRegistry();
    this.commandRegistry.registerCommand('help', this.help);
  }

  public parse(
    terminal: Terminal,
    application: Application,
    command: string
  ): void {
    const parseFunction = this.commandRegistry.getParseFunction(command);
    if (parseFunction) {
      parseFunction(terminal, application, command);
    } else {
      this.commandNotFound(terminal, command);
    }
  }


  private commandNotFound(terminal: Terminal, command: string) {
    terminal.printAsMachine([
      `${command}: command not found`,
    ]);
  }

  private help(terminal: Terminal, application: Application, command: string) {
    terminal.printAsMachine([
      `Website ${application.getVersion()}`,
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
