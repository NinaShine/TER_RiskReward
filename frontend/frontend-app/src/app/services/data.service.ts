import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://ter-riskreward-tmap.onrender.com';
  private initURL = `${this.apiUrl}/init`;


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
/*
  getRandomStick(): { url: string, name: string }[] {
    const shuffled = this.characters.sort(() => 0.5 - Math.random());
    return [{ url: shuffled[0].image, name: shuffled[0].name }, { url: shuffled[1].image, name: shuffled[1].name }];
  }*/

/*
  getRandomStick(): { url: string, name: string }[] {
    const indexa = Math.floor(Math.random() * this.characters.length);
    let indexb = Math.floor(Math.random() * this.characters.length);
    while (indexb === indexa) {
        indexb = Math.floor(Math.random() * this.characters.length);
    }

    return [
        { url: this.characters[indexa].image, name: this.characters[indexa].name },
        { url: this.characters[indexb].image, name: this.characters[indexb].name }
    ];
}
    */

private selectedStickmen: { url: string; name: string }[] | null = null;

  getRandomStick(): { url: string; name: string }[] {
    if (!this.selectedStickmen) {
      const indexa = Math.floor(Math.random() * this.characters.length);
      let indexb = Math.floor(Math.random() * this.characters.length);
      while (indexb === indexa) {
        indexb = Math.floor(Math.random() * this.characters.length);
      }

      this.selectedStickmen = [
        { url: this.characters[indexa].image, name: this.characters[indexa].name },
        { url: this.characters[indexb].image, name: this.characters[indexb].name },
      ];
    }

    return this.selectedStickmen;
  }

  resetStickmen(): void {
    this.selectedStickmen = null;
  }


  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
/*
  getRandomDoc(): Observable<any> {
    //return this.http.get(this.apiUrl + '/random-text-clean');
    //return this.http.get(this.apiUrl + '/random-text');
    return this.http.get("http://localhost:3000/random-text-clean");
  }*/

  getScenario(): Observable<any> {
    return this.http.get<any>('/init', {
      withCredentials: true,
      headers: new HttpHeaders({
        connection: "close",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      }),
    });
  }


}
