import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"],
})
export class SubmitComponent {
  individu1: string | null = null;
  individu2: string | null = null;
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

  /*
  ngOnInit():void{
    this.http.get<{text:string;image:string ;individuA: string; individuB: string}>("http://localhost:3000/init ", { withCredentials: true })
    .subscribe(data => {
      this.scenario = data.text;
      this.individu1 = data.individuA;
      this.individu2 = data.individuB;
      console.log(this.scenario);
    });
  }
    */
/*
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

    this.http.post("http://localhost:3000/submit",body, {withCredentials:true})
      .subscribe({
        next: response=> console.log("Test : ",response),
        complete : () => console.log("Requête terminé")
      });
  }*/

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
        .post("https://choice.onrender.com/submit", body, { withCredentials: true })
        .subscribe({
          next: (response) =>{ console.log("Réponse serveur : ", response);this.refreshScenario(); },
          complete: () => console.log("Requête terminée"),
        });
    }


    refreshScenario() {
      this.http.get<{ text: string; image: string; individuA: string; individuB: string }>(
        "https://choice.onrender.com/init", 
        { withCredentials: true }
      ).subscribe(data => {
        this.scenario = data.text;
        this.individu1 = data.individuA;
        this.individu2 = data.individuB;
        console.log("Nouveau scénario chargé :", this.scenario);
      });
    }
}
