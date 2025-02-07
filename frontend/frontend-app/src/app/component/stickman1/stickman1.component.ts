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
    this.url1 = this.scenario.individuA;
    console.log('Stickman1Component reçoit les data:', this.scenario);
  }
}
