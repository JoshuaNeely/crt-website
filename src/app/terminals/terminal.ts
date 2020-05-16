export abstract class Terminal {
  abstract printAsUser(lines: string[]): void;
  abstract printAsMachine(lines: string[]): void;
}