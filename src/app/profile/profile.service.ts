import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = 'http://localhost:3000/profile';
  constructor(private http: HttpClient) { }

  initRequestOptions() {
    let tokenstr = localStorage.getItem('item');
    let tokenparse = JSON.parse(tokenstr)
    let token = tokenparse.token
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token
    }
    let headersConfig = new HttpHeaders(headers)
    return headersConfig
  }

  addBlog(addBlog): Observable<any> {
    var datas: any = {};
    datas = addBlog;
    var data = JSON.stringify(datas);
    console.log("datas",data)
    let options = this.initRequestOptions();
    return this.http.post<any>(`${this.baseUrl}/addblog`, data, {
      headers: options,
    });
  }

}
