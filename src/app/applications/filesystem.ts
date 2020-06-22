import { HttpClient } from '@angular/common/http';
import { of, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export class Filesystem {

  constructor(private http: HttpClient) { }

  public ls(): Observable<string[]> {
    // return this.http.get('http://192.168.86.250:8080/list-files').pipe(map(  // good
    // return this.http.get('http://localhost:8080/list-files', {responseType: 'text'}).pipe(map( // bad; localhost doesn't make sense; the server isn't on the client!
    return this.http.get('http://joshuaneely.ddns.net:80/list-files', {responseType: 'text'}).pipe(map(
      (directoryContents: string) => directoryContents.split(',')
    ));
  }
}
