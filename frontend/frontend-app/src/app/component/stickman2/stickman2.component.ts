import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman2',
  templateUrl: './stickman2.component.html',
  styleUrls: ['./stickman2.component.css']
})
export class Stickman2Component implements OnInit {
  @Input() scenario: any;
  url2: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.url2 = this.scenario.individuB;
    console.log('Stickman2Component reçoit les data:', this.scenario);
  }
}
