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
  urlLink: string;
  value: string;
}

const BASE_FONT_SIZE = 20;
const LINE_HEIGHT_FONT_RATIO = 0.85;
const FONT_FAMILY = "VT323, monospace";


@Component({
  selector: 'app-crt-terminal',
  templateUrl: './crt-terminal.component.html',
  styleUrls: ['./crt-terminal.component.scss'],
})
export class CrtTerminalComponent implements AfterViewInit, Terminal {

  userInput: string = '';
  terminalLog: LogEntry[] = [];
  fontSizeRatio: number = 1;

  screenWidthColumns: number;
  screenHeightRows: number;

  // this should be an injected token
  application = new Website();

  @ViewChild('terminalInput')
  terminalInput: ElementRef;

  @ViewChild('screen')
  screen: ElementRef;

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.setupScreenDimensions();
  }

  constructor(private commandParserService: CommandParserService) { }

  ngAfterViewInit() {
    // not sure why this timer is needed...
    // character widths aren't measured correctly without it
    setTimeout(() => {
      this.setupScreenDimensions();
      this.terminalInput.nativeElement.focus();
      this.commandParserService.runStartupCommands(this, this.application);
    }, 0);
  }

  submitLine() {
    const command = this.userInput;
    this.printAsUser([command]);
    this.commandParserService.parse(this, this.application, command);
    this.userInput = '';
    this.setupScreenDimensions();
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

  private print(data: PrintData) {
    const indent = ' '.repeat(data.indentSize);
    const carat = data.isUserEntry ? '>' : '';

    const fullLengthLogs = data.lines.map(line => {
      return {
        urlLink: data.urlLink,
        value: carat + indent + line,
      }
    });

    const lineWrappedLogs = fullLengthLogs.flatMap(log => {
      const limit = this.screenWidthColumns;
      const splitValue = this.splitStringAtLengthLimit(log.value, limit);
      return splitValue.map(str => {
        return {
          ...log,
          value: str
        };
      });
    });

    this.terminalLog.push(...lineWrappedLogs);
  }

  clear(): void {
    this.terminalLog = [];
  }

  private setElementStyle(elementRef: ElementRef, style, value) {
    elementRef.nativeElement.style[style] = value;
  }

  private getCharacterHeight(): number {
    // fonts have a build-in buffer around the characters
    // lines are slightly smaller than the font to force lines to print closer together
    return BASE_FONT_SIZE * LINE_HEIGHT_FONT_RATIO;
  }

  private getCharacterWidth(font: string) {let width;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText('@');
    return metrics.width;
  }

  private setupScreenDimensions() {
    const font = `${BASE_FONT_SIZE}pt ${FONT_FAMILY}`;

    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const characterHeight = this.getCharacterHeight();
    const characterWidth = this.getCharacterWidth(font);

    this.setElementStyle(this.screen, 'fontSize', `${BASE_FONT_SIZE}px`);
    this.setElementStyle(this.screen, 'lineHeight', `${characterHeight}px`);
    this.setElementStyle(this.screen, 'font', font);

    this.screenHeightRows = Math.floor(screenHeight / characterHeight);
    this.screenWidthColumns = Math.floor(screenWidth / characterWidth);
  }
}
