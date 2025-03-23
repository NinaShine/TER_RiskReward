import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}


  getInitScenario(): Observable<any> {
    return this.http.get<any>('/api/init', {
      withCredentials: true,
      headers: new HttpHeaders({
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      }),
    });
  }


}
