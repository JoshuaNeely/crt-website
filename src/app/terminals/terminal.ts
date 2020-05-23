export abstract class Terminal {
  abstract printAsUser(lines: string[]): void;
  abstract printAsMachine(lines: string[]): void;
  abstract printLink(line: string, urlLink: string): void;
  abstract printCustom(data: PrintData): void;
  abstract clear(): void;
  abstract setColor(color: string): void;
}

// data passed to the print functions
export interface PrintData {
  lines: string[];
  isUserEntry?: boolean;
  indentSize?: number;
  urlLink?: string;
}
