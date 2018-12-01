import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WatsonProvider {

  headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

  constructor(public http: HttpClient) {
    console.log('Hello WatsonProvider Provider');
  }

  callWatson(message: string) {
    console.log(message);
    const params = new HttpParams().set('message', message);
    this.http.get('http://127.0.0.1:3000', { headers: this.headers, params: params })
      .subscribe((res) => console.log(res));
  }

  // responseType: 'text'

}
