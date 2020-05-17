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
    const uniqueCommands = removeDuplicateCommands(commands, registry);
    const filterOutNoOp = uniqueCommands.filter(x => x !== '');
    const output = filterOutNoOp;
    data.terminal.printAsMachine( output );
  },
  shortDescription: 'List all available commands',
});

function removeDuplicateCommands(
  commands: string[],
  registry: CommandRegistry
): string[] {
  const redundantCommands: string[] = [];
  const output = [];

  for (const command of commands) {
    if (!redundantCommands.includes(command)) {
      const registrationData = registry.getRegistrationData(command);
      const aliases = registrationData.commands.filter(
        x => x !== command
      );
      redundantCommands.push(...aliases);

      output.push(command);
    }
  }

  return output;
}

coreCommands.registerCommand({
  commands: [''],
  parseFunction: (data: FunctionData) => {
    // no-op
  },
});
