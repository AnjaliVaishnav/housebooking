import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "http://imginfotech.in/propira/api/registration/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(url);
  }
}


