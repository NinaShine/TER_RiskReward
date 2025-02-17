import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman2',
  templateUrl: './stickman2.component.html',
  styleUrls: ['./stickman2.component.css']
})
export class Stickman2Component implements OnInit {
  url2: string = '';
  name2: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const [stickman1, _] = this.dataService.getRandomStick(); // Prend le second élément
    this.url2 = stickman1.url;
    this.name2 = stickman1.name;
  }
}
