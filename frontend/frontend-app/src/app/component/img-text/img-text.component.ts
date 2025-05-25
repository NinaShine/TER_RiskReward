import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { SliderComponent } from "../slider/slider.component";
import { Stickman1Component } from "../stickman1/stickman1.component";
import { SubmitComponent } from "../submit/submit.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-img-text",
  imports: [SliderComponent, Stickman1Component, SubmitComponent, CommonModule],
  templateUrl: "./img-text.component.html",
  styleUrls: ["./img-text.component.css"],
})
export class ImgTextComponent implements OnInit {
  content: string = "";
  imageUrl: string = "";
  associationType: string = "";
  scenario: any = {};
  currentTurn: number = 1;
  maxTurn: number = 1;

  sliderValue1: number = 5;
  sliderValue2: number = 5;

  allDisplayed: boolean = false;


  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadScenario(); 
  }


  loadScenario() {
    const storedScenario = sessionStorage.getItem("scenario");
    const storedTurn = sessionStorage.getItem("turn");

    //this.currentTurn = parseInt(sessionStorage.getItem("turn") || "1", 10);
    if (storedTurn) {
      this.currentTurn = parseInt(storedTurn, 10);
    }

    console.log(sessionStorage.length);
    if (storedScenario) {
      try {
        this.scenario = JSON.parse(storedScenario);
        console.log(
          "Scenario chargé depuis sessionStorage :",
          this.scenario
        );
      } catch (error) {
        console.error("Erreur de parsing JSON :", error);
        this.fetchScenario(); 
      }
    } else {
      this.fetchScenario(); 
    }
  }


  fetchScenario() {
    console.log("🔄 Fetching new scenario...");
    this.dataService.getInitScenario().subscribe(
      (data) => {
        if (data?.allRessourcesDisplayed) {
          sessionStorage.setItem("allRessourcesDisplayed", "true");
          this.allDisplayed = true;
        } else {
          sessionStorage.removeItem("allRessourcesDisplayed");
        }
        if (data && data.scenario.textId) {
          this.scenario = data.scenario;
          console.log("Scenario reçu :", this.scenario);
          console.log("Data : ", data);

          sessionStorage.setItem("scenario", JSON.stringify(data.scenario));
          sessionStorage.setItem("turn", JSON.stringify(data.turn));
          sessionStorage.setItem("scores",JSON.stringify(data.scores));
          console.log("Scores : ", data.scores);
        } else {
          console.error("Scenario invalide :", data);
        }
      },
      (error) => {
        console.error("Erreur API :", error);
      }
    );
  }

  resetSliders() {
    this.sliderValue1 = 5;
    this.sliderValue2 = 5;
  }

onRessourcesEpuisees(etat: boolean) {
  this.allDisplayed = etat;
}

}
