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
  commands: ['newline', 'nl'],
  parseFunction: (data: FunctionData) => {
    data.terminal.printAsMachine(['']);
  },
  shortDescription: 'Print a newline',
});


coreCommands.registerCommand({
  commands: ['clear'],
  parseFunction: (data: FunctionData) => {
    data.terminal.clear();
  },
  shortDescription: 'Clear the screen',
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
  commands: ['contact', 'contacts', 'links', 'contact-links'],
  parseFunction: (data: FunctionData) => {
    const links = [
      {name: 'Github', url: 'https://github.com/JoshuaNeely'},
      {name: 'LinkedIn', url: 'https://www.linkedin.com/in/joshua-neely-a33a7712b'},
      {name: 'Email', url: 'mailto:joshua.a.neely@gmail.com'},
    ]
    data.terminal.printAsMachine(['Contact Links:']);
    for (const link of links) {
      data.terminal.printLink(link.name, link.url);
    }
  },
  shortDescription: 'List the author\'s contact links',
});


coreCommands.registerCommand({
  commands: ['set-color'],
  parseFunction: (data: FunctionData) => {
    const color = data.args[0] || '';
    const isColorValid = validateColor(color);
    const validExample = '\'set-color #FF00FF\'';

    const message = isColorValid ?
      [`Terminal color set to ${color}`] :
      [`${color} is not a valid color`, `ex: ${validExample}`];

    data.terminal.setColor(color);
    data.terminal.printAsMachine(message);
  },
  shortDescription: 'Change terminal text color',
});

function validateColor(color: string): boolean {
  return /#([0-9a-fA-F]{6})/.test(color);
}
