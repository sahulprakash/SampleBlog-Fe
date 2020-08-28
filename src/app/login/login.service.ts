import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

  loginUser(user): Observable<any> {
    var datas: any = {};
    datas = user;
    var data = JSON.stringify(datas);
    let options = this.initRequestOptions();
    return this.http.post<any>(`${this.baseUrl}/login`, data, {
      headers: options,
    });
  }
}
