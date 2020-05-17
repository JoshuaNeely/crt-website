import { FunctionData } from './parse-function';
import { CommandRegistry } from './command-registry';


export const coreCommands = new CommandRegistry();

coreCommands.registerCommand({
  commands: ['help', '?'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine([
      `Website ${data.application.getVersion()}`,
      'Help Message Here',
      'Available commands',
      'etc',
      'etc',
    ]);
  },
});

coreCommands.registerCommand({
  commands: ['version', 'v'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine([
      `${data.application.getVersion()}`,
    ]);
  },
});

coreCommands.registerCommand({
  commands: ['list', 'commands', 'list-commands'],
  parseFunction: (data: FunctionData) => {
    const registry = data.aggregatedRegistry;
    const commands = registry.getCommands();
    // TODO reduce duplicates by comparing description / function
    //      write both names in-line followed by description?
    data.terminal.printAsMachine( commands );
  },
  shortDescription: 'List all available commands',
});

coreCommands.registerCommand({
  commands: [''],
  parseFunction: (data: FunctionData) => {
    // no-op
  },
});
