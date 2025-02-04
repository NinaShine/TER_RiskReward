import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stickman',
  templateUrl: './stickman.component.html',
  styleUrls: ['./stickman.component.css']
})
export class StickmanComponent implements OnInit {
  url1: string = '';
  url2: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log("Stickman initialized");
    const { url1, url2 } = this.dataService.getRandomStick();
    this.url1 = url1;
    this.url2 = url2;
  }
}
