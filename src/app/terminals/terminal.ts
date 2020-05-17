export abstract class Terminal {
  abstract printAsUser(lines: string[]): void;
  abstract printAsMachine(lines: string[], indent?: number): void;
  abstract printLink(lines: string[], indent?: number): void;
  abstract printCustom(data: PrintData): void;
}

// data passed to the print functions
export interface PrintData {
  lines: string[];
  isUserEntry?: boolean;
  indentSize?: number;
  isLink?: boolean;
}
