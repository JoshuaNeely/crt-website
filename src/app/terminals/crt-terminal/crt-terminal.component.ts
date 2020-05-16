import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { CommandParserService } from '../../command-parsers/command-parser.service';
import { Terminal } from '../terminal';


interface LogEntry {
  userEntry: boolean;
  value: string;
}


@Component({
  selector: 'app-crt-terminal',
  templateUrl: './crt-terminal.component.html',
  styleUrls: ['./crt-terminal.component.scss'],
})
export class CrtTerminalComponent implements AfterViewInit, Terminal {

  userInput: string = '';
  terminalLog: LogEntry[] = [];

  @ViewChild('terminalInput') testTerm: ElementRef;

  constructor(
    private commandParserService: CommandParserService,
  ) { }

  ngAfterViewInit() {
    this.testTerm.nativeElement.focus();
  }

  submitLine() {
    const command = this.userInput;
    this.print([command], true);
    this.commandParserService.parse(this, command);
    this.userInput = '';
  }

  trapInputFocus() {
    const element = this.testTerm.nativeElement;
    // the timeout is very important... uncertain why
    setTimeout(() => element.focus(), 0);
  }

  printAsUser(lines: string[]) {
    this.print(lines, true);
  }

  printAsMachine(lines: string[]) {
    this.print(lines, false);
  }

  private print(lines: string[], userEntry: boolean) {
    for (const line of lines) {
      this.terminalLog.push({
        userEntry: userEntry,
        value: line,
      });
    }
  }
}
