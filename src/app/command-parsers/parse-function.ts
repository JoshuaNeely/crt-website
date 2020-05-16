import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';

export interface FunctionData {
  terminal: Terminal;
  application: Application;
  command: string;
}

export type ParseFunction = (FunctionData) => void;
