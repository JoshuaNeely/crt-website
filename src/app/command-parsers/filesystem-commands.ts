import { FunctionData } from './parse-function';
import { CommandRegistry } from './command-registry';


export const fsCommands = new CommandRegistry();

fsCommands.registerCommand({
  commands: ['cd'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine([
      'pretend cd works :)',
    ]);
  }
});

fsCommands.registerCommand({
  commands: ['ls'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine([
      'pretend ls works :)',
    ]);
  }
});
