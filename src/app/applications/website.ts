import { Application } from './application';
import packagejson from '../../../package.json';


export class Website implements Application {
  public getVersion(): string {
    return packagejson.version;
  }
}
