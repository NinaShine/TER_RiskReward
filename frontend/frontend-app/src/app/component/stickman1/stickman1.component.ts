import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman1',
  templateUrl: './stickman1.component.html',
  styleUrls: ['./stickman1.component.css']
})
export class Stickman1Component implements OnInit {
  url1: string = '';
  name1: string = '';
  //@Input() scenario: any;
  @Input() individuA: string='';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log(this.individuA);
    console.log(this.url1,"donne moi l'url")
    switch (this.individuA) {
      case 'homme grande taille':
        this.url1 = '../assets/hommegt.png';
        break;
      case 'femme grande taille':
        this.url1 = '../assets/femmegt.png';
        break;
      case 'enfant pas genré':
        this.url1 = '../assets/garçons.png';
        break;
      case 'vieux pas genré':
        this.url1 = '../assets/vieux.png';
        break;
      case 'homme petite taille':
        this.url1 = '../assets/homme_petit.png';
        break;
      case 'femme petite taille':
        this.url1 = '../assets/femme_petite.png';
        break;
      case 'robot':
        this.url1 = '../assets/robot.png';
        break;
    }
    //console.log('Stickman1Component reçoit les data:', this.scenario);
  }

  ngOnChanges(): void {
    console.log(this.individuA);
    console.log(this.url1,"donne moi l'url:changes")
    switch (this.individuA) {
      case 'homme grande taille':
        this.url1 = '../assets/hommegt.png';
        break;
      case 'femme grande taille':
        this.url1 = '../assets/femmegt.png';
        break;
      case 'enfant pas genré':
        this.url1 = '../assets/garçons.png';
        break;
      case 'vieux pas genré':
        this.url1 = '../assets/vieux.png';
        break;
      case 'homme petite taille':
        this.url1 = '../assets/homme_petit.png';
        break;
      case 'femme petite taille':
        this.url1 = '../assets/femme_petite.png';
        break;
      case 'robot':
        this.url1 = '../assets/robot.png';
        break;
    }
    //console.log('Stickman1Component reçoit les data:', this.scenario);
  }
/*
  ngOnInit(): void {
    const [stickman1, _] = this.dataService.getRandomStick(); // Prend le second élément
    this.url1 = stickman1.url;
    this.name1 = stickman1.name;
  }*/
}
