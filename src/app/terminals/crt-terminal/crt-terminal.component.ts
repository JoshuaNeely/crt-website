import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { CommandParserService } from '../../command-parsers/command-parser.service';
import { Terminal } from '../terminal';
import { Website } from '../../applications/website';


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
    // this should be an injected token
    const application = new Website();

    const command = this.userInput;
    this.printAsUser([command]);
    this.commandParserService.parse(this, application, command);
    this.userInput = '';
  }

  trapInputFocus() {
    const element = this.testTerm.nativeElement;
    // the timeout is very important... uncertain why
    setTimeout(() => element.focus(), 0);
  }

  printAsUser(lines: string[]) {
    this.print(lines, true, 0);
  }

  printAsMachine(lines: string[], indent: number=0) {
    this.print(lines, false, indent);
  }

  private print(lines: string[], userEntry: boolean, indentSize: number) {
    const indent = ' '.repeat(indentSize);
    for (const line of lines) {
      this.terminalLog.push({
        userEntry: userEntry,
        value: indent + line,
      });
    }
  }
}
