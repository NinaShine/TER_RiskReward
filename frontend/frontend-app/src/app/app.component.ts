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
  sliderValue1: number = 5;
  sliderValue2: number = 5;
  content: string = "Ceci est un texte";
  imageUrl: string = "https://picsum.photos/200";

  scenario: any = {};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadScenario(); // 🔥 Empêche le rechargement de scénario après un `F5`
  }

  /**
   * Charge le scénario depuis `sessionStorage` ou appelle l'API une seule fois
   */
  loadScenario() {
    const storedScenario = sessionStorage.getItem("scenario");
    console.log(sessionStorage.length);
    if (storedScenario) {
      try {
        this.scenario = JSON.parse(storedScenario);
        console.log(
          "✅ Scenario chargé depuis sessionStorage :",
          this.scenario
        );
      } catch (error) {
        console.error("❌ Erreur de parsing JSON :", error);
        this.fetchScenario(); // Si JSON invalide, recharger un scénario
      }
    } else {
      this.fetchScenario(); // Aucun scénario en mémoire, premier appel à l'API
    }
  }

  /**
   * Récupère un nouveau scénario depuis l'API et le stocke dans `sessionStorage`
   */
  fetchScenario() {
    console.log("🔄 Fetching new scenario...");
    this.dataService.getScenario().subscribe(
      (data) => {
        if (data && data.textId) {
          // Vérifie si les données sont valides
          this.scenario = data;
          console.log("✅ Scenario reçu :", this.scenario);

          // Sauvegarde dans `sessionStorage` pour éviter les appels répétés
          sessionStorage.setItem("scenario", JSON.stringify(data));
        } else {
          console.error("❌ Scenario invalide :", data);
        }
      },
      (error) => {
        console.error("❌ Erreur API :", error);
      }
    );
  }
}
