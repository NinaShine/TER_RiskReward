import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman2',
  templateUrl: './stickman2.component.html',
  styleUrls: ['./stickman2.component.css']
})
export class Stickman2Component implements OnInit {
  url2: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const data = this.dataService.getRandomStick();
this.url2 = data.url2;
  }
}
