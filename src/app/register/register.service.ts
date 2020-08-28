import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  initRequestOptions() {
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    let headersConfig = new HttpHeaders(headers);
    return headersConfig;
  }
  postUser(user): Observable<any> {
    var datas: any = {};
    datas = user;
    console.log("datas", datas)
    var data = JSON.stringify(datas);
    let options = this.initRequestOptions();
    return this.http.post<any>(`${this.baseUrl}/register`, data, {
      headers: options
    });
  }
}
