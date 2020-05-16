import { Injectable } from '@angular/core';

import { Terminal } from '../terminal';
import { VersionService } from '../version.service';


@Injectable({
  providedIn: 'any'
})
export class CommandParserService {

  constructor(
    private versionService: VersionService,
  ) { }

  parse(terminal: Terminal, command: string) {
    switch(command) {
      case 'ls':
        this.ls(terminal, command);
        break;

      case 'cd':
        this.cd(terminal, command);
        break;

      case 'help':
        this.help(terminal, command);
        break;

      default:
        this.commandNotFound(terminal, command);
        break;
    }
  }

  private commandNotFound(terminal: Terminal, command: string) {
    terminal.printAsMachine([
      `${command}: command not found`,
    ]);
  }

  private help(terminal: Terminal, command: string) {
    terminal.printAsMachine([
      `Website ${this.versionService.version}`,
      'Help Message Here',
      'Available commands',
      'etc',
      'etc',
    ]);
  }

  ls(terminal: Terminal, command: string) {
    terminal.printAsMachine([
      'directory contents here',
    ]);
  }

  cd(terminal: Terminal, command: string) {
  }
}
