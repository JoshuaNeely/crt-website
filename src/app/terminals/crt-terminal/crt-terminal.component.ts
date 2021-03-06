import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  Injector,
} from '@angular/core';

import { CommandParserService } from '../../command-parsers/command-parser.service';
import { Terminal, PrintData } from '../terminal';
import { Website } from '../../applications/website';
import { Application  } from '../../applications/application';


// data stored in the log per line
interface LogEntry {
  urlLink: string;
  value: string;
}

const BASE_FONT_SIZE = 30;
const LINE_HEIGHT_FONT_RATIO = 0.85;
const FONT_FAMILY = "VT323, monospace";


@Component({
  selector: 'app-crt-terminal',
  templateUrl: './crt-terminal.component.html',
  styleUrls: ['./crt-terminal.component.scss'],
})
export class CrtTerminalComponent implements AfterViewInit, Terminal {

  userInput: string = '';
  fullTerminalLog: LogEntry[] = [];      // full account of all logs; no line-splitting
  renderedTerminalLog: LogEntry[] = [];  // what is actually printed to the screen
  fontSizeRatio: number = 1;

  screenWidthColumns: number;
  screenHeightRows: number;
  verticalScrollOffset = 0;

  application: Application;

  @ViewChild('terminalInput')
  terminalInput: ElementRef;

  @ViewChild('screen')
  screen: ElementRef;

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.setupScreenDimensions();
    this.reprintTerminalLogs();
  }

  constructor(
    private commandParserService: CommandParserService,
    private injector: Injector,
  ) { }

  ngAfterViewInit() {
    // not sure why this timer is needed...
    // character widths aren't measured correctly without it
    setTimeout(() => {
      this.setupScreenDimensions();
      this.terminalInput.nativeElement.focus();
      this.commandParserService.runStartupCommands(this, this.application);
    }, 0);

    // this should be an injected token?
    this.application = new Website(this.injector);
  }

  handleKeydown(event) {
    switch(event.key) {
      case 'ArrowUp':
        this.verticalScrollOffset += 1;
        this.reprintTerminalLogs();
        break;

      case 'ArrowDown':
        this.verticalScrollOffset = Math.max(0, this.verticalScrollOffset - 1);
        this.reprintTerminalLogs();
        break;
    }
  }

  submitLine() {
    this.setupScreenDimensions();
    const command = this.userInput;
    this.userInput = '';
    this.verticalScrollOffset = 0;
    this.printAsUser([command]);
    this.commandParserService.parse(this, this.application, command);
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

  private splitStringAtLengthLimit(str: string, limit: number): string[] {
    const withinLimit = str.substring(0, limit);
    const outsideLimit = str.substring(limit);
    if (!outsideLimit) {
      return [withinLimit];
    } else {
      const outside = this.splitStringAtLengthLimit(outsideLimit, limit);
      return [withinLimit, ...outside];
    }
  }

  private buildLogEntriesFromPrintData(data: PrintData): LogEntry[] {
    const indent = ' '.repeat(data.indentSize);
    const carat = data.isUserEntry ? '>' : '';

    return data.lines.map(line => {
      return {
        urlLink: data.urlLink,
        value: carat + indent + line,
      }
    });
  }

  private buildLineWrappedLogs(logs: LogEntry[]): LogEntry[] {
    return logs.flatMap(log => {
      const limit = this.screenWidthColumns;
      const splitValue = this.splitStringAtLengthLimit(log.value, limit);
      return splitValue.map(str => {
        return {
          ...log,
          value: str
        };
      });
    });
  }

  private print(data: PrintData) {

    const fullLengthLogs = this.buildLogEntriesFromPrintData(data);

    // We want to store the un-altered logs so we can re-print them later
    // if dimensions change.
    // Probably useful for scrolling and things too.
    this.fullTerminalLog.push(...fullLengthLogs);
    this.reprintTerminalLogs();
  }

  // call after screen size is recalculated
  private reprintTerminalLogs() {
    const allLineWrappedLogs = this.buildLineWrappedLogs(this.fullTerminalLog);
    this.renderedTerminalLog = this.getScreenContents(allLineWrappedLogs);
  }

  private getScreenContents(logs: LogEntry[]): LogEntry[] {
    const lastIndex = logs.length - 1;
    const commandEntry = 2;
    const screenRows = this.screenHeightRows - commandEntry;

    const screenStart = Math.max(
      (lastIndex - screenRows - this.verticalScrollOffset), 0
    );

    return logs.slice(screenStart);
  }

  clear(): void {
    this.renderedTerminalLog = [];
    this.fullTerminalLog = [];
  }

  private setElementStyle(elementRef: ElementRef, style, value) {
    elementRef.nativeElement.style[style] = value;
  }

  private getCharacterHeight(): number {
    // fonts have a build-in buffer around the characters
    // lines are slightly smaller than the font to force lines to print closer together
    return BASE_FONT_SIZE * LINE_HEIGHT_FONT_RATIO;
  }

  private getCharacterWidth() {
    const font = `${BASE_FONT_SIZE}px ${FONT_FAMILY}`;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText('@');
    return metrics.width;
  }

  private setupScreenDimensions() {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const characterHeight = this.getCharacterHeight();
    const characterWidth = this.getCharacterWidth();

    this.setElementStyle(this.screen, 'fontFamily', `${FONT_FAMILY}`);
    this.setElementStyle(this.screen, 'fontSize', `${BASE_FONT_SIZE}px`);
    this.setElementStyle(this.screen, 'lineHeight', `${characterHeight}px`);

    this.screenHeightRows = Math.floor(screenHeight / characterHeight);
    this.screenWidthColumns = Math.floor(screenWidth / characterWidth);
  }

  setColor(color: string) {
    this.setElementStyle(this.screen, 'color', color);
  }
}
