import { ParseFunction } from './parse-function';
import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';
import { CommandRegistry } from './command-registry';


export const fsCommands = new CommandRegistry();

fsCommands.registerCommand(
  'cd',
  (terminal: Terminal, application: Application, command: string) => {
    terminal.printAsMachine([
      'pretend cd works :)',
    ]);
  }
);

fsCommands.registerCommand(
  'ls',
  (terminal: Terminal, application: Application, command: string) => {
    terminal.printAsMachine([
      'pretend ls works :)',
    ]);
  }
);
