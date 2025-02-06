import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://ter-riskreward.onrender.com';

  private urls: string[] = [
    'assets/stickmanH.png',
    'assets/stickmanHp.png',
    'assets/stickmanF.png',
    'assets/stickmanFp.png',
    'assets/stickmanV.png',
    'assets/stickmanE.png',
    'assets/stickmanR.png'
  ];

  constructor(private http: HttpClient) {}

  getRandomStick(): { url1: string, url2: string } {
    const shuffled = this.urls.sort(() => 0.5 - Math.random());
    return { url1: shuffled[0], url2: shuffled[1] };
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getRandomDoc(): Observable<any> {
    return this.http.get(this.apiUrl + '/random-text');
  }


}
