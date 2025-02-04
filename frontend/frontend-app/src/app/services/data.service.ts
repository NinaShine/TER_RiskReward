import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000';

  private urls: string[] = [
    'assets/stickman.png',
    'assets/stickman.png',
    'assets/stickman.png',
    'assets/stickman.png',
    'assets/stickman.png',
    'assets/stickman.png',
    'assets/stickman.png',
    'assets/stickman.png',
    'assets/stickman.png'
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
