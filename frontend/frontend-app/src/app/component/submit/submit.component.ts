import { Component, Input } from "@angular/core";

@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"],
})
export class SubmitComponent {
  @Input() sliderValue1: number = 0; // Reçoit la valeur du slider 1
  @Input() sliderValue2: number = 0; // Reçoit la valeur du slider 2

  logValues() {
    console.log("Valeur du slider 1 :", this.sliderValue1);
    console.log("Valeur du slider 2 :", this.sliderValue2);
  }
}
