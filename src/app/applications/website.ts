import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Application } from './application';
import { Filesystem } from './filesystem';
import packagejson from '../../../package.json';


export class Website extends Application {

  filesystem: Filesystem;

  constructor(protected injector: Injector) {
    super(injector);

    const http: HttpClient = this.injector.get<HttpClient>(HttpClient);
    this.filesystem = new Filesystem(http);
  }

  getVersion(): string {
    return packagejson.version;
  }
}
