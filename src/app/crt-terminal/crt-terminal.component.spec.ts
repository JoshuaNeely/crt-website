import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtTerminalComponent } from './crt-terminal.component';

describe('CrtTerminalComponent', () => {
  let component: CrtTerminalComponent;
  let fixture: ComponentFixture<CrtTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
