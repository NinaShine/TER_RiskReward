import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SliderComponent } from '../slider/slider.component';
import { Stickman1Component } from '../stickman1/stickman1.component';
import { Stickman2Component } from '../stickman2/stickman2.component';
import { RouterLink } from '@angular/router';
import { SubmitComponent } from '../submit/submit.component';


@Component({
  selector: 'app-img-text',
  imports: [RouterLink, SliderComponent, Stickman1Component, Stickman2Component, SubmitComponent],
  templateUrl: './img-text.component.html',
  styleUrls: ['./img-text.component.css']
})

export class ImgTextComponent implements OnInit {
  content: string = '';
  imageUrl: string = '';

  // 🛠️ Ajout des propriétés manquantes
  sliderValue1: number = 5;
  sliderValue2: number = 5;

  constructor(private dataService: DataService) {}
  

  ngOnInit(): void {
    console.log("ImgTextComponent initialized");
    this.dataService.getRandomDoc().subscribe(data => {
      this.content = data.content;
      this.imageUrl = data.imageUrl; //il faut mettre les images dans assets
      console.log("Voici les données du back", data);
    });
  }

  

  

}
