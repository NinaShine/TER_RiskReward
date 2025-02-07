import { Component, OnInit } from "@angular/core";
import { SliderComponent } from "./component/slider/slider.component";
import { ImgTextComponent } from "./component/img-text/img-text.component";
import { SubmitComponent } from "./component/submit/submit.component";
import { Stickman1Component } from "./component/stickman1/stickman1.component";
import { Stickman2Component } from "./component/stickman2/stickman2.component";
import { DataService } from "./services/data.service";

@Component({
  selector: "app-root",
  imports: [
    SliderComponent,
    SubmitComponent,
    ImgTextComponent,
    Stickman1Component,
    Stickman2Component,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  sliderValue1: number = 5; // Stocke la valeur du slider 1
  sliderValue2: number = 5; // Stocke la valeur du slider 2
  content: string = "Ceci est un texte"; // Stocke le contenu de l'image et du texte
  imageUrl: string = "https://picsum.photos/200"; // Stocke l'url de l'image

  scenario: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchScenario();
  }

  fetchScenario() {
    this.dataService.getScenario().subscribe(
      (data) => {
        this.scenario = data;
        console.log("Scenario received:", this.scenario);
      },
      (error) => {
        console.error("Error fetching scenario:", error);
      }
    );
  }
}
