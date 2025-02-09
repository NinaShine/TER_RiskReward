import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman1',
  templateUrl: './stickman1.component.html',
  styleUrls: ['./stickman1.component.css']
})
export class Stickman1Component implements OnInit {
  @Input() scenario: any;
  url1: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    switch (this.scenario.individuB) {
      case 'homme grande taille':
        this.url1 = 'assets/hommegt.png';
        break;
      case 'femme grande taille':
        this.url1 = 'assets/femmegt.png';
        break;
      case 'enfant pas genré':
        this.url1 = 'assets/enfant.png';
        break;
      case 'vieux pas genré':
        this.url1 = 'assets/vieux.png';
        break;
      case 'homme petite taille':
        this.url1 = 'assets/hommepetit.png';
        break;
      case 'femme petite taille':
        this.url1 = 'assets/femmepetit.png';
        break;
      case 'robot':
        this.url1 = 'assets/robot.png';
        break;
    }
    console.log('Stickman1Component reçoit les data:', this.scenario);
  }
}
