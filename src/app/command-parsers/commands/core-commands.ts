import { FunctionData } from '../parse-function';
import { CommandRegistry } from '../command-registry';


export const coreCommands = new CommandRegistry();

const NO_OP_COMMAND = '';

coreCommands.registerCommand({
  commands: ['help', '?'],
  parseFunction: (data: FunctionData) => {
    const message = [
      `JoshBox OS v${data.application.getVersion()}`,
      '',
      'Features:',
      '--coming soon!--',
      '',
      '<ls> and <cd> to explore the site directory',
      '<list> to list available commands',
      '<?> shows this dialog',
    ]
    data.terminal.printAsMachine(message);
  },
  shortDescription: 'Print the help message',
});


coreCommands.registerCommand({
  commands: ['version', 'v'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine([
      `${data.application.getVersion()}`,
    ]);
  },
  shortDescription: 'Print the OS version',
});


coreCommands.registerCommand({
  commands: ['list', 'commands', 'list-commands'],
  parseFunction: (data: FunctionData) => {
    const registry = data.aggregatedRegistry;
    const commands = registry.getCommands();
    const registrationData = commands.map(x => registry.getRegistrationData(x));
    const aliases = registrationData.flatMap(x => x.commands.slice(1));
    const uniqueCommands = commands.filter(x => !aliases.includes(x) && x !== NO_OP_COMMAND);
    const uniqueRegistrationData = uniqueCommands.map(x => registry.getRegistrationData(x));

    const commandsWithShortDescription = uniqueRegistrationData.map(x => {
      const primaryCommand = x.commands[0];
      if (x.shortDescription) {
        const indent = buildIndent(primaryCommand, 10);
        return `${primaryCommand}${indent}${x.shortDescription}`;
      } else {
        return primaryCommand;
      }
    });

    data.terminal.printAsMachine( commandsWithShortDescription );
  },
  shortDescription: 'List all available commands',
});

function buildIndent(command: string, indentBase: number): string {
  const len = command.length;
  const indentSize = (Math.ceil(len/indentBase) * indentBase) - len + 1;
  return ' '.repeat(indentSize);
}


coreCommands.registerCommand({
  commands: [NO_OP_COMMAND],
  parseFunction: (data: FunctionData) => {
    // no-op
  },
});


coreCommands.registerCommand({
  commands: ['links-demo'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine(['Contact Links:']);
    data.terminal.printLink(['dummy link 1', 'dummy link 2']);
  },
  shortDescription: 'Demo displaying links',
});
