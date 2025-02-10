import { Component, OnInit } from "@angular/core";
import { SliderComponent } from "./component/slider/slider.component";
import { ImgTextComponent } from "./component/img-text/img-text.component";
import { SubmitComponent } from "./component/submit/submit.component";
import { Stickman1Component } from "./component/stickman1/stickman1.component";
import { Stickman2Component } from "./component/stickman2/stickman2.component";
import { HomePageComponent } from "./component/home-page/home-page.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet,SliderComponent, SubmitComponent, ImgTextComponent, Stickman1Component, Stickman2Component, HomePageComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css", 
})
export class AppComponent implements OnInit {
  //sliderValue1: number = 5; // Stocke la valeur du slider 1!!
  //sliderValue2: number = 5; // Stocke la valeur du slider 2
  content: string = "Ceci est un texte"; // Stocke le contenu de l'image et du texte
  imageUrl: string = "https://picsum.photos/200"; // Stocke l'url de l'image

  ngOnInit(): void {
    console.log("AppComponent initialized");
  }
}
