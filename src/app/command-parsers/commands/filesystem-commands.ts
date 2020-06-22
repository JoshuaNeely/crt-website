import { FunctionData } from '../parse-function';
import { CommandRegistry } from '../command-registry';


export const fsCommands = new CommandRegistry();

fsCommands.registerCommand({
  commands: ['cd'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine([
      'pretend cd works :)',
    ]);
  },
  shortDescription: 'Navigate directories'
});

fsCommands.registerCommand({
  commands: ['ls'],
  parseFunction: (data: FunctionData) => {
    data.application.filesystem.ls().subscribe((directory: string[]) => {
      data.terminal.printAsMachine([
        directory.join('\n'),
      ]);
    });
  },
  shortDescription: 'List directory contents'
});
