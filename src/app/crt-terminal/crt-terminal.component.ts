import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';


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

  constructor() { }

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
        break;

      case 'cd':
        break;

      case 'help':
        this.print([
          'Help Message Here',
          'Available commands',
          'etc',
          'etc',
        ], false);
        break;
    }
  }
}
