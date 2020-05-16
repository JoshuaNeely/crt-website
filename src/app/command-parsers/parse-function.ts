import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';

export interface FunctionData {
  terminal: Terminal;
  application: Application;
  commands: string[];
}

export type ParseFunction = (FunctionData) => void;
