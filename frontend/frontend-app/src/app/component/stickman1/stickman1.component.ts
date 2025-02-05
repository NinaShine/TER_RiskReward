import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman1',
  templateUrl: './stickman1.component.html',
  styleUrls: ['./stickman1.component.css']
})
export class Stickman1Component implements OnInit {
  url1: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const data = this.dataService.getRandomStick();
this.url1 = data.url1;
  }
}
