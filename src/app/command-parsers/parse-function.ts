import { Terminal } from '../terminals/terminal';
import { Application } from '../applications/application';

export type ParseFunction = (Terminal, Application, string) => void;
