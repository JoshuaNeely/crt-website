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
  ['version', 'v'],
  (data: FunctionData) => {
    data.terminal.printAsMachine([
      `${data.application.getVersion()}`,
    ]);
  }
);

coreCommands.registerCommand(
  ['list', 'commands', 'list-commands'],
  (data: FunctionData) => {
    const registry = data.aggregatedRegistry;
    const commands = registry.getCommands();
    // TODO reduce duplicates by comparing description / function
    //      write both names in-line followed by description?
    data.terminal.printAsMachine( commands );
  }
);

coreCommands.registerCommand(
  [''],
  (data: FunctionData) => {
    // no-op
  }
);
