import { Component, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  submitResponse(){
    console.log("Submit !")
    const body = {
      sliderValue1:{
        first:this.sliderValue1,
        second:10-this.sliderValue1
      },
      sliderValue2:{
        first:this.sliderValue2,
        second:10-this.sliderValue2
      }
    }
    console.log("Body : ",body);
    this.http.post("https://ter-riskreward.onrender.com/submit",body)
      .subscribe({
        next: response=> console.log("Caca : ",response),
        complete : () => console.log("Requête terminé")
      });
  }

}
