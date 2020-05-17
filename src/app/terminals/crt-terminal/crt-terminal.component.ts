import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';

import { CommandParserService } from '../../command-parsers/command-parser.service';
import { Terminal, PrintData } from '../terminal';
import { Website } from '../../applications/website';


// data stored in the log per line
interface LogEntry {
  isUserEntry: boolean;
  urlLink: string;
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

  tempMirrorScreenHeight: number;
  tempMirrorScreenWidth: number;

  // this should be an injected token
  application = new Website();

  @ViewChild('terminalInput')
  terminalInput: ElementRef;

  @ViewChild('screen')
  screen: ElementRef;

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.getScreenSize();
  }

  constructor(private commandParserService: CommandParserService) {
    this.onResize();
  }

  ngAfterViewInit() {
    this.terminalInput.nativeElement.focus();
    this.commandParserService.runStartupCommands(this, this.application);
  }

  submitLine() {
    const command = this.userInput;
    this.printAsUser([command]);
    this.commandParserService.parse(this, this.application, command);
    this.userInput = '';
  }

  trapInputFocus() {
    const element = this.terminalInput.nativeElement;
    // the timeout is very important... uncertain why
    setTimeout(() => element.focus(), 0);
  }

  clickText(logEntry: LogEntry) {
    this.trapInputFocus();
  }

  printAsUser(lines: string[]) {
    this.print({
      lines: lines,
      isUserEntry: true,
      indentSize: 0,
      urlLink: '',
    });
  }

  printAsMachine(lines: string[]) {
    this.print({
      lines: lines,
      isUserEntry: false,
      indentSize: 0,
      urlLink: '',
    });
  }

  printLink(line: string, urlLink: string) {
    this.print({
      lines: [line],
      isUserEntry: false,
      indentSize: 0,
      urlLink: urlLink,
    });
  }

  printCustom(data: PrintData) {
    this.print({
      lines: [],
      isUserEntry: false,
      indentSize: 0,
      urlLink: '',
      ...data
    });
  }

  private print(data: PrintData) {
    const indent = ' '.repeat(data.indentSize);
    for (const line of data.lines) {
      this.terminalLog.push({
        isUserEntry: data.isUserEntry,
        urlLink: data.urlLink,
        value: indent + line,
      });
    }
  }

  clear(): void {
    this.terminalLog = [];
  }

  private getScreenSize() {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    this.tempMirrorScreenHeight = screenHeight;
    this.tempMirrorScreenWidth = screenWidth;
  }
}
