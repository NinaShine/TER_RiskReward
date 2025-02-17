import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman1',
  templateUrl: './stickman1.component.html',
  styleUrls: ['./stickman1.component.css']
})
export class Stickman1Component implements OnInit {
  url1: string = '';
  name1: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const [stickman1, _] = this.dataService.getRandomStick(); // Prend seulement le premier élément
    this.url1 = stickman1.url;
    this.name1 = stickman1.name;
  }
}
