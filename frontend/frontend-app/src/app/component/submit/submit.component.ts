import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-submit",
  imports: [CommonModule],
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"],
})
export class SubmitComponent {
  individu1: string | null = null;
  individu2: string | null = null;

  @Input() sliderValue1: number = 0; // Reçoit la valeur du slider 1
  @Input() sliderValue2: number = 0; // Reçoit la valeur du slider 2
  @Input() scenario: any;
  @Input() allRessourcesDisplayed: boolean = false;


  @Output() refreshRequested = new EventEmitter<void>(); // Event for parent
  @Output() resetSlidersEvent = new EventEmitter<void>();
  @Output() ressourcesEpuisees = new EventEmitter<boolean>();


  private individuMap: { [key: string]: string } = {
    "Enfant": "enfant",
    "Robot": "robot",
    "Homme grande taille": "hommeGrand",
    "Homme petite taille": "hommePetit",
    "Femme grande taille": "femmeGrande",
    "Femme petite taille": "femmePetite",
    "Personne âgée": "vieux",
  };

  handleSubmitClick() {
    this.submitResponse();
    this.onButtonClick();
  }

  handleSubmitClickFinal() {
    console.log("Submit !");    
    const forces = JSON.parse(sessionStorage.getItem("list_forces") || "[]");
    const body = {
      sliderValue1: {
        first: 10 - this.sliderValue1,
        second: this.sliderValue1,
      },
      sliderValue2: {
        first: 10 - this.sliderValue2,
        second: this.sliderValue2,
      },
      forces: forces,
    };

    console.log("Body : ", body);

    this.http
      .post("http://localhost:3000/submit", body, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log("Réponse serveur : ", response);
          this.goToFinalPage();
        },
        complete: () => {
          console.log("Requête terminée");
          this.updateScores(this.sliderValue1, this.sliderValue2);
          this.goToFinalPage();
        },
      });
  }

  onButtonClick() {
    // Récupère la valeur actuelle ou 0 si elle n'existe pas
    let currentTurn = parseInt(sessionStorage.getItem("turn") || "1");
    currentTurn += 1;
    sessionStorage.setItem("turn", currentTurn.toString());

    this.refreshRequested.emit(); // Émet l'événement vers le parent
    this.resetSlidersEvent.emit();
  }

  logValues() {
    console.log("Valeur du slider 1 :", this.sliderValue1);
    console.log("Valeur du slider 2 :", this.sliderValue2);
  }

  constructor(private http: HttpClient, private router: Router) {}
/*
  ngOnInit() {
    this.checkResourcesStatus();
  }

  ngOnChanges() {
    this.checkResourcesStatus();
  }

  checkResourcesStatus() {
    this.allRessourcesDisplayed =
      sessionStorage.getItem("allRessourcesDisplayed") === "true";
  }*/

  submitResponse() {
    console.log("Submit !");    
    const forces = JSON.parse(sessionStorage.getItem("list_forces") || "[]");
    const body = {
      sliderValue1: {
        first: 10 - this.sliderValue1,
        second: this.sliderValue1,
      },
      sliderValue2: {
        first: 10 - this.sliderValue2,
        second: this.sliderValue2,
      },
      forces: forces,
    };

    console.log("Body : ", body);

    this.http
      .post("http://localhost:3000/submit", body, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log("Réponse serveur : ", response);
          this.refreshScenario();
        },
        complete: () => {
          console.log("Requête terminée");
          this.updateScores(this.sliderValue1, this.sliderValue2);
        },
      });
  }

  refreshScenario() {
    this.http
      .get("http://localhost:3000/next", { withCredentials: true })
      .subscribe((data: any) => {
        if (data?.allRessourcesDisplayed) {
          sessionStorage.setItem("allRessourcesDisplayed", "true");
          this.ressourcesEpuisees.emit(true); // on notif au parent qu'on est arrivé à la fin de la liste
        } else {
          sessionStorage.removeItem("allRessourcesDisplayed");
          this.ressourcesEpuisees.emit(false);
        }

        // this.scenario = data.scenario;

        // Sauvegarde dans `sessionStorage` pour éviter les appels répétés
        sessionStorage.setItem("scenario", JSON.stringify(data.scenario));
        sessionStorage.setItem("turn", JSON.stringify(data.turn));
        //this.checkResourcesStatus();

        console.log("Nouveau scénario chargé :", this.scenario);

        this.refreshRequested.emit();


      });
  }

  goToFinalPage() {
    const scores = JSON.parse(sessionStorage.getItem("scores")||"");
    try {
      this.http.post("http://localhost:3000/compute-stats", scores ,{withCredentials:true})
      .subscribe({
        next:(response: any) => {
          if (!response) {
            console.error("Empty response from compute-stats");
            return;
          }
          const data = response.stats;
          sessionStorage.setItem("stats", JSON.stringify(data));
          console.log("In session :", JSON.parse(sessionStorage.getItem("stats") || ""));
          console.log("Cote le bouton : ",sessionStorage);
          this.router.navigate(['pageFinale']);
        },
        error: (error)=> {
          console.error("Error computing stats:", error);
        }
      });
    } catch (error) {
      console.error("Error parsing scores from session storage:", error);
    }
  }

  
  updateScores(slider1: number, slider2: number) {
    if (!this.scenario || !this.scenario.individuA || !this.scenario.individuB) {
      console.warn("⚠️ Impossible de mettre à jour les scores : scénario incomplet.");
      return;
    }

    let scores = JSON.parse(sessionStorage.getItem("scores") || "");
    const individu1 = this.scenario.individuA;
    const individu2 = this.scenario.individuB;
    console.log("Individu 1 : ", individu1, "- Individu 2 : ", individu2, "- slider1 : ",slider1, "- slider2 : ",slider2);
    console.log("Objet scenario : ", this.scenario);
    
    if (scores != ""&& individu1 && individu2){
      const cat = this.scenario.association.toString();
      console.log("Catégorie : ", cat);
      const categories = cat.split("-");
      console.log("Categories : ", categories);
      const categorie1 = categories[0];
      const categorie2 = categories[1];
      console.log("Categories : ", categorie1, categorie2);
      const key1 = this.individuMap[individu1];
      const key2 = this.individuMap[individu2];
      console.log("Premier : ",scores[key1][categorie1]);
      console.log("Second : ",scores[key1][categorie2]);



      //Premier individu
      scores[key1][categorie1].score += slider1;
      scores[key1][categorie1].count ++;
      scores[key1][categorie2].score += slider2;
      scores[key1][categorie2].count ++;

      //Second individu
      scores[key2][categorie1].score += 10-slider1;
      scores[key2][categorie1].count ++;
      scores[key2][categorie2].score += 10-slider2;
      scores[key2][categorie2].count ++;

      sessionStorage.setItem("scores", JSON.stringify(scores));
    }
  }
/*

SOLUTION CHATGPT (qui marche pas non plus mais peut servir d'insipiration)

  updateScores(slider1: number, slider2: number) {
    if (!this.scenario || !this.scenario.individuA || !this.scenario.individuB) {
      console.warn("⚠️ Scénario invalide, score non mis à jour.");
      return;
    }
  
    let scores = JSON.parse(sessionStorage.getItem("scores") || "{}");
    const individu1 = this.scenario.individuA;
    const individu2 = this.scenario.individuB;
    console.log("Individu 1 : ", individu1, "- Individu 2 : ", individu2, "- slider1 : ",slider1, "- slider2 : ",slider2);
    console.log("Objet scenario : ", this.scenario);

    const [categorie1, categorie2] = this.scenario.association.split("-");
    console.log("Catégories : ", categorie1, categorie2);
  
    const key1 = this.individuMap[individu1];
    const key2 = this.individuMap[individu2];
    console.log("Premier : ",scores[key1][categorie1]);
    console.log("Second : ",scores[key1][categorie2]);
  
    // Initialisation si elle n'existe pas
    for (const key of [key1, key2]) {
      if (!scores[key]) scores[key] = {};
      for (const cat of [categorie1, categorie2]) {
        if (!scores[key][cat]) {
          scores[key][cat] = { score: 0, count: 0 };
        }
      }
    }
  
    //Premier individu
    scores[key1][categorie1].score += slider1;
    scores[key1][categorie1].count++;
    scores[key1][categorie2].score += slider2;
    scores[key1][categorie2].count++;
  
    //Second individu
    scores[key2][categorie1].score += 10 - slider1;
    scores[key2][categorie1].count++;
    scores[key2][categorie2].score += 10 - slider2;
    scores[key2][categorie2].count++;
  
    sessionStorage.setItem("scores", JSON.stringify(scores));
    console.log("Scores mis à jour :", scores);
  }
  */
    
}
