import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-crt-terminal',
  templateUrl: './crt-terminal.component.html',
  styleUrls: ['./crt-terminal.component.scss'],
})
export class CrtTerminalComponent implements OnInit, AfterViewInit {
  userInput: string = '';
  terminalLog: string[] = [];

  @ViewChild('terminalInput') testTerm: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.testTerm.nativeElement.focus();
  }

  submitLine() {
    this.terminalLog.push(this.userInput);
    this.userInput = '';
  }

  trapInputFocus() {
    const element = this.testTerm.nativeElement;
    // the timeout is very important... uncertain why
    setTimeout(() => element.focus(), 0);
  }
}
