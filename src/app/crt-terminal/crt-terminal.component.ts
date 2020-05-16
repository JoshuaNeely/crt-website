import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { VersionService } from '../version.service';


interface LogEntry {
  userEntry: boolean;
  value: string;
}


@Component({
  selector: 'app-crt-terminal',
  templateUrl: './crt-terminal.component.html',
  styleUrls: ['./crt-terminal.component.scss'],
})
export class CrtTerminalComponent implements OnInit, AfterViewInit {
  userInput: string = '';
  terminalLog: LogEntry[] = [];

  @ViewChild('terminalInput') testTerm: ElementRef;

  constructor(private versionService: VersionService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.testTerm.nativeElement.focus();
  }

  submitLine() {
    this.print([this.userInput], true);
    this.parse(this.userInput);
    this.userInput = '';
  }

  trapInputFocus() {
    const element = this.testTerm.nativeElement;
    // the timeout is very important... uncertain why
    setTimeout(() => element.focus(), 0);
  }

  print(lines: string[], userEntry: boolean) {
    for (const line of lines) {
      this.terminalLog.push({
        userEntry: userEntry,
        value: line,
      });
    }
  }

  parse(input: string) {
    switch(input) {
      case 'ls':
        this.printLs();
        break;

      case 'cd':
        this.cd();
        break;

      case 'help':
        this.printHelp();
        break;

      default:
        this.print([
          `${input}: command not found`,
        ], false);
        break;
    }
  }

  printHelp() {
    this.print([
      `Website ${this.versionService.version}`,
      'Help Message Here',
      'Available commands',
      'etc',
      'etc',
    ], false);
  }

  printLs() {
    this.print([
      'directory contents here',
    ], false);
  }

  cd() {
  }
}
