import { Component, OnInit } from "@angular/core";
import { SliderComponent } from "./component/slider/slider.component";
import { SubmitComponent } from "./component/submit/submit.component";

@Component({
  selector: "app-root",
  imports: [SliderComponent, SubmitComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  sliderValue1: number = 5; // Stocke la valeur du slider 1
  sliderValue2: number = 5; // Stocke la valeur du slider 2

  ngOnInit(): void {
    console.log("AppComponent initialized");
  }
}
