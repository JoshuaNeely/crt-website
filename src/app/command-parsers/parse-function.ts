import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';
import { CommandRegistry } from './command-registry';


export interface FunctionData {
  terminal: Terminal;
  application: Application;
  commands: string[];
  aggregatedRegistry: CommandRegistry;
}

export type ParseFunction = (FunctionData) => void;
