import { Component, OnInit } from "@angular/core";
import { SliderComponent } from "./component/slider/slider.component";
import { ImgTextComponent } from "./component/img-text/img-text.component";
import { SubmitComponent } from "./component/submit/submit.component";

@Component({
  selector: "app-root",
  imports: [SliderComponent, SubmitComponent, ImgTextComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  sliderValue1: number = 5; // Stocke la valeur du slider 1
  sliderValue2: number = 5; // Stocke la valeur du slider 2
  content: string = "Ceci est un texte"; // Stocke le contenu de l'image et du texte
  imageUrl: string = "https://picsum.photos/200"; // Stocke l'url de l'image

  ngOnInit(): void {
    console.log("AppComponent initialized");
  }

  
}
