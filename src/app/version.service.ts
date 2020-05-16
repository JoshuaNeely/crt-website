import { Injectable } from '@angular/core';
import packagejson from '../../package.json';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  get version(): string {
    return packagejson.version;
  }
}
