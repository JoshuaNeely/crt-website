import { FunctionData } from './parse-function';
import { CommandRegistry } from './command-registry';


export const coreCommands = new CommandRegistry();

const NO_OP_COMMAND = '';

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
    const registrationData = commands.map(x => registry.getRegistrationData(x));
    const aliases = registrationData.flatMap(x => x.commands.slice(1));
    const uniqueCommands = commands.filter(x => !aliases.includes(x));
    const filterOutNoOp = uniqueCommands.filter(x => x !== NO_OP_COMMAND);
    const output = filterOutNoOp;
    data.terminal.printAsMachine( output );
  },
  shortDescription: 'List all available commands',
});


coreCommands.registerCommand({
  commands: [NO_OP_COMMAND],
  parseFunction: (data: FunctionData) => {
    // no-op
  },
});
