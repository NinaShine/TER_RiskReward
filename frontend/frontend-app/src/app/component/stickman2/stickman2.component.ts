import { Component, OnInit, Input , OnChanges} from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman2',
  templateUrl: './stickman2.component.html',
  styleUrls: ['./stickman2.component.css']
})
export class Stickman2Component implements OnInit {
  url2: string = '';
  name2: string = '';
  @Input() individuB: string='';

  constructor(private dataService: DataService) {}
/*
  ngOnInit(): void {
    const [_, stickman2] = this.dataService.getRandomStick(); // Prend le second élément
    this.url2 = stickman2.url;
    this.name2 = stickman2.name;
  }*/

    ngOnInit(): void {
      console.log(this.individuB);
      switch (this.individuB) {
        case 'homme grande taille':
          this.url2 = '../assets/hommegt.png';
          break;
        case 'femme grande taille':
          this.url2 = '../assets/femmegt.png';
          break;
        case 'enfant pas genré':
          this.url2 = '../assets/garçons.png';
          break;
        case 'vieux pas genré':
          this.url2 = '../assets/vieux.png';
          break;
        case 'homme petite taille':
          this.url2 = '../assets/homme_petit.png';
          break;
        case 'femme petite taille':
          this.url2 = '../assets/femme_petite.png';
          break;
        case 'robot':
          this.url2 = '../assets/robot.png';
          break;
      }
      //console.log('Stickman1Component reçoit les data:', this.scenario);
    }

    ngOnChanges(): void {
      console.log(this.individuB);
      switch (this.individuB) {
        case 'homme grande taille':
          this.url2 = '../assets/hommegt.png';
          break;
        case 'femme grande taille':
          this.url2 = '../assets/femmegt.png';
          break;
        case 'enfant pas genré':
          this.url2 = '../assets/garçons.png';
          break;
        case 'vieux pas genré':
          this.url2 = '../assets/vieux.png';
          break;
        case 'homme petite taille':
          this.url2 = '../assets/homme_petit.png';
          break;
        case 'femme petite taille':
          this.url2 = '../assets/femme_petite.png';
          break;
        case 'robot':
          this.url2 = '../assets/robot.png';
          break;
      }
      //console.log('Stickman1Component reçoit les data:', this.scenario);
    }
}
