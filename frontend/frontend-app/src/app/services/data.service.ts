import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://ter-riskreward.onrender.com';

  private characters = [
    { image: 'assets/hommegt.png', name: 'Homme' },
    { image: 'assets/stickmanHp.png', name: 'Homme Petit' },
    { image: 'assets/femmegt.png', name: 'Femme' },
    { image: 'assets/stickmanFp.png', name: 'Femme Petite' },
    { image: 'assets/stickmanV.png', name: 'Personne Vieille' },
    { image: 'assets/enfant.png', name: 'Enfant' },
    { image: 'assets/robot.png', name: 'Robot' }
  ];

  constructor(private http: HttpClient) {}

  getRandomStick(): { url: string, name: string }[] {
    const shuffled = this.characters.sort(() => 0.5 - Math.random());
    return [{ url: shuffled[0].image, name: shuffled[0].name }, { url: shuffled[1].image, name: shuffled[1].name }];
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getRandomDoc(): Observable<any> {
    //return this.http.get(this.apiUrl + '/random-text-clean');
    //return this.http.get(this.apiUrl + '/random-text');
    return this.http.get("http://localhost:3000/random-text-clean");
  }


}
