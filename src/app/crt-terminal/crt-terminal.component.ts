import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crt-terminal',
  templateUrl: './crt-terminal.component.html',
  styleUrls: ['./crt-terminal.component.scss'],
})
export class CrtTerminalComponent implements OnInit {
  userInput: string = '';
  terminalLog: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  submitLine() {
    this.terminalLog.push(this.userInput);
    this.userInput = '';
  }
}
