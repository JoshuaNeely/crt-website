import { Injector } from '@angular/core';

import { Filesystem } from './filesystem';


export abstract class Application {
  filesystem: Filesystem;

  constructor(protected injector: Injector) {}

  abstract getVersion(): string;
}
