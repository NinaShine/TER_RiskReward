import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forces-page',
  imports: [SliderComponent, CommonModule],
  templateUrl: './forces-page.component.html',
  styleUrl: './forces-page.component.css'
})
export class ForcesPageComponent {
  images: string[] = [
    'assets/enfant.png',
    'assets/femmegt.png',
    'assets/hommegt.png',
    'assets/femmegt.png',
    'assets/hommegt.png',
    'assets/vieux.png',
    'assets/robot.png',
    
  ];
  values: number[] = [1,1,1,1,1,1,1]; 

  descs: string[] = [
    "Enfant d'environ 10 ans",
    'Femme de petite corpulence',
    'Homme de petite corpulence',
    'Femme de grande corpulence',
    'Homme de grande corpulence',
    'Personne âgée',
    'Robot à taille humaine'
  ]


   submit(){
      let forces: number[] = new Array();
      for (let i = 0; i < this.values.length; i++) {
        forces.push(this.values[i]);
      }
      sessionStorage.setItem('list_forces', JSON.stringify(forces));
    }
}


