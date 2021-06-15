import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Data } from 'src/app/data.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   url: string = "http://imginfotech.in/propira/api/";
   otpUrl = "http://imginfotech.in/propira/api/registration/";
   public loginStatus = false;
   public userInfo = new Subject<string>(); 
   userInfo$ = this.userInfo.asObservable();
   private currentUserNameStore = new BehaviorSubject<string>("");

  // Make UserName store Observable
  public currentUserName$ = this.currentUserNameStore.asObservable();

  // Setter to update UserName
  setCurrentUserName(userName: string) {
    this.currentUserNameStore.next(userName);
  }
 
   publishData(data: any) {
     this.userInfo.next(data);
   }  

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
    getData(): Observable<Data[]> {
      console.log('getData '+this.url + 'registration')
      return this.http.get<Data[]>(this.url + 'registration')
    }
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
    onClick(person:Data): Observable<any> {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(person);
      console.log(body)
      return this.http.post(this.otpUrl + 'verifyOtp', body,{'headers':headers})
    }

  setLoginStatus(status: boolean) {
    this.loginStatus = status;
  }
}


