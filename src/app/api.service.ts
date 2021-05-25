import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from 'src/app/data.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   url: string = "http://imginfotech.in/propira/api/";
  
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
    // getData() {
    //   return this.http.get(url);
    // }
    getData(): Observable<Data[]> {
      console.log('getData '+this.url + 'registration')
      return this.http.get<Data[]>(this.url + 'registration')
    }
   
    addData(person:Data): Observable<any> {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(person);
      console.log(body)
      return this.http.post(this.url + 'registration', body,{'headers':headers})
    }
}


