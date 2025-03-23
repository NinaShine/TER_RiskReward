import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private initURL = "http://localhost:3000/init";
  private nextURL = "http://localhost:3000/next";



  constructor(private http: HttpClient) {}

  getInitScenario(): Observable<any> {
    return this.http.get<any>(this.initURL, {
      withCredentials: true,
      headers: new HttpHeaders({
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      }),
    });
  }

  getNextScenario(): Observable<any> {
    return this.http.get<any>(this.nextURL, {
      withCredentials: true,
      headers: new HttpHeaders({
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      }),
    });
  }
}
