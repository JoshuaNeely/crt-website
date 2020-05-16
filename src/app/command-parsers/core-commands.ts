import { FunctionData } from './parse-function';
import { CommandRegistry } from './command-registry';


export const coreCommands = new CommandRegistry();

coreCommands.registerCommand(
  ['help', '?'],
  (data: FunctionData) => {
    data.terminal.printAsMachine([
      `Website ${data.application.getVersion()}`,
      'Help Message Here',
      'Available commands',
      'etc',
      'etc',
    ]);
  }
);

coreCommands.registerCommand(
  [''],
  (data: FunctionData) => {
    // no-op
  }
);
