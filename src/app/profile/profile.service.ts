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
    console.log("datas", data)
    let options = this.initRequestOptions();
    return this.http.post<any>(`${this.baseUrl}/addblog`, data, {
      headers: options,
    });
  }
  getBlogsById(id): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/listblog`, { headers: options })
  }
  updateBlog(id, newValue): Observable<any> {
    var datas: any = {};
    datas = newValue;
    var data = JSON.stringify(datas);
    console.log("datas", data)
    let options = this.initRequestOptions()
    return this.http.put<any>(`${this.baseUrl}/${id}`, data, { headers: options })
  }

  delete(id): Observable<any> {
    console.log("gets id",id)
    let options = this.initRequestOptions()
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: options })
  }

}
