import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private apiUrl = "https://ter-riskreward.onrender.com";
  private initURL = "http://localhost:3000/init";
  private urls: string[] = [
    "assets/stickmanH.png",
    "assets/stickmanHp.png",
    "assets/stickmanF.png",
    "assets/stickmanFp.png",
    "assets/stickmanV.png",
    "assets/stickmanE.png",
    "assets/stickmanR.png",
  ];

  constructor(private http: HttpClient) {}

  getScenario(): Observable<any> {
    return this.http.get<any>(this.initURL, {
      withCredentials: true,
      headers: new HttpHeaders({
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      }),
    });
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
