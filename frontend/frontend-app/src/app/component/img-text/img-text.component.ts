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
  associationType: string = ''; 
  scenario: any = {};

  // maintenant on a les valeurs des sliders ici
  sliderValue1: number = 5;
  sliderValue2: number = 5;

  constructor(private dataService: DataService) {}
  
/*
  ngOnInit(): void {
    console.log("ImgTextComponent initialized");
    this.dataService.getRandomDoc().subscribe(data => {
      this.content = data.content;
      this.imageUrl = data.imageUrl; //il faut mettre les images dans assets
      this.associationType = data.associationType;
      console.log("Voici les données du back", data);
    });
  } */ 

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
    this.checkTurn();
    console.log("🔄 Fetching new scenario...");
    this.dataService.getScenario().subscribe(
      (data) => {
        if (data && data.scenario.textId) {
          // Vérifie si les données sont valides
          this.scenario = data.scenario;
          console.log("✅ Scenario reçu :", this.scenario);

          // Sauvegarde dans `sessionStorage` pour éviter les appels répétés
          sessionStorage.setItem("scenario", JSON.stringify(data.scenario));
          sessionStorage.setItem("turn",JSON.stringify(data.turn));
        } else {
          console.error("❌ Scenario invalide :", data);
        }
      },
      (error) => {
        console.error("❌ Erreur API :", error);
      }
    );
  }
  checkTurn(){
    let turn = sessionStorage.getItem("turn");
    if(turn){
      let turnObj = JSON.parse(turn);
      if(turnObj%4==0){
        window.location.reload();
      }
    }
  }
}
