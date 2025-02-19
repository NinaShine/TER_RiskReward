import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-submit",
  imports : [RouterLink, CommonModule],
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"],
})
export class SubmitComponent {
  individu1: string | null = null;
  individu2: string | null = null;
  allRessourcesDisplayed: boolean = false;

  @Input() sliderValue1: number = 0; // Reçoit la valeur du slider 1
  @Input() sliderValue2: number = 0; // Reçoit la valeur du slider 2
  @Input() scenario: any;
  @Output() refreshRequested = new EventEmitter<void>(); // Event for parent

  onButtonClick() {
    this.refreshRequested.emit(); // Émet l'événement vers le parent
  }


  logValues() {
    console.log("Valeur du slider 1 :", this.sliderValue1);
    console.log("Valeur du slider 2 :", this.sliderValue2);
  }

  constructor(private http: HttpClient) {}


  //La logique métier est pas au bon endroit, faut la déplacer dans un parent, c'est pas à ce bouton de faire ce taff.
  //Mais sinon c'est la bonne logique.

  ngOnInit() {
    this.checkResourcesStatus();
  }

  ngOnChanges() {
    this.checkResourcesStatus();
  }

  checkResourcesStatus() {
    this.allRessourcesDisplayed = sessionStorage.getItem("allRessourcesDisplayed") === "true";
  }

  incrementTurn(){
    let turn = sessionStorage.getItem("turn");
    if(turn){
      let turnObj = JSON.parse(turn);
      turnObj++;
      sessionStorage.setItem("turn",JSON.stringify(turnObj));
    }
  }

    submitResponse() {
      console.log("Submit !");
      const forces = JSON.parse(sessionStorage.getItem("list_forces") || "[]");
  
      const body = {
        sliderValue1: {
          first: this.sliderValue1,
          second: 10 - this.sliderValue1,
        },
        sliderValue2: {
          first: this.sliderValue2,
          second: 10 - this.sliderValue2,
        },
        forces: forces,
      };
  
      console.log("Body : ", body);
  
      this.http
        .post("http://localhost:3000/submit", body, { withCredentials: true })
        .subscribe({
          next: (response) =>{
            console.log("Réponse serveur : ", response);
            this.refreshScenario(); },
          complete: () => console.log("Requête terminée"),
        });
    }

/*
    refreshScenario() {
      this.http.get<{ text: string; image: string; individuA: string; individuB: string }>(
        "http://localhost:3000/init", 
        { withCredentials: true }
      ).subscribe(data => {
        this.scenario = data.text;
        this.individu1 = data.individuA;
        this.individu2 = data.individuB;
        console.log("Nouveau scénario chargé :", this.scenario);
      });
    }
*/
    refreshScenario() {
      this.http.get("http://localhost:3000/init", { withCredentials: true }).subscribe((data: any) => {
        if (data?.allRessourcesDisplayed) {
          sessionStorage.setItem("allRessourcesDisplayed", "true");
        } else {
          sessionStorage.removeItem("allRessourcesDisplayed");
        }
  
        this.scenario = data.scenario;
        console.log("Nouveau scénario chargé :", this.scenario);
        this.checkResourcesStatus();
      });
    }
}
