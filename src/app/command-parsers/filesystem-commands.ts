import { ParseFunction, FunctionData } from './parse-function';
import { CommandRegistry } from './command-registry';


export const fsCommands = new CommandRegistry();

fsCommands.registerCommand(
  ['cd'],
  (data: FunctionData) => {
    data.terminal.printAsMachine([
      'pretend cd works :)',
    ]);
  }
);

fsCommands.registerCommand(
  ['ls'],
  (data: FunctionData) => {
    data.terminal.printAsMachine([
      'pretend ls works :)',
    ]);
  }
);
