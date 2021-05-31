import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from 'src/app/data.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   url: string = "http://imginfotech.in/propira/api/";
   otpUrl = "http://imginfotech.in/propira/api/registration/sendOtp";
  // log: any;
  // OTP: number;
  
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
    // getDataOtp(): Observable<Data[]> {
    //   console.log('getDataOtp '+ this.otpUrl + 'sendOtp')
    //   return this.http.get<Data[]>(this.otpUrl + 'sendOtp')
    // }
    getDataOtp(OTP: any): Observable<Data[]> {
     const url = `${this.otpUrl}/${OTP}`;
     return this.http.get<Data[]>(this.otpUrl).pipe(
    // tap(_ => this.log(`fetched hero id=${OTP}`))
    // catchError(this.handleError<Data[]>(`getHero id=${OTP}`))
  );
}

    addData(person:Data): Observable<any> {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(person);
      console.log(body)
      return this.http.post(this.url + 'registration', body,{'headers':headers})
    }
}


