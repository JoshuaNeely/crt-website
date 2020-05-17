import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { CommandParserService } from '../../command-parsers/command-parser.service';
import { Terminal, PrintData } from '../terminal';
import { Website } from '../../applications/website';


// data stored in the log per line
interface LogEntry {
  isUserEntry: boolean;
  isLink: boolean;
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

  // this should be an injected token
  application = new Website();

  @ViewChild('terminalInput') testTerm: ElementRef;

  constructor(
    private commandParserService: CommandParserService,
  ) { }

  ngAfterViewInit() {
    this.testTerm.nativeElement.focus();
    this.commandParserService.parse(this, this.application, '?');
  }

  submitLine() {
    const command = this.userInput;
    this.printAsUser([command]);
    this.commandParserService.parse(this, this.application, command);
    this.userInput = '';
  }

  trapInputFocus() {
    const element = this.testTerm.nativeElement;
    // the timeout is very important... uncertain why
    setTimeout(() => element.focus(), 0);
  }

  printAsUser(lines: string[]) {
    this.print({
      lines: lines,
      isUserEntry: true,
      indentSize: 0,
      isLink: false,
    });
  }

  printAsMachine(lines: string[]) {
    this.print({
      lines: lines,
      isUserEntry: false,
      indentSize: 0,
      isLink: false,
    });
  }

  printLink(lines: string[]) {
    this.print({
      lines: lines,
      isUserEntry: false,
      indentSize: 0,
      isLink: true,
    });
  }

  printCustom(data: PrintData) {
    this.print({
      lines: [],
      isUserEntry: false,
      indentSize: 0,
      isLink: false,
      ...data
    });
  }

  private print(data: PrintData) {
    const indent = ' '.repeat(data.indentSize);
    for (const line of data.lines) {
      this.terminalLog.push({
        isUserEntry: data.isUserEntry,
        isLink: data.isLink,
        value: indent + line,
      });
    }
  }
}
